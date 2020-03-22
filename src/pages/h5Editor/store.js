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
        deleteItemCollection: [], //保留删除的组件
        /**
         * itemData: delItem,
         * componentState:{},
         * timestamp: Date.now()
         * html:{id:"",htmlStr:""} 
         */
        toastMsg: "", //toast弹窗的内容
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
        },
        //删除item
        DELETE_ITEM(state, index) {
            let delItem = state.componentsList.splice(index, 1);
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
        // //备份数据
        // //备份数据在indexDB数据库中
        // SET_BACKUP(state, components) {
        //     if (!(components && components.length > 0)) return;
        //     let activityId = state.idMap.activityId || "default_activity"
        //     let pageConfigId = state.idMap.pageConfigId || (activityId + "_default_config")
        //     db.$put("config", {
        //         pageConfigId,
        //         components,
        //         timestamp: Date.now()
        //     }).then(db.$get("activity_config", activityId, res => {
        //         if (!res) {
        //             res = {
        //                 activityId,
        //                 pageConfigIds: {}
        //             }
        //         }
        //         res.pageConfigIds[pageConfigId] = {
        //             timestamp: Date.now()
        //         }
        //         db.$put("activity_config", res)
        //         state.backupPages = res.pageConfigIds
        //         state.toastMsg = "当前编辑器数据已保存"
        //         setTimeout(() => {
        //             state.toastMsg = ""
        //         }, 1000)
        //     }))
        // },
    },
    actions: {
        // //查询备份
        // //根据id查询备份的数据
        // SEARCH_BACKUP(state, pageConfigId) {
        //     return new Promise((resolve, reject) => {
        //         db.$get("config", pageConfigId, res => {
        //             if (res) {
        //                 resolve(res)
        //             } else {
        //                 reject()
        //             }
        //         })
        //     })
        // }
    }
}

store.commit = (mutationType, payload) => store.mutations[mutationType](store.state, payload);

store.dispatch = (actionType, payload) => store.actions[actionType](store.state, payload);

export default store