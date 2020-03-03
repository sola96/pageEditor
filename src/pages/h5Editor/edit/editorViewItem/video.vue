<template>
  <!-- 视频 -->
  <div class="editor-view_video">
    <div class="content" :class="{active:isActive}">
      <span class="label">视频链接:</span>
      <input class="input" type="text" v-model="src" />
      <!-- <el-input class="input" size="mini" v-model="src"></el-input> -->
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
      &:focus{
        border-bottom-width: 2px;
      }
    }
  }
}
</style>