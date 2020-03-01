import controlView from "../controlView";

export const common = {
    components: { controlView },
    data() {
        return {
            in_itemData: {}//组件内部的itemData
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
            console.error("需要设置一个 'setControlData' 函数   ")
        }
    },
    created() {
        this.in_itemData = Object.assign({}, this.itemData);
    },
}