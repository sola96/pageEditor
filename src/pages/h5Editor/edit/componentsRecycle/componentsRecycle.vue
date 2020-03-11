<template>
  <!-- 组件回收站 -->
  <div class="components-recycle">
    <div class="tip">删除的组件会暂存在这里，最多保存5个</div>
    <ul>
      <li
        @click="addComponent(item,index)"
        v-for="(item,index) in STATE.deleteItemCollection"
        :key="item.itemData.id"
        @mouseenter="setCurrentHtml(item)"
        @mouseleave="setCurrentHtml(null)"
      >
        <div class="label">{{item.itemData.label}}</div>
        <div class="time">
          <span>删除时间：</span>
          {{item.timestamp | getTime}}
        </div>
        <div
          class="preview"
          v-if="currentHover===item.itemData.id"
          v-html="currentHtml&&currentHtml.htmlStr"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../../store";
import { getTime } from "../../utils";

export default {
  data() {
    return {
      STATE: store.state,
      currentHtml: "",
      currentHover: ""
    };
  },
  filters: {
    getTime
  },
  methods: {
    setCurrentHtml(item) {
      if (!item) {
        this.currentHtml = "";
        this.currentHover = "";
      } else {
        this.currentHtml = item.html;
        this.currentHover = this.currentHtml ? item.itemData.id : "";
      }
    },
    addComponent({ itemData, componentState }, index) {
      store.commit("ADD_ITEM", itemData);
      this.setCurrentHtml();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.components-recycle {
  width: 100%;
  font-size: 13px;
  user-select: none;
  .tip {
    color: $color-text-l;
  }
  li {
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 4px;
    position: relative;
    &:hover {
      background-color: $color-bg-2;
      .label {
        color: $color-theme;
      }
    }
    .label {
      font-size: 14px;
      color: $color-text;
      font-weight: 800;
    }
    .time {
      font-size: 12px;
      color: $color-text-l;
      margin-top: 2px;
    }
    .preview {
      width: $editor-width;
      position: absolute;
      top: 0;
      left: -120%;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 0 14px rgba($color: #000000, $alpha: 0.2);
      background-color: #fff;
      z-index: 10;
      transform: scale(0.6);
      transform-origin: top right;
    }
  }
}
</style>