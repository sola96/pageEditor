import store from "../../store";

export const common = {
    data() {
        return {
            in_itemData: {},//组件内部的itemData
        }
    },
    props: {
        itemData: {
            default() {
                return {};
            },
            type: Object
        },
        activeId: {//当前处于active状态的item的id
            type: String,
            default: ""
        },
        index: {
            type: Number,
            default: -1
        }
    },
    computed: {
        //是否处于active状态
        isActive() {
            return this.activeId === this.itemData.id;
        }
    },
    methods: {
        //注册菜单
        registerMenu(menuList) {
            this.$emit("registerRightClickMenu", {
                id: this.itemData.id,
                menuList
            });
        },
        //设置控制器视图
        setControlData() {
            console.error(`<${this.itemData.type}>组件缺少setControlData函数，需要实现一个 'setControlData' 函数`);
            this.$emit("setControlData", { type: "", data: null });
            // this.$emit("setControlData", { type: this.itemData.type, data });
        },
        getSelfHtmlStr() {
            console.error(`<${this.itemData.type}>组件缺少getSelfHtmlStr函数，需要实现一个 'getSelfHtmlStr' 函数`);
            return null;
        },
        refreshPreview() {
            if (this.STATE.previewWay && this.STATE.previewWay === "auto") {
                store.commit("SET_PREVIEW_DATA", {
                    index: this.index,
                    data: this.getSelfHtmlStr()
                });
            }
        },
        //渲染当前组件
        render(previewData) {
            previewData[this.index] = this.getSelfHtmlStr();
        },
        //提交
        submit() {
            console.error(`<${this.itemData.type}>组件缺少submit函数，需要实现一个 'submit' 函数`);
        },
        //备份
        backup() {
            let selfState = JSON.parse(JSON.stringify(this.$data));
            delete selfState.STATE;
            delete selfState.in_itemData;
            return selfState;
        }
    },
    created() {
        this.in_itemData = Object.assign({}, this.itemData);
    },
    mounted() {
        let deleteItemCollection = store.state.deleteItemCollection;
        let n = deleteItemCollection.findIndex(item => item.itemData.id === this.itemData.id);
        if (n > -1) {
            Object.assign(this.$data, deleteItemCollection[n].componentState);
            store.commit("REMOVE_DELETE_DATA", n);
        }
        this.refreshPreview();
    },
    watch: {
        isActive(newVal) {
            if (newVal) {
                this.setControlData();
            }
        }
    }
}