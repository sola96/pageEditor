<template>
  <div class="page-editor">
    <div class="tab-bar">
      <ul class="tab">
        <li class="tab-item" :class="{active:current==='edit'}" @click="current='edit'">编辑活动</li>
        <li class="tab-item" :class="{active:current==='push'}" @click="current='push'">发布活动</li>
      </ul>
      <div class="components">
        <ul>
          <li>图片</li>
          <li>富文本</li>
          <li>视频</li>
          <li>表单</li>
          <li>按钮</li>
        </ul>
      </div>
      <div class="control">
        <div class="full-screen">
          <el-switch v-model="fullScreen" active-color="#409eff" inactive-color="#C0CCDA"></el-switch>
          全屏
        </div>
      </div>
    </div>
    <div class="component-view">
      <keep-alive>
        <component :is="current"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import edit from "./edit/index";
import push from "./push/index";
export default {
  components: {
    edit,
    push
  },
  data() {
    return {
      current: "edit",
      fullScreen: false
    };
  },
  watch: {
    fullScreen(newVal) {
      if (newVal) {
        document.documentElement.webkitRequestFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.page-editor {
  width: 100%;
  height: 100vh;
  position: relative;
  min-width: 900px;
  ::-webkit-scrollbar {
    /* 血槽宽度 */
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /* 拖动条 */
    background-color: rgb(173, 173, 173);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-track {
    /* 背景槽 */
    background-color: #ddd;
    border-radius: 6px;
  }
  .tab-bar {
    width: 100%;
    height: 50px;
    user-select: none;
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    background-color: rgb(0, 18, 53);
    .tab {
      height: 100%;
      width: 20%;
      box-sizing: border-box;
      padding-left: 20px;
      display: flex;
      align-items: center;
      .tab-item {
        height: 30px;
        border-radius: 4px;
        padding: 0 10px;
        color: #fff;
        font-size: 12px;
        line-height: 30px;
        cursor: pointer;
        @include no-wrap;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &.active {
          background-color: $color-theme;
        }
      }
    }
    .components {
      height: 100%;
      flex: 1;
      & > ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        & > li {
          cursor: pointer;
        }
        & > li:not(:first-child) {
          margin-left: 20px;
        }
      }
    }
    .control {
      height: 100%;
      width: 20%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      padding-right: 20px;
      .full-screen {
        font-size: 14px;
        color: #fff;
        padding: 0 4px;
        cursor: pointer;
      }
    }
  }
  .component-view {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0;
    left: 0;
    background-color: rgb(245, 248, 253);
  }
}
</style>