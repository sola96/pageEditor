<template>
  <div class="crop-poster">
    <div class="tip">
      海报推荐比例为16:9，当前海报图片比例为
      <span>{{(posterSize.aspectRatio*9).toFixed(2)}}</span>
      <span>:9</span>，请裁剪后再进行编辑
    </div>
    <div class="content" ref="content" v-loading="cropLoading">
      <div :style="dragAreaSizeStyle" v-if="inited">
        <div class="poster" :style="dragAreaSizeStyle">
          <img :src="posterData.src" alt :style="dragAreaSizeStyle" />
        </div>
        <div class="drag-area" :style="dragAreaSizeStyle">
          <vue-draggable-resizable
            :w="dragItemInitInfo.width"
            :h="dragItemInitInfo.height"
            :min-width="dragItemInitInfo.width/2"
            :min-height="dragItemInitInfo.height/2"
            :parent="true"
            :resizable="true"
            :lockAspectRatio="true"
            :handles="['tl','tr','bl','br']"
            class="drag-item"
            @dragging="onDrag"
            @resizing="onResize"
          ></vue-draggable-resizable>
        </div>
      </div>
    </div>
    <div class="preview-container" v-if="inited">
      <div class="tip">预览</div>
      <div
        class="preview-img"
        :style="{width:previewSize.width+'px',height:previewSize.height+'px'}"
      >
        <img :src="posterData.src" alt :style="previewImgStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import vueDraggableResizable from "vue-draggable-resizable";
import { createDom } from "../../../utils";
import { ASPECT_RATIO } from "../dataConfig";

const DRAG_ITEM_WIDTH = 90;
const DRAG_ITEM_HEIGHT = parseFloat(DRAG_ITEM_WIDTH * ASPECT_RATIO);
export default {
  components: { vueDraggableResizable },
  data() {
    return {
      cropLoading: false,
      inited: false,
      dragAreaSize: {
        width: 0,
        height: 0
      },
      previewSize: {
        width: DRAG_ITEM_WIDTH * 2.5, // 90 * 2.5
        height: DRAG_ITEM_HEIGHT * 2.5 // 160 * 2.5
      },
      //拖块的初始值
      dragItemInitInfo: {
        width: DRAG_ITEM_WIDTH,
        height: DRAG_ITEM_HEIGHT
      },
      //拖块当前属性
      dragItemInfo: {
        width: DRAG_ITEM_WIDTH,
        height: DRAG_ITEM_HEIGHT,
        x: 0,
        y: 0
      }
    };
  },
  props: {
    posterData: {
      type: Object,
      default() {
        return {};
      }
    },
    posterSize: {
      type: Object,
      default() {
        return {};
      }
    },
    posterAspectRatio: {
      type: Number
    }
  },
  computed: {
    dragAreaSizeStyle() {
      return {
        width: `${this.dragAreaSize.width}px`,
        height: `${this.dragAreaSize.height}px`
      };
    },
    previewImgStyle() {
      return this.getPreviewImgStyle(this.previewSize);
    }
  },
  methods: {
    init() {
      const contentRef = this.$refs.content;
      let contentWidth = contentRef.clientWidth;
      let contentHeight = contentRef.clientHeight;
      let contentRatio = contentHeight / contentWidth;
      let { aspectRatio, width, height } = this.posterSize;
      let newWidth, newHeight;
      if (aspectRatio >= contentRatio) {
        newHeight = contentHeight;
        newWidth = newHeight / aspectRatio;
      } else {
        newWidth = contentWidth;
        newHeight = newWidth * aspectRatio;
      }
      this.dragAreaSize = {
        width: newWidth,
        height: newHeight
      };
      this.$parent.$on("confirm", this.confirm);
      this.inited = true;
    },
    confirm() {
      this.cropLoading = true;
      this.$nextTick(() => {
        let finalPosterSize = {
          width: 338,
          height: parseFloat(338 * ASPECT_RATIO)
        };
        let imgStyle = this.getPreviewImgStyle(finalPosterSize);
        let nodeObj = {
          tag: "div",
          style: {
            width: finalPosterSize.width + "px",
            height: finalPosterSize.height + "px",
            position: "relative",
            overflow: "hidden"
            //   left: "-9999px"
          },
          children: [
            {
              tag: "img",
              attrs: {
                src: this.posterData.src
              },
              style: {
                ...imgStyle,
                position: "absolute",
                display: "block"
              }
            }
          ]
        };
        let posterDom = createDom(nodeObj);
        document.body.appendChild(posterDom);
        html2canvas(posterDom, {
          ...finalPosterSize
        })
          .then(canvas => {
            let url = canvas.toDataURL();
            this.$emit("newPoster", url);
          })
          .finally(() => {
            document.body.removeChild(posterDom);
          });
      });
    },
    onResize(x, y, width, height) {
      this.dragItemInfo = { width, height, x, y };
    },
    onDrag(x, y) {
      this.dragItemInfo.x = x;
      this.dragItemInfo.y = y;
    },
    getPreviewImgStyle(previewSize) {
      let { width: dragAreaWidth, height: dragAreaHeight } = this.dragAreaSize;
      let { width, height, x, y } = this.dragItemInfo;
      let imgWidth = previewSize.width / (width / dragAreaWidth);
      let imgHeight = previewSize.height / (height / dragAreaHeight);
      let result = {
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        left: `${-(x * imgWidth) / dragAreaWidth}px`,
        top: `${-(y * imgHeight) / dragAreaHeight}px`
      };
      return result;
    }
  },
  beforeDestroy() {
    this.$parent.$off("confirm", this.confirm);
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.crop-poster {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  .tip {
    width: 100%;
    font-size: 13px;
    color: $color-text;
    box-sizing: border-box;
    height: 30px;
    padding: 0 10px;
    text-align: center;
    user-select: none;
    position: absolute;
    top: 0;
    line-height: 30px;
    background-color: #fff;
    span {
      color: $color-theme;
    }
  }
  .content {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 10px;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      position: relative;
      .poster,
      .drag-area {
        position: absolute;
      }
      .drag-area {
        overflow: hidden;
        .drag-item {
          box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1000px;
          cursor: move;
        }
      }
    }
  }
  .preview-container {
    width: 280px; /**280是右侧handleRegion组件的宽度 */
    height: 500px; /**500是右侧handleRegion组件中layer的高度 */
    position: absolute;
    top: 0;
    right: -280px;
    .preview-img {
      margin: 40px auto 0;
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
      img {
        display: block;
        position: absolute;
      }
    }
  }
}
</style>