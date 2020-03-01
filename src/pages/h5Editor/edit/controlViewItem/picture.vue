<template>
  <!-- 图片 -->
  <div>
    <div class="editor-view_picture">
      <div class="content">
        <el-button size="small" @click="in_data.fileInput.click()">选择图片</el-button>
      </div>
    </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_picture {
  width: 100%;
  overflow: hidden;
  .content {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>