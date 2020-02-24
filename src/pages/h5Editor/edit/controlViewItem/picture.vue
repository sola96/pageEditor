<template>
  <!-- 图片 -->
  <div class="editor-view_picture"></div>
</template>

<script>
export default {
  props: {
    itemData: {
      default() {
        return {};
      },
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
</style>