<template>
  <div class="page-push">
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable
        :w="100"
        :h="100"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
        :resizable="true"
        :lockAspectRatio="true"
        :handles="['tl','tr','bl','br']"
      >
        <img class="qrcode" src="./code.png" alt :style="qrCodeStyle" />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
//https://github.com/mauricius/vue-draggable-resizable
import vueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
export default {
  components: {
    vueDraggableResizable
  },
  data() {
    return {
      width: 100,
      height: 100,
      x: 0,
      y: 0
    };
  },
  computed: {
    qrCodeStyle() {
      return {
        width: `${this.width-2}px`,
        height: `${this.height-2}px`
      };
    }
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/variable.scss";
.qrcode {
  display: block;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  /* border: 1px solid transparent; */
}
</style>