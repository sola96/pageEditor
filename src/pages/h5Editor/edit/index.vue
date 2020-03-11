<template>
  <!-- 编辑活动 -->
  <div class="page-editor-edit">
    <div class="content">
      <!-- 模板列表 -->
      <div class="owner-template" :class="{hide:!STATE.ownerTemplateShow}">
        <owner-template></owner-template>
        <div class="toggle-visible" @click="STATE.ownerTemplateShow=!STATE.ownerTemplateShow">
          <i :class="[STATE.ownerTemplateShow?'el-icon-arrow-left':'el-icon-arrow-right']"></i>
        </div>
      </div>
      <!-- 编辑器主视图 -->
      <div class="editor-view">
        <editor-view ref="editorView" @setControlData="setControlData"></editor-view>
      </div>
      <!-- 编辑面板：组件控制器视图 -->
      <div class="control-view">
        <control-picture ref="control-picture" v-show="currentControlType==='picture'"></control-picture>
        <control-button ref="control-button" v-show="currentControlType==='button'"></control-button>
      </div>
    </div>
    <!-- 扩展控制 控制扩展视图的显示隐藏以及其他一些设置项-->
    <div class="extend-control-bar">
      <extend-control-bar :extendView.sync="extendView" @backup="backup"></extend-control-bar>
    </div>
    <!-- 以下为扩展视图 -->
    <!--排序面板：组件排序视图 -->
    <div class="extend component-sort-view" v-if="extendView.componentSortView">
      <component-sort-view @refreshPreview="refreshPreview"></component-sort-view>
    </div>
    <!-- 预览视图 -->
    <div class="extend preview-view" v-if="extendView.previewView">
      <preview-view @refreshPreview="refreshPreview"></preview-view>
    </div>
    <div class="toast" v-show="STATE.toastMsg">{{STATE.toastMsg}}</div>
  </div>
</template>

<script>
import ownerTemplate from "./ownerTemplate";
import editorView from "./editorView";
import controlPicture from "./controlViewItem/picture";
import controlButton from "./controlViewItem/button";
import extendControlBar from "./extendControlBar";
import componentSortView from "./componentSortView/index";
import previewView from "./previewView/index";
import store from "../store";
import { getRandomStr } from "../utils";

export default {
  components: {
    ownerTemplate,
    editorView,
    controlPicture,
    controlButton,
    extendControlBar,
    componentSortView,
    previewView
  },
  data() {
    return {
      STATE: store.state, //state
      currentControlType: "", //当前打开的控制视图
      currentControlData: {}, //当前控制视图的数据
      itemCount: 1, //组件计数，添加默认的组件label用，是全局中出现的组件item的数量
      extendView: {
        //当前打开的扩展视图
        componentSortView: false, //排序窗口
        previewView: false //预览视图
      }
    };
  },
  methods: {
    //设置控制器视图
    setControlData({ type, data }) {
      this.currentControlType = type;
      if (data) {
        let setDataFn = this.$refs["control-" + type].setData;
        setDataFn && setDataFn(data);
      }
    },
    //添加组件item
    pushComponentsList(item) {
      item.id = getRandomStr();
      item.label = item.label + String(this.itemCount++);
      store.commit("ADD_ITEM", item);
    },
    //添加图片
    handler_add_picture({ type, config, label }) {
      let item = {
        type,
        config,
        label
      };
      this.pushComponentsList(item);
    },
    //添加富文本
    handler_add_richText({ type, config, label }) {
      let item = {
        type,
        config,
        label
      };
      this.pushComponentsList(item);
    },
    //添加视频
    handler_add_video({ type, config, label }) {
      let item = {
        type,
        config,
        label
      };
      this.pushComponentsList(item);
    },
    //添加表单
    handler_add_form({ type, config, label }) {
      console.log("添加表单", config.name);
    },
    //添加按钮
    handler_add_button({ type, config, label }) {
      let item = {
        type,
        config,
        label: config.name
      };
      this.pushComponentsList(item);
    },
    //执行添加操作的回调，根据type执行对应的函数
    addComponents(data) {
      let handler = this[`handler_add_${data.type}`];
      if (handler) {
        handler(data);
      }
    },
    //刷新预览视图
    refreshPreview() {
      this.$refs.editorView.getPreviewData();
    },
    backup() {
      this.$refs.editorView.backup();
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
  & > .content {
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
      position: relative;
      overflow-y: scroll;
      background-color: #fff;
    }
  }
  & > .extend-control-bar {
    position: absolute;
    top: 0;
    right: 312px;
    z-index: 2;
  }
  & > .extend {
  }
  & > .toast {
    padding: 10px;
    position: fixed;
    top: 60px;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    text-align: center;
    background-color: rgba($color: #000000, $alpha: 0.8);
    color: #fff;
    border-radius: 4px;
    transition: 0.3s;
    animation: toast-enter 0.3s;
    z-index: 10;
    font-size: 14px;
  }

  @keyframes toast-enter {
    0% {
      opacity: 0;
      transform: translateY(-10px) scale(0.6);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}
</style>