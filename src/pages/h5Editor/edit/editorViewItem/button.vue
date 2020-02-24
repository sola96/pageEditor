<template>
  <!-- 按钮 -->
  <div class="editor-view_button"></div>
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