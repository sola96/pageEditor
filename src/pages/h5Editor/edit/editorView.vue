<template>
  <!-- 编辑器视图 -->
  <div class="editor-view" ref="editorView" @click="cancelSelect">
    <div class="content" ref="content" @click.stop>
      <transition-group tag="ul" class="content-list" name="content-list">
        <li
          v-for="(item,index) in STATE.componentsList"
          :key="item.id"
          @mouseup="rightClick($event,index)"
        >
          <component
            @delete="deleteItem(index)"
            @registerRightClickMenu="registerRightClickMenu"
            v-on="$listeners"
            class="component-item"
            :class="{active:STATE.currentActiveItem.id===item.id}"
            :is="`item-${item.type}`"
            :itemData="item"
            :ref="item.id"
            :activeId="STATE.currentActiveItem.id"
            :index="index"
          ></component>
        </li>
      </transition-group>
    </div>
    <div
      class="right-click-menu"
      v-clickoutside="closeRightClickMenu"
      v-show="rightClickMenuData.show"
    >
      <right-click-menu
        :x="rightClickMenuData.x"
        :y="rightClickMenuData.y"
        :additionMenu="additionMenu"
        @command="rightClickCommand"
      ></right-click-menu>
    </div>
  </div>
</template>

<script>
import itemPicture from "./editorViewItem/picture";
import itemRichText from "./editorViewItem/richText";
import itemVideo from "./editorViewItem/video";
import itemForm from "./editorViewItem/form";
import itemButton from "./editorViewItem/button";
import rightClickMenu from "./rightClickMenu";
import store from "../store";
import directives from "../directives";

export default {
  components: {
    rightClickMenu,
    itemPicture,
    itemRichText,
    itemVideo,
    itemForm,
    itemButton
  },
  data() {
    return {
      STATE: store.state,
      rightClickMenuData: {
        show: false, //右键菜单显示
        x: 0, //位置的left
        y: 0, //位置的top
        closeFlag: false, //该值为true的时候，执行closeRightClickMenu()才会关闭菜单
        additionMenu: {} //组件注册的菜单
      }
    };
  },
  props: {},
  computed: {
    //附加菜单（附加的菜单通过组件的registerRightClickMenu事件注册）
    additionMenu() {
      let menu = this.rightClickMenuData.additionMenu[
        this.STATE.currentActiveItem.id
      ];
      return menu || [];
    }
  },
  directives: {
    clickoutside: directives.clickoutside
  },
  methods: {
    //删除
    deleteItem(index) {
      let id = this.STATE.componentsList[index].id;
      let nodeRef = this.$refs[id][0];
      let componentState = nodeRef.$data;
      let html = nodeRef.getSelfHtmlStr && nodeRef.getSelfHtmlStr();
      delete componentState.STATE;
      let delItem = store.commit("DELETE_ITEM", index);
      store.commit("SAVE_DELETE_DATA", {
        componentState,
        html,
        itemData: delItem[0],
        timestamp: Date.now()
      });
      //删除组件的同时要删除该组件之前注册的菜单选项
      if (this.rightClickMenuData.additionMenu[delItem.id]) {
        delete this.rightClickMenuData.additionMenu[delItem.id];
      }
      //若当前active状态的item被删除，应取消选择
      if (this.STATE.currentActiveItemIdx == index) {
        this.cancelSelect();
      }
    },
    //注册右键菜单
    registerRightClickMenu(data) {
      if (!data) return;
      let { id, menuList } = data;
      let _addData = {};
      _addData[id] = menuList.map(item => {
        item.custom = true;
        return item;
      });
      this.rightClickMenuData.additionMenu = Object.assign(
        {},
        this.rightClickMenuData.additionMenu,
        _addData
      );
    },
    //item点击事件
    rightClick(e, index) {
      store.commit("SET_CURIDX", index);
      if (e.button === 2) {
        let posX = e.pageX + 10;
        let posY = e.pageY + 10;
        this.openRightClickMenu(posX, posY);
      }
    },
    //打开右键菜单
    openRightClickMenu(x, y) {
      this.rightClickMenuData.show = true;
      this.rightClickMenuData.closeFlag = false;
      this.rightClickMenuData.x = x;
      this.rightClickMenuData.y = y;
    },
    //关闭右键菜单
    closeRightClickMenu(cancelSelect = false) {
      if (!this.rightClickMenuData.closeFlag) {
        this.rightClickMenuData.closeFlag = true;
        return;
      }
      this.rightClickMenuData.show = false;
      if (cancelSelect) {
        this.cancelSelect();
      }
    },
    //取消选中
    cancelSelect() {
      store.commit("SET_CURIDX", -1);
      this.$emit("setControlData", { data: null, type: "" }); //派发setControlData事件，清空父组件的控制器视图
    },
    //执行右键菜单命令
    rightClickCommand(data) {
      let { command, value, custom } = data;
      if (custom) {
        this.customRightClickCommand(data);
        return;
      }
      let currentActiveItemIdx = this.STATE.currentActiveItemIdx;
      if (command === "delete") {
        this.deleteItem(currentActiveItemIdx);
      }
      this.closeRightClickMenu();
    },
    //自定义命令（由组件注册的右键命令）
    customRightClickCommand(data) {
      let commandFn = this.$refs[this.STATE.currentActiveItem.id][0].rightClick;
      if (commandFn) {
        commandFn(data);
      }
      this.closeRightClickMenu();
    },
    //备份
    //该方法由父组件调用
    //自动备份时间到了或快捷键ctrl+s，会调用该函数
    backup() {
      let backupData = this.STATE.componentsList.map((item, index) => {
        return {
          itemData: item,
          componentState: this.$refs[item.id][0].backup(),
          timestamp: Date.now()
        };
      });
      store.commit("SET_BACKUP", backupData);
    }
  },
  mounted() {
    let self = this;
    this.keydownEvent = e => {
      if (
        e.keyCode === 8 && //按下删除键
        e.target.tagName === "BODY" && //在body上按下删除键（避免input等内容中的删除键冲突）
        self.STATE.currentActiveItemIdx > -1
      ) {
        //删除
        self.deleteItem(self.STATE.currentActiveItemIdx);
      }
    };
    document.addEventListener("keydown", this.keydownEvent);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownEvent);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view {
  width: $editor-width;
  min-height: 596px;
  background-color: $color-bg-1;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.06);
  margin: 60px auto;
  .content {
    .content-list {
      & > li {
        width: $editor-width;
        transition: 0.2s;
        box-sizing: border-box;
      }
    }
  }
  .content-list-enter,
  .content-list-leave-to {
    // height: 0;
    opacity: 0;
  }
  .content-list-leave-active {
    position: absolute;
    border-color: transparent;
  }
}
</style>