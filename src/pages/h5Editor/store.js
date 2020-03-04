const store = {
    state: {
        ownerTemplateShow: true, //“我的推广页”显示
        componentsList: [], //组件item列表
        currentActiveItemIdx: -1, //当前active状态的item索引
        currentActiveItem: { id: "" }
    },
    mutations: {
        SET_CURIDX(state, index) {
            state.currentActiveItemIdx = index
            state.currentActiveItem = state.componentsList[index] || { id: "" }
        },
        TOGGLE_OWNER_TEMPLATE(state, flag) {
            state.ownerTemplateShow = flag
        },
        REPLACE_COMPONENT_LIST(state, list) {
            state.componentsList = list
        },
        ADD_ITEM(state, item) {
            state.componentsList.push(item)
        },
        DELETE_ITEM(state, index) {
            console.log(index)
            let delItem = state.componentsList.splice(index, 1);
            return delItem
        },
        MOVE_TOP(state, index) {
            if (index !== 0) {
                let moveItem = state.componentsList.splice(index, 1);
                state.componentsList.unshift(...moveItem);
                state.currentActiveItemIdx = 0
                return 0
            }
        },
        MOVE_UPPER(state, index) {
            if (index !== 0) {
                let curIdx = index;
                let preIdx = index - 1;
                [state.componentsList[curIdx], state.componentsList[preIdx]] = [
                    state.componentsList[preIdx],
                    state.componentsList[curIdx]
                ];
                state.componentsList = [...state.componentsList]
                state.currentActiveItemIdx = preIdx
                return preIdx
            }
        },
        MOVE_LOWER(state, index) {
            if (index !== state.componentsList.length - 1) {
                let curIdx = index;
                let nextIdx = index + 1;
                [state.componentsList[curIdx], state.componentsList[nextIdx]] = [
                    state.componentsList[nextIdx],
                    state.componentsList[curIdx]
                ];
                state.componentsList = [...state.componentsList]
                state.currentActiveItemIdx = nextIdx
                return nextIdx
            }
        },
        MOVE_BOTTOM(state, index) {
            let len = state.componentsList.length - 1
            if (index !== len) {
                let moveItem = state.componentsList.splice(index, 1);
                state.componentsList.push(...moveItem);
                state.currentActiveItemIdx = len
                return len
            }
        },
    },
    actions: {

    }
}

store.commit = (mutationType, payload) => store.mutations[mutationType](store.state, payload)

store.dispatch = (actionType, payload) => store.actions[actionType](store.state, payload)

export default store