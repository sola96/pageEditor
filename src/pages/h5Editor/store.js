import { arrMoveTop, arrMoveUpper, arrMoveLower, arrMoveBottom, getRandomStr } from "./utils"
import db from "./indexDB"

let toastTimer = null

const store = {
    state: {
        ownerTemplateShow: true, //“我的推广页”显示
        controlViewwidth: "300px",
        componentsList: [], //组件item列表
        currentActiveItemIdx: -1, //当前active状态的item索引
        currentActiveItem: { id: "" },
        previewData: [], //预览的数据，在预览视图中显示
        previewWay: null, //预览方式 null:不预览 ；auto:自动预览；manual:手动预览
        deleteItemCollection: [], //保留删除的组件
        /**
         * itemData: delItem,
         * componentState:{},
         * timestamp: Date.now()
         * html:{id:"",htmlStr:""} 
         */
        toastMsg: "", //toast弹窗的内容
        idMap: {
            activityId: "",
            pageConfigId: ""
        },
        backupPages: {} // 当前活动下的备份的页面
    },
    mutations: {
        TOAST(state, msg) {
            state.toastMsg = msg;
            toastTimer && clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                state.toastMsg = ""
            }, 1500)
        },
        SET_ID_MAP(state, { activityId, pageConfigId }) {
            if (activityId) {
                state.idMap.activityId = activityId;
                //设置活动id时查询当前活动下的备份的页面
                db.$get("activity_config", activityId, res => {
                    if (res) {
                        state.backupPages = res.pageConfigIds
                    }
                })
            }
            if (pageConfigId) {
                state.idMap.pageConfigId = pageConfigId;
            }
        },
        //设置当前index
        SET_CURIDX(state, index) {
            state.currentActiveItemIdx = index;
            state.currentActiveItem = state.componentsList[index] || { id: "" };
        },
        //切换我的模板显示
        TOGGLE_OWNER_TEMPLATE(state, flag) {
            state.ownerTemplateShow = flag;
        },
        //替换组件列表数据
        REPLACE_COMPONENT_LIST(state, list) {
            state.componentsList = list;
        },
        //添加item
        ADD_ITEM(state, item) {
            state.componentsList.push(item);
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData.push(item);
            }
        },
        //删除item
        DELETE_ITEM(state, index) {
            let delItem = state.componentsList.splice(index, 1);
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData.splice(index, 1);
            }
            return delItem;
        },
        //保存删除的组件状态
        SAVE_DELETE_DATA(state, data) {
            state.deleteItemCollection.unshift(data);
            if (state.deleteItemCollection.length > 5) {
                state.deleteItemCollection.pop();
            }
        },
        //删除deleteData
        REMOVE_DELETE_DATA(state, index) {
            state.deleteItemCollection.splice(index, 1);
        },
        //移动到顶部
        MOVE_TOP(state, index) {
            state.componentsList = arrMoveTop(state.componentsList, index);
            state.currentActiveItemIdx = 0;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveTop(state.previewData, index);
            }
            return 0;
        },
        //向上移动一层
        MOVE_UPPER(state, index) {
            let preIdx = index > 0 ? index - 1 : index;
            state.componentsList = arrMoveUpper(state.componentsList, index);
            state.currentActiveItemIdx = preIdx;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveUpper(state.previewData, index);
            }
            return preIdx;
        },
        //向下移动一层
        MOVE_LOWER(state, index) {
            let len = state.componentsList.length;
            let nextIdx = index < len ? index + 1 : index;
            state.componentsList = arrMoveLower(state.componentsList, index);
            state.currentActiveItemIdx = nextIdx;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveLower(state.previewData, index);
            }
            return nextIdx;
        },
        //移动到底部
        MOVE_BOTTOM(state, index) {
            let len = state.componentsList.length - 1;
            state.componentsList = arrMoveBottom(state.componentsList, index);
            state.currentActiveItemIdx = len;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveBottom(state.previewData, index);
            }
            return len;
        },
        //切换预览方式
        TOGGLE_PREVIEW_WAY(state, flag) {
            state.previewWay = flag;
        },
        //替换预览的数据
        REPALCE_PREVIEW_DATA(state, previewData) {
            if (state.previewWay && state.previewWay === "manual" && previewData.length > 0) {
                setTimeout(() => {
                    state.previewData = previewData;
                }, 500)

            } else {
                state.previewData = previewData;
            }
        },
        //设置预览数据
        SET_PREVIEW_DATA(state, { index, data }) {
            state.previewData[index] = data;
            state.previewData = [...state.previewData];
        },
        //备份数据
        //备份数据在indexDB数据库中
        SET_BACKUP(state, components) {
            if (!(components && components.length > 0)) return;
            let activityId = state.idMap.activityId || "default_activity"
            let pageConfigId = state.idMap.pageConfigId || (activityId + "_default_config")
            db.$put("config", {
                pageConfigId,
                components,
                timestamp: Date.now()
            }).then(db.$get("activity_config", activityId, res => {
                if (!res) {
                    res = {
                        activityId,
                        pageConfigIds: {}
                    }
                }
                res.pageConfigIds[pageConfigId] = {
                    timestamp: Date.now()
                }
                db.$put("activity_config", res)
                state.backupPages = res.pageConfigIds
                state.toastMsg = "当前编辑器数据已保存"
                setTimeout(() => {
                    state.toastMsg = ""
                }, 1000)
            }))
        },
    },
    actions: {
        //查询备份
        //根据id查询备份的数据
        SEARCH_BACKUP(state, pageConfigId) {
            return new Promise((resolve, reject) => {
                db.$get("config", pageConfigId, res => {
                    if (res) {
                        resolve(res)
                    } else {
                        reject()
                    }
                })
            })
        }
    }
}

store.commit = (mutationType, payload) => store.mutations[mutationType](store.state, payload);

store.dispatch = (actionType, payload) => store.actions[actionType](store.state, payload);

export default store