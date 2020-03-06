import { arrMoveTop, arrMoveUpper, arrMoveLower, arrMoveBottom } from "./utils"

const store = {
    state: {
        ownerTemplateShow: false, //“我的推广页”显示
        componentsList: [], //组件item列表
        currentActiveItemIdx: -1, //当前active状态的item索引
        currentActiveItem: { id: "" },
        previewData: [], //预览的数据，在预览视图中显示
        previewWay: null //预览方式 null:不预览 ；auto:自动预览；manual:手动预览
    },
    mutations: {
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
        //移动到顶部
        MOVE_TOP(state, index) {
            state.componentsList = arrMoveTop(state.componentsList, index);
            state.currentActiveItemIdx = 0;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveTop(state.previewData, index);
            }
            // if (index !== 0) {
            //     let moveItem = state.componentsList.splice(index, 1);
            //     state.componentsList.unshift(...moveItem);
            //     state.currentActiveItemIdx = 0;
            //     if (previewWay && previewWay === "auto") {
            //         let moveItem = state.previewData.splice(index, 1);
            //         state.previewData.unshift(...moveItem);
            //     }
            // }
            return 0;
        },
        //向上移动一层
        MOVE_UPPER(state, index) {
            // let curIdx = index;
            // let preIdx = index - 1;
            // [state.componentsList[curIdx], state.componentsList[preIdx]] = [
            //     state.componentsList[preIdx],
            //     state.componentsList[curIdx]
            // ];
            // state.componentsList = [...state.componentsList];
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
            // if (index !== state.componentsList.length - 1) {
            //     let curIdx = index;
            //     let nextIdx = index + 1;
            //     [state.componentsList[curIdx], state.componentsList[nextIdx]] = [
            //         state.componentsList[nextIdx],
            //         state.componentsList[curIdx]
            //     ];
            //     state.componentsList = [...state.componentsList];
            //     state.currentActiveItemIdx = nextIdx;
            //     return nextIdx;
            // }
            let len = state.componentsList.length;
            let nextIdx = index < len ? index + 1 : index;
            state.componentsList = arrMoveLower(state.componentsList, index);
            state.currentActiveItemIdx = nextIdx;
            if (state.previewWay && state.previewWay === "auto") {
                state.previewData = arrMoveLower(state.previewData, index)
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
            state.previewData = previewData;
        },
        //设置预览数据
        SET_PREVIEW_DATA(state, { index, data }) {
            state.previewData[index] = data;
            state.previewData = [...state.previewData];
        }
    },
    actions: {

    }
}

store.commit = (mutationType, payload) => store.mutations[mutationType](store.state, payload);

store.dispatch = (actionType, payload) => store.actions[actionType](store.state, payload);

export default store