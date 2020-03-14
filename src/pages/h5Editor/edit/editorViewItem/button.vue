<template>
  <!-- 按钮 -->
  <div class="editor-view_button" :class="{active:isActive}">
    <ul class="btn-list" ref="btnList">
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
      let obj = {
        tag: "div",
        style: {
          width: "100%",
          display: "flex",
          borderRadius: "2px",
          overflow: "hidden",
          userSelect: "none",
          boxSizing:"border-box",
          padding:"0 4px"
        },
        children: []
      };
      obj.children = this.btns.map((item, index) => ({
        tag: "button",
        text: item.text,
        style: {
          ...item.style,
          width: "1px",
          flex: "1",
          height: "36px",
          boxSizing: "border-box",
          padding: "0 8px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          border: "none",
          marginLeft: index > 0 ? "1px" : "0"
        }
      }));
      return createHtmlStr(obj);
    },
    setControlData() {
      let _this = this;
      let data = {
        get btns() {
          return _this.btns;
        },
        set btns(value) {
          _this.btns = value;
        },
        get refreshPreview() {
          return _this.refreshPreview;
        }
      };
      this.$emit("setControlData", { type: this.itemData.type, data });
    }
  },
  created() {
    this.btns = Array(this.in_itemData.config.num)
      .fill(null)
      .map((item, index) => ({
        style: {
          color: "#606266",
          backgroundColor: "rgb(240, 240, 240)",
          fontSize: "14px",
          textAlign: "center"
        },
        text: "按钮" + (index + 1),
        url: ""
      }));
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
    user-select: none;
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
      }
    }
  }
}
</style>