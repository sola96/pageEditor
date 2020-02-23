<template>
  <!-- 侧边栏 <我的推广页> -->
  <div class="owner-template">
    <h3>我的推广页</h3>
    <div class="content">
      <ul class="template-list">
        <li class="create">
          <i class="icon el-icon-circle-plus"></i>
          <span>新建页面</span>
        </li>
        <li class="item" v-for="i in 12" :key="i">{{i}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.owner-template {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  h3 {
    font-size: 14px;
    text-align: center;
    padding: 20px 0;
    font-weight: bold;
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .template-list {
      width: 100%;
      & > li {
        width: 100%;
        height: 90px;
        border-radius: 2px;
        margin-bottom: 20px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          border-color: $color-theme;
        }
      }
      .create {
        color: $color-text-l;
        font-size: 14px;
        border: 1px solid $color-line;
        &:hover {
          color: $color-theme;
        }
        i {
          padding-right: 20px;
        }
      }
      .item {
        // border: 1px solid $color-line;
        color: $color-text-l;
        background-color: $color-line;
      }
    }
  }
}
</style>