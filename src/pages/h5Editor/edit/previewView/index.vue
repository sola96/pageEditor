<template>
  <!-- 预览视图 -->
  <div class="preview-view" id="preview-view" v-stick>
    <div class="tab drag">
      <div class="title" v-drag:#preview-view>预览</div>
      <div class="handle">
        <el-tooltip
          class="item"
          effect="dark"
          :content="STATE.previewWay==='auto'?'在编辑器更改元素时会自动刷新预览视图，点击切换到<手动预览>':'使用快捷键 Alt + 1 可刷新预览视图，点击切换到<自动预览>'"
          placement="top"
        >
          <span @click="togglePreviewWay">
            <i class="el-icon-refresh"></i>
            <span>{{STATE.previewWay==='auto'?'自动预览':'Alt + 1 预览'}}</span>
          </span>
        </el-tooltip>
      </div>
    </div>
    <div class="content" v-loading="manualLoading">
      <iphonex>
        <ul>
          <li v-for="item in previewData_filter" :key="item.id" v-html="item.htmlStr"></li>
        </ul>
      </iphonex>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import directives from "../../directives";
import iphonex from "./iphonex";
import iphone6 from "./iphone6";

export default {
  components: { iphonex, iphone6 },
  data() {
    return {
      STATE: store.state,
      manualLoading: false
    };
  },
  computed: {
    previewData_filter() {
      return this.STATE.previewData.filter(item => item);
    }
  },
  directives: {
    drag: directives.drag,
    stick: directives.stick
  },
  methods: {
    togglePreviewWay() {
      if (this.STATE.previewWay === "manual") {
        store.commit("TOGGLE_PREVIEW_WAY", "auto");
        this.$emit("refreshPreview"); // 切换为自动时候先执行一次刷新，保证视图一致
        this.removeRefreshKey(); // 切换为自动时候要清除手动快捷键的监听
      } else {
        store.commit("TOGGLE_PREVIEW_WAY", "manual");
        document.addEventListener("keydown", this.refreshKey); //切换为手动时添加快捷键监听
      }
      // this.$emit("refreshPreview");
    },
    removeRefreshKey() {
      document.removeEventListener("keydown", this.refreshKey);
    }
  },
  mounted() {
    this.$emit("refreshPreview");
    // store.commit("TOGGLE_PREVIEW_WAY", "manual");
    this.refreshKey = e => {
      if (e.repeat) return;
      // 监听 alt + 1 快捷键，手动切换时用
      if (e.altKey && e.keyCode === 49) {
        this.manualLoading = true;
        this.$emit("refreshPreview");
        setTimeout(() => {
          this.manualLoading = false;
        }, 520);
      }
    };
    this.togglePreviewWay(); //初始化previeWway
  },
  beforeDestroy() {
    store.commit("REPALCE_PREVIEW_DATA", []); //清空预览数据
    store.commit("TOGGLE_PREVIEW_WAY", null); //清空previewWay
    this.removeRefreshKey(); //移除快捷键监听
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.preview-view {
  position: fixed;
  top: 100px;
  width: 300px;
  right: 310px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
  z-index: 4;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  .tab {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    background-color: $color-line;
    user-select: none;
    .title {
      flex: 1;
      height: 100%;
      line-height: 30px;
      font-size: 12px;
      color: $color-text;
      cursor: move;
    }
    .handle {
      height: 100%;
      line-height: 30px;
      & > span {
        cursor: pointer;
        color: $color-text;
        &:hover {
          color: #000;
        }
      }
      i,
      span {
        font-size: 12px;
      }
    }
  }
  & > .content {
    // width: 100%;
    // height: 70vh;
    // overflow-y: scroll;
  }
}
</style>