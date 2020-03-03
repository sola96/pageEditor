<template>
  <!-- 组件排序视图 -->
  <div class="component-sort-view" id="component-sort-view">
    <div class="tab drag">
      <div class="title" v-drag>选择窗口</div>
      <div class="min" @click="contentShow=!contentShow">
        <i :class="[contentShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
      </div>
    </div>
    <transition name="content">
      <div class="content" v-show="contentShow">
        <draggable
          v-model="in_componentsList"
          :options="{animation:200}"
          @start="startDrag"
          @end="endDrag"
        >
          <transition-group tag="ul">
            <li
              class="item"
              :class="{active:currentDrag.id===item.id}"
              v-for="item in componentsList"
              :key="item.id"
            >
              <sort-item :itemData="item" class="item-content"></sort-item>
            </li>
          </transition-group>
        </draggable>
      </div>
    </transition>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sortItem from "./sortItem";
export default {
  components: { draggable, sortItem },
  data() {
    return {
      contentShow: true,
      currentDragIdx: -1
    };
  },
  computed: {
    currentDrag() {
      return this.componentsList[this.currentDragIdx] || { id: "" };
    },
    in_componentsList: {
      get() {
        return this.componentsList;
      },
      set(val) {
        this.$emit("update:componentsList", val);
      }
    }
  },
  props: {
    componentsList: {
      default() {
        return [];
      },
      type: Array
    }
  },
  directives: {
    drag(el) {
      el.onmousedown = function(e) {
        let parent_el = document.getElementById("component-sort-view");
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var divx = e.clientX - parent_el.offsetLeft;
        var divy = e.clientY - parent_el.offsetTop;
        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function(e) {
          //获取移动后div的位置：鼠标位置-divx/divy
          // var l = Math.max(e.clientX - divx, 200);
          var l = Math.max(e.clientX - divx);
          var t = Math.max(e.clientY - divy, 50);
          if (t - 50 <= 20) {
            t = 50;
          }
          parent_el.style.left = l + "px";
          parent_el.style.top = t + "px";
        };
        document.onmouseup = function(e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
  methods: {
    startDrag(e) {
      this.currentDragIdx = e.oldIndex;
    },
    endDrag(e) {
      this.currentDragIdx = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.component-sort-view {
  position: fixed;
  top: 100px;
  width: 300px;
  right: 310px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
  z-index: 4;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tab {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    background-color: $color-line;
    user-select: none;
    .title {
      flex: 1;
      height: 100%;
      line-height: 30px;
      font-size: 12px;
      color: $color-text;
      cursor: move;
    }
    .min {
      user-select: none;
      width: 20px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #999;
      }
    }
  }
  .content {
    width: 100%;
    overflow-y: scroll;
    height: 70vh;
    transition: .2s;
    .item {
      height: 32px;
      line-height: 32px;
      color: $color-text;
      user-select: none;
      cursor: move;
      font-size: 13px;
      border-bottom: 1px solid $color-line-l;
      // transition: .3s;
      &.active {
        .item-content {
          background-color: $color-line-l;
        }
      }
    }
  }
  .content-enter,
  .content-leave-to {
    height: 0;
  }
}
</style>