<template>
  <div class="edit-region">
    <div class="no-img" v-if="!posterData">
      <el-button type="plain" size="small" @click="selectImg">选择海报图片</el-button>
    </div>
    <div v-else class="content" v-loading="handleStatus==='imgPreLoad'">
      <div class="img-pre-load" v-if="handleStatus==='imgPreLoad'">
        <img :src="posterData.src" alt @load="posterLoaded" />
      </div>
      <crop-poster
        v-else-if="handleStatus==='cropPoster'"
        v-bind="$props"
        :posterSize="posterSize"
        @newPoster="getNewPoster"
      />
      <edit-poster
        v-else-if="handleStatus==='editPoster'"
        v-bind="$props"
        :posterSize="posterSize"
      />
    </div>
  </div>
</template>

<script>
// 海报编辑部分使用了vue-draggable-resizable插件，
// git地址 : https://github.com/mauricius/vue-draggable-resizable
import cropPoster from "./cropPoster";
import editPoster from "./editPoster";
import { ASPECT_RATIO, ASPECT_RATIO_RANGE } from "../dataConfig";
export default {
  components: { cropPoster, editPoster },
  data() {
    return {
      handleStatus: "imgPreLoad", //'imgPreLoad' | 'cropPoster' | 'editPoster'
      posterSize: {
        width: 0,
        height: 0,
        aspectRatio: 1
      }
    };
  },
  props: {
    posterData: {
      //src: base-64 or url
      type: Object,
      default() {
        return null;
      }
    }
  },
  computed: {
    qrCodeStyle() {
      return {
        width: `${this.width - 2}px`,
        height: `${this.height - 2}px`
      };
    }
  },
  methods: {
    posterLoaded(e) {
      this.imgPreLoad = false;
      let imgNode = e.path[0];
      let { width, height } = imgNode;
      let aspectRatio = parseFloat((height / width).toFixed(4));
      this.posterSize = {
        width,
        height,
        aspectRatio
      };
      if (
        !(
          aspectRatio >= ASPECT_RATIO_RANGE[0] &&
          aspectRatio <= ASPECT_RATIO_RANGE[1]
        )
      ) {
        this.handleStatus = "cropPoster";
      } else {
        this.handleStatus = "editPoster";
      }
    },
    getNewPoster(url) {
      let payload = {
        src: url
      };
      this.$emit("update:posterData", payload);
    },
    selectImg() {
      this.$emit("selectImg");
    }
  },
  mounted() {
    this.$parent.$on("confirm", () => this.$emit("confirm"));
  },
  watch: {
    posterData: {
      handler() {
        this.handleStatus = "imgPreLoad";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.edit-region {
  .no-img {
    width: 100%;
    height: 100%;
    background-color: rgb(250, 250, 250);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: 100%;
    height: 100%;
    /* img{
        width: 100%;
    } */
    .img-pre-load {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      left: -9999px;
    }
    .drag-item {
      border: 1px dashed transparent;
      &.active {
        border-color: $color-theme;
      }
    }
    .qrcode {
      display: block;
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      /* border: 1px solid transparent; */
    }
  }
}
</style>
<style lang="scss">
@import "~@/assets/variable.scss";
.edit-region {
  .vdr {
    touch-action: none;
    border: 1px dashed #000;
  }
  .handle,
  .vdr {
    position: absolute;
  }
  .handle {
    /* border: 1px solid transparent; */
    width: 10px;
    height: 10px;
    background: rgb(78, 78, 78);
    border-radius: 50%;
  }
  .handle-tl {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .handle-tm {
    top: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }
  .handle-tr {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .handle-ml {
    left: -10px;
    cursor: w-resize;
  }
  .handle-ml,
  .handle-mr {
    top: 50%;
    margin-top: -5px;
  }
  .handle-mr {
    right: -10px;
    cursor: e-resize;
  }
  .handle-bl {
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }
  .handle-bm {
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  .handle-br {
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }
  @media only screen and (max-width: 768px) {
    [class*="handle-"]:before {
      content: "";
      left: -10px;
      right: -10px;
      bottom: -10px;
      top: -10px;
      position: absolute;
    }
  }
  $handle-item-pos: 4px;
  .handle-tl {
    left: 0 - $handle-item-pos;
    top: 0 - $handle-item-pos;
  }
  .handle-tr {
    right: 0 - $handle-item-pos;
    top: 0 - $handle-item-pos;
  }
  .handle-bl {
    left: 0 - $handle-item-pos;
    bottom: 0 - $handle-item-pos;
  }
  .handle-br {
    bottom: 0 - $handle-item-pos;
    right: 0 - $handle-item-pos;
  }
}
</style>