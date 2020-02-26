<template>
  <!-- 组件控制器 -->
  <div class="control-view">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.control-view {
  position: fixed;
  width: 300px;
  top: 50px;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
</style>