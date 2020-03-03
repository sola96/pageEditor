<template>
  <!-- 编辑活动 -->
  <div class="page-editor-edit">
    <!-- 模板列表 -->
    <div class="owner-template" :class="{hide:!ownerTemplateShow}">
      <owner-template></owner-template>
      <div class="toggle-visible" @click="ownerTemplateShow=!ownerTemplateShow">
        <i :class="[ownerTemplateShow?'el-icon-arrow-left':'el-icon-arrow-right']"></i>
      </div>
    </div>
    <!-- 编辑器主视图 -->
    <div class="editor-view">
      <editor-view :componentsList.sync="componentsList" @setControlData="setControlData"></editor-view>
    </div>
    <!--排序面板：组件排序视图 -->
    <div class="component-sort-view">
      <component-sort-view :componentsList.sync="componentsList"></component-sort-view>
    </div>
    <!-- 编辑面板：组件控制器视图 -->
    <div class="control-view">
      <control-picture ref="control-picture" v-show="currentControlType==='picture'"></control-picture>
    </div>
  </div>
</template>

<script>
import ownerTemplate from "./ownerTemplate";
import editorView from "./editorView";
import componentSortView from "./componentSortView/index";
import controlPicture from "./controlViewItem/picture";
export default {
  components: { ownerTemplate, editorView, componentSortView, controlPicture },
  data() {
    return {
      ownerTemplateShow: true, //“我的推广页”显示
      componentsList: [], //组件item列表
      currentControlType: "",
      currentControlData: {},
      itemCount: 1
    };
  },
  methods: {
    setControlData({ type, data }) {
      this.currentControlType = type;
      if (data) {
        let setDataFn = this.$refs["control-" + type].setData;
        setDataFn && setDataFn(data);
      }
    },
    getRandomStr() {
      return Math.random() + Math.random().toString(32);
    },
    pushComponentsList(item) {
      item.id = this.getRandomStr();
      item.label = item.label + String(this.itemCount++);
      this.componentsList.push(item);
    },
    handler_add_picture({ type, config, label }) {
      let item = {
        type,
        config,
        label
      };
      this.pushComponentsList(item);
    },
    handler_add_richText({ type, config, label }) {},
    handler_add_video({ type, config, label }) {
      let item = {
        type,
        config,
        label
      };
      this.pushComponentsList(item);
    },
    handler_add_form({ type, config, label }) {
      console.log("添加表单", config.name);
    },
    handler_add_button({ type, config, label }) {
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
  & > .owner-template {
    width: 200px;
    transition: 0.3s;
    z-index: 3;
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
    overflow-y: scroll;
    position: relative;
    z-index: 1;
    min-width: 400px;
  }
  & > .control-view {
    z-index: 2;
    height: 100%;
    width: 300px;
    background-color: #fff;
  }
}
</style>