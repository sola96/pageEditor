<template>
  <!-- 图片 -->
  <div>
    <div
      class="editor-view_picture"
      v-if="in_data.imgName"
      @click="randomName"
    >{{in_data.imgName}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      in_data: {}
    };
  },
  methods: {
    setData(data) {
      this.in_data = data;
      console.log(this.in_data.imgName)
    },
    randomName() {
      this.in_data.imgName = Math.random();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_picture {
  width: 100%;
  overflow: hidden;
}
</style>