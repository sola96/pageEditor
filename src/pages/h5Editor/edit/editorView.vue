<template>
  <!-- 编辑器视图 -->
  <div class="editor-view" v-preventRightClick @click="cancelSelect">
    <div class="content" ref="content" @click.stop>
      <transition-group tag="ul" class="content-list" name="content-list">
        <li
          v-for="(item,index) in componentsList"
          :key="item.id"
          @mouseup="rightClick($event,index)"
          :class="{active:currentActiveItem.id===item.id}"
        >
          <component @delete="deleteItem(index)" :is="`item-${item.type}`" :itemData="item"></component>
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
        @command="rightClickCommand"
      ></right-click-menu>
    </div>
  </div>
</template>

<script>
import itemPicture from "./editorViewItem/picture";
import clickoutside from "element-ui/src/utils/clickoutside";
import rightClickMenu from "./rightClickMenu";

export default {
  components: { rightClickMenu, itemPicture },
  data() {
    return {
      currentActiveItemIdx: -1, //当前active状态的item索引
      rightClickMenuData: {
        show: false,
        x: 0,
        y: 0,
        closeFlag: false
      }
    };
  },
  props: {
    componentsList: {
      default() {
        return [];
      },
      type: Array
    }
  },
  computed: {
    // componentsList_filter() {
    //   return this.componentsList.filter(item => item);
    // },
    currentActiveItem() {
      return this.componentsList[this.currentActiveItemIdx] || {};
    }
  },
  directives: {
    preventRightClick: {
      inserted(el) {
        el.oncontextmenu = function(e) {
          e.preventDefault();
        };
      }
    },
    clickoutside
  },
  methods: {
    //删除
    deleteItem(index) {
      let componentsList = [...this.componentsList];
      componentsList.splice(index, 1);
      this.$emit("update:componentsList", componentsList);
    },
    //右键
    rightClick(e, index) {
      this.currentActiveItemIdx = index;
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
      this.currentActiveItemIdx = -1;
    },
    rightClickCommand({ command, value }) {
      let currentActiveItemIdx = this.currentActiveItemIdx;
      if (command === "delete") {
        this.currentActiveItemIdx = -1;
        this.deleteItem(currentActiveItemIdx);
      } else if (command === "move") {
        let componentsList = [...this.componentsList];
        if (value === "top" && currentActiveItemIdx !== 0) {
          let moveItem = componentsList.splice(currentActiveItemIdx, 1);
          componentsList.unshift(...moveItem);
          currentActiveItemIdx = 0;
        }
        if (value === "-1" && currentActiveItemIdx !== 0) {
          let curIdx = currentActiveItemIdx;
          let preIdx = currentActiveItemIdx - 1;
          [componentsList[curIdx], componentsList[preIdx]] = [
            componentsList[preIdx],
            componentsList[curIdx]
          ];
          currentActiveItemIdx = preIdx;
        }
        if (
          value === "+1" &&
          currentActiveItemIdx !== componentsList.length - 1
        ) {
          let curIdx = currentActiveItemIdx;
          let nextIdx = currentActiveItemIdx + 1;
          [componentsList[curIdx], componentsList[nextIdx]] = [
            componentsList[nextIdx],
            componentsList[curIdx]
          ];
          currentActiveItemIdx = nextIdx;
        }
        if (
          value === "bottom" &&
          currentActiveItemIdx !== componentsList.length - 1
        ) {
          let moveItem = componentsList.splice(currentActiveItemIdx, 1);
          componentsList.push(...moveItem);
          currentActiveItemIdx = componentsList.length - 1;
        }
        this.$emit("update:componentsList", componentsList);
      } else if (command === "edit") {
      }
      this.closeRightClickMenu();
      this.currentActiveItemIdx = currentActiveItemIdx;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view {
  width: 336px;
  min-height: 596px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.06);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -298px;
  margin-left: -168px;
  margin-bottom: 40px;
  .content {
    .content-list {
      & > li {
        width: 100%;
        transition: 0.2s;
        box-sizing: border-box;
        border: 1px solid transparent;
        &.active {
          border: 1px solid $color-theme;
        }
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