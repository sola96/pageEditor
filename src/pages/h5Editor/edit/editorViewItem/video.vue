<template>
  <!-- 视频 -->
  <div class="editor-view_video">
    <div class="content" :class="{active:isActive}">
      <span class="label">视频链接:</span>
      <el-input size="small" v-model="src"></el-input>
    </div>
  </div>
</template>

<script>
import { common } from "./mixin";

export default {
  mixins: [common],
  data() {
    return {
      /** @property {Object} in_itemData mixin中的in_itemData*/
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
  watch: {
    isActive(newVal) {
      if (newVal) {
        this.setControlData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_video {
  width: 100%;
  margin: 10px 0;
  & > .content {
    border: 1px solid transparent;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    &.active {
      border-color: $color-theme;
    }
    .label {
      display: inline-block;
      width: 100px;
      line-height: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      user-select: none;
    }
  }
}
</style>