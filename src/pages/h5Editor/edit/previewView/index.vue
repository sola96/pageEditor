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
    <div class="content">
      <ul>
        <li v-for="item in previewData_filter" :key="item.id" v-html="item.htmlStr"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import directives from "../../directives";

export default {
  data() {
    return {
      STATE: store.state
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
        this.$emit("refreshPreview");
      } else {
        store.commit("TOGGLE_PREVIEW_WAY", "manual");
      }
      // this.$emit("refreshPreview");
    }
  },
  mounted() {
    this.$emit("refreshPreview");
    store.commit("TOGGLE_PREVIEW_WAY", "manual");
    this.keyCodeMap = {
      49: false,
      18: false
    };
    let self = this;
    document.addEventListener("keydown", e => {
      if (e.keyCode === 49) {
        self.keyCodeMap[49] = true;
      }
      if (e.keyCode === 18) {
        self.keyCodeMap[18] = true;
      }
      console.log(self.keyCodeMap)
      if (
        self.STATE.previewWay &&
        self.STATE.previewWay === "manual" &&
        self.keyCodeMap[18] &&
        self.keyCodeMap[49]
      ) {
        self.$emit("refreshPreview");
      }
    });
    document.addEventListener("keyup", e => {
      if (e.keyCode === 49) {
        self.keyCodeMap[49] = false;
      }
      if (e.keyCode === 18) {
        self.keyCodeMap[18] = false;
      }
    });
  },
  beforeDestroy() {
    store.commit("REPALCE_PREVIEW_DATA", []);
    store.commit("TOGGLE_PREVIEW_WAY", null);
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
  overflow: hidden;
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
  .content {
    width: 100%;
    height: 70vh;
    overflow-y: scroll;
  }
}
</style>