<template>
  <!-- 组件排序视图 -->
  <div class="component-sort-view" id="component-sort-view">
    <div class="tab drag">
      <div class="title" v-drag:#component-sort-view>选择窗口</div>
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
              v-for="item in in_componentsList"
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
import store from "../../store";
import directives from "../../directives";

export default {
  components: { draggable, sortItem },
  data() {
    return {
      STATE: store.state,
      contentShow: true,
      currentDragIdx: -1
    };
  },
  computed: {
    currentDrag() {
      return this.in_componentsList[this.currentDragIdx] || { id: "" };
    },
    in_componentsList: {
      get() {
        return this.STATE.componentsList;
      },
      set(val) {
        store.commit("REPLACE_COMPONENT_LIST", val);
      }
    }
  },
  props: {},
  directives: {
    drag: directives.drag
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
    transition: 0.2s;
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