<template>
  <div class="page-editor" v-preventRightClick>
    <div class="tab-bar">
      <ul class="tab">
        <li class="tab-item" :class="{active:current==='edit'}" @click="current='edit'">编辑活动</li>
        <li class="tab-item" :class="{active:current==='push'}" @click="current='push'">发布活动</li>
      </ul>
      <div class="main">
        <add-components @selectItem="addComponents"></add-components>
      </div>
      <div class="control">
        <div class="full-screen">
          <el-switch v-model="fullScreen" active-color="#409eff" inactive-color="#C0CCDA"></el-switch>全屏
        </div>
      </div>
    </div>
    <div class="editor-content">
      <component-edit ref="edit"></component-edit>
    </div>
  </div>
</template>

<script>
import componentEdit from "./edit/index";
import addComponents from "./tab/addComponents/addComponents";
import directives from "./directives";
export default {
  components: {
    componentEdit,
    addComponents
  },
  data() {
    return {
      current: "edit", //当前
      fullScreen: false //是否全屏
    };
  },
  directives: {
    preventRightClick: directives.preventRightClick
  },
  methods: {
    //添加components
    addComponents(data) {
      this.$refs.edit.addComponents(data);
    }
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
      width: 200px;
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
    .main {
      height: 100%;
      flex: 1;
    }
    .control {
      height: 100%;
      width: 300px;
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
  .editor-content {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0;
    left: 0;
    background-color: rgb(245, 248, 253);
  }
}
</style>