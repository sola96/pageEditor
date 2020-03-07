<template>
  <!-- 视频 -->
  <div class="editor-view_video">
    <div class="content" :class="{active:isActive}">
      <span class="label">视频链接:</span>
      <!-- 这里的input要阻止mouseup和oncontextmenu事件的传递，因为用户可能进行粘贴 -->
      <input
        @mouseup="inputMouseup"
        @contextmenu.stop
        @blur="blur"
        class="input"
        type="text"
        ref="input"
        v-model="src"
      />
      <!-- <el-input class="input" size="mini" v-model="src"></el-input> -->
    </div>
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
      src: ""
    };
  },
  props: {
    itemData: {
      default() {
        return {};
      },
      type: Object
    }
  },
  methods: {
    inputMouseup(e) {
      if (e.button === 2) {
        e.stopPropagation();
      }
    },
    getSelfHtmlStr() {
      if (!this.src) return null;
      let nodeObj = {
        tag: "video",
        attrs: {
          src: this.src,
          controls: ""
        },
        style: {
          width: "100%"
        }
      };
      return createHtmlStr(nodeObj);
    },
    blur() {
      if (this.STATE.previewWay && this.STATE.previewWay === "auto") {
        store.commit("SET_PREVIEW_DATA", {
          index: this.index,
          data: this.getSelfHtmlStr()
        });
      }
    },
    render(previewData) {
      previewData[this.index] = this.getSelfHtmlStr();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_video {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  & > .content {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: $color-theme;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
    .label {
      display: inline-block;
      width: 80px;
      line-height: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      user-select: none;
      color: #fff;
    }
    .input {
      flex: 1;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      font-size: 13px;
      color: #fff;
      &:focus {
        border-bottom-width: 2px;
      }
    }
  }
}
</style>