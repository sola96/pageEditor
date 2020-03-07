<template>
  <!-- 按钮 -->
  <div class="editor-view_button" :class="{active:isActive}">
    <ul class="btn-list">
      <li v-for="(item,index) in btns" :key="index">
        <div class="item" :style="item.style">{{item.text}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { common } from "./mixin";
import { createHtmlStr } from "../../utils";
import store from "../../store";
export default {
  mixins: [common],
  data() {
    return {
      /** @property {Object} in_itemData mixin中的in_itemData*/
      STATE: store.state,
      btns: []
    };
  },
  methods: {
    getSelfHtmlStr() {
      return null;
    },
    setControlData() {
      let _this = this;
      let data = {
        get btns() {
          return _this.btns;
        },
        set btns(value) {
          _this.btns = value;
        }
      };
      this.$emit("setControlData", { type: this.itemData.type, data });
    }
  },
  created() {
    this.btns = Array(this.in_itemData.config.num)
      .fill(null)
      .map(i => ({
        style: {},
        text: "按钮",
        url: ""
      }));
    console.log(this.btns);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_button {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid transparent;
  &.active {
    border-color: $color-theme;
  }
  .btn-list {
    width: 100%;
    display: flex;
    border-radius: 2px;
    overflow: hidden;
    & > li {
      width: 1px;
      flex: 1;
      &:not(:first-child) {
        margin-left: 1px;
      }
      .item {
        width: 100%;
        height: 36px;
        box-sizing: border-box;
        padding: 0 8px;
        text-align: center;
        line-height: 36px;
        @include no-wrap;
        font-size: 14px;
        color: $color-text;
        background-color: rgb(240, 240, 240);
      }
    }
  }
}
</style>