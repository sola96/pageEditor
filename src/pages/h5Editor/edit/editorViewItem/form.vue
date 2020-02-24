<template>
  <!-- 表单 -->
  <div class="editor-view_form"></div>
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