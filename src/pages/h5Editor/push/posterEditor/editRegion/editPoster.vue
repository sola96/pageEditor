<template>
  <div class="crop-poster">
    <div class="content" ref="content">
      <div :style="dragAreaSizeStyle" v-if="inited">
        <div class="poster" :style="dragAreaSizeStyle">
          <img :src="posterData.src" alt :style="dragAreaSizeStyle" />
        </div>
        <div class="drag-area" :style="dragAreaSizeStyle">
          <vue-draggable-resizable
            :w="dragItemInitInfo.width"
            :h="dragItemInitInfo.height"
            :min-width="60"
            :min-height="60"
            :parent="true"
            :resizable="true"
            :handles="['tl','tr','bl','br']"
            :grid="gridArr"
            :lockAspectRatio="true"
            class="drag-item"
            @dragging="onDrag"
            @resizing="onResize"
          >
            <img
              src="./defaultCode.png"
              class="qr-code"
              :style="{width:dragItemInfo.width + 'px',height:dragItemInfo.height + 'px'}"
            />
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
    <div class="layer-container" v-if="inited"></div>
  </div>
</template>

<script>
import vueDraggableResizable from "vue-draggable-resizable";
import { createDom, domToImg } from "../../../utils";
import { ASPECT_RATIO } from "../dataConfig";

const DRAG_ITEM_WIDTH = 100;
const DRAG_ITEM_HEIGHT = 100;
const THRESHOLD_GRID = 1; // 自动对齐的阈值 px
export default {
  components: { vueDraggableResizable },
  data() {
    return {
      inited: false,
      dragAreaSize: {
        width: 0,
        height: 0
      },
      //自动吸附
      gridArr: [1, 1],
      expectGrid: { leftRange: [], topRange: [], grid: [] },
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
    }
  },
  computed: {
    dragAreaSizeStyle() {
      return {
        width: `${this.dragAreaSize.width}px`,
        height: `${this.dragAreaSize.height}px`
      };
    }
  },
  methods: {
    init() {
      const contentRef = this.$refs.content;
      let contentWidth = contentRef.clientWidth;
      let contentHeight = contentRef.clientHeight;
      this.dragAreaSize = {
        width: parseInt(contentHeight / ASPECT_RATIO),
        height: contentHeight
      };
      this.expectGrid = this.getExpectGrid(DRAG_ITEM_WIDTH, DRAG_ITEM_HEIGHT);
      this.gridArr = [1, 1];
      this.$parent.$on("confirm", this.confirm);
      this.inited = true;
    },
    getExpectGrid(dragItemWidth, dragItemHeight) {
      let left = parseInt((this.dragAreaSize.width - dragItemWidth) / 2);
      let top = parseInt((this.dragAreaSize.height - dragItemHeight) / 2);
      return {
        leftRange: [left - THRESHOLD_GRID, left + THRESHOLD_GRID],
        topRange: [top - THRESHOLD_GRID, top + THRESHOLD_GRID],
        grid: [left, top]
      };
    },
    confirm() {
      let finalPosterSize = this.dragAreaSize;
      let scale = 2;
      const getDragItemStyle = ({ width: w, height: h, x, y }) => {
        return {
          width: w * scale + "px",
          height: h * scale + "px",
          left: x * scale + "px",
          top: y * scale + "px",
          position: "absolute",
          display: "block"
        };
      };
      let nodeObj = {
        tag: "div",
        style: {
          width: finalPosterSize.width * scale + "px",
          height: finalPosterSize.height * scale + "px",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          {
            tag: "img",
            attrs: {
              src: this.posterData.src
            },
            style: {
              ...getDragItemStyle({ ...finalPosterSize, x: 0, y: 0 })
            }
          },
          {
            tag: "img",
            attrs: {
              src: require("./defaultCode.png")
            },
            style: {
              ...getDragItemStyle(this.dragItemInfo)
            }
          }
        ]
      };
      let posterDom = createDom(nodeObj);
      domToImg(posterDom, { ...finalPosterSize, scale }).then(res => {
        document.body.appendChild(res);
      });
    },
    onResize(x, y, width, height) {
      this.gridArr = [1, 1];
      this.expectGrid = this.getExpectGrid(width, height);
      this.dragItemInfo = { width, height, x, y };
    },
    onDrag(x, y) {
      this.dragItemInfo.x = x;
      this.dragItemInfo.y = y;
      // let grid = [1, 1];
      // let { leftRange, topRange, grid: _grid } = this.expectGrid;
      // if (x >= leftRange[0] && x <= leftRange[1]) {
      //   grid[0] = _grid[0];
      // }
      // if (y >= topRange[0] && y <= topRange[1]) {
      //   grid[1] = _grid[1];
      // }
      // if (grid[0] !== this.gridArr[0] || grid[1] !== this.gridArr[1]) {
      //   this.gridArr = grid;
      // }
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.$parent.$off("confirm", this.confirm);
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
  .content {
    width: 100%;
    position: absolute;
    top: 10px;
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
          cursor: move;
          border-color: transparent;
          &.active {
            border-color: #000;
          }
          .qr-code {
            display: block;
          }
        }
      }
    }
  }
  .layer-container {
    width: 280px; /**280是右侧handleRegion组件的宽度 */
    height: 500px; /**500是右侧handleRegion组件中layer的高度 */
    position: absolute;
    top: 0;
    right: -280px;
  }
}
</style>