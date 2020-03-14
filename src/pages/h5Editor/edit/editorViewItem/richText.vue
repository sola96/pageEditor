<template>
  <!-- 富文本 -->
  <div class="editor-view_richText" :class="{active:isActive}">#富文本</div>
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
      STATE: store.state
    };
  },
  methods: {
    getSelfHtmlStr() {
      let obj = {
        tag: "div",
        text: "#富文本"
      };
      return createHtmlStr(obj);
    },
    setControlData() {
      // this.$emit("setControlData", { type: this.itemData.type, data });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_richText {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid transparent;
  &.active {
    border-color: $color-theme;
  }
}
</style>