<template>
  <!-- 编辑活动 -->
  <div class="page-editor-edit">
    <div class="owner-template" :class="{hide:!ownerTemplateShow}">
      <owner-template></owner-template>
      <div class="toggle-visible" @click="ownerTemplateShow=!ownerTemplateShow">
        <i :class="[ownerTemplateShow?'el-icon-arrow-left':'el-icon-arrow-right']"></i>
      </div>
    </div>
    <div class="editor-view">
      <editor-view :componentsList.sync="componentsList"></editor-view>
    </div>
    <div class="control-view">
      <control-view></control-view>
    </div>
  </div>
</template>

<script>
import ownerTemplate from "./ownerTemplate";
import editorView from "./editorView";
import controlView from "./controlView";
export default {
  components: { ownerTemplate, editorView, controlView },
  data() {
    return {
      ownerTemplateShow: true, //“我的推广页”显示
      componentsList: []
    };
  },
  methods: {
    getRandomStr() {
      return Math.random() + Math.random().toString(32);
    },
    pushComponentsList(item) {
      item.id = this.getRandomStr();
      this.componentsList.push(item);
    },
    handler_add_picture({ type, config }) {
      let item = {
        src: "",
        type,
        config
      };
      this.pushComponentsList(item);
    },
    handler_add_richText(config) {
      console.log("添加富文本", config.name);
    },
    handler_add_video(config) {
      console.log("添加视频", config.name);
    },
    handler_add_form(config) {
      console.log("添加表单", config.name);
    },
    handler_add_button(config) {
      console.log("添加按钮", config.name);
    },
    //添加components
    addComponents(data) {
      let handler = this[`handler_add_${data.type}`];
      if (handler) {
        handler(data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.page-editor-edit {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  & > div {
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .owner-template {
    width: 200px;
    transition: 0.3s;
    z-index: 2;
    &.hide {
      margin-left: -200px;
    }
    .toggle-visible {
      width: 20px;
      height: 60px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      right: -20px;
      margin-top: -30px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      box-shadow: 4px 0 6px rgba($color: #000000, $alpha: 0.1);
      &:hover {
        background-color: $color-line;
      }
    }
  }
  & > .editor-view {
    flex: 1;
    border: 1px solid #ff0000;
    overflow-y: scroll;
  }
  & > .control-view {
    width: 300px;
    // border: 1px solid #00ff00;
    background-color: #fff;
  }
}
</style>