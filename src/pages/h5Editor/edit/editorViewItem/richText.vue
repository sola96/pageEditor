<template>
  <!-- 富文本 -->
  <div class="editor-view_richText" :class="{active:isActive}">
    <div class="editor-content" ref="editorContent" @mouseup="inputMouseup"></div>
  </div>
</template>

<script>
import { common } from "./mixin";
import { createHtmlStr, getRandomStr } from "../../utils";
import store from "../../store";
import Editor from "wangeditor";

export default {
  mixins: [common],
  data() {
    return {
      /** @property {Object} in_itemData mixin中的in_itemData*/
      STATE: store.state,
      htmlStr: ""
    };  
  },
  methods: {
    inputMouseup(e) {
      if (e.button === 2) {
        e.stopPropagation();
      }
    },
    getSelfHtmlStr() {
      return {
        id: getRandomStr(),
        htmlStr: this.htmlStr || null
      };
    },
    setControlData() {
      // this.$emit("setControlData", { type: this.itemData.type, data });
    }
  },
  mounted() {
    this.editorInstance = new Editor(this.$refs.editorContent);
    this.editorInstance.customConfig.menus = [
      "fontSize",
      "bold",
      "italic",
      "foreColor",
      "backColor",
      "justify"
    ];
    this.editorInstance.customConfig.onchange = html => {
      this.htmlStr = html;
    };
    this.editorInstance.create();
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