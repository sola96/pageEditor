<template>
  <!-- 编辑活动 -->
  <div class="page-editor-edit">
    <div class="owner-template">
      <owner-template></owner-template>
    </div>
  </div>
</template>

<script>
import ownerTemplate from "./ownerTemplate";
export default {
  components: { ownerTemplate }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.page-editor-edit {
  width: 100%;
  height: 100%;
  position: relative;
  & > .owner-template {
    width: 200px;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>