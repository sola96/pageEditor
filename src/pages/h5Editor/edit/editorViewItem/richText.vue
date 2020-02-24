<template>
  <!-- 富文本 -->
  <div class="editor-view_richText"></div>
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