<template>
  <div class="handle-region">
    <div class="layer"></div>
    <div class="handle">
      <div class="btns">
        <el-button
          size="small"
          type="primry"
          @click="selectImg"
        >{{posterData&&posterData.src ? '重新选择图片' : '选择图片'}}</el-button>
      </div>
      <div class="btns">
        <el-button size="small" type="plain" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    posterData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    selectImg() {
      this.$emit("selectImg");
    },
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.handle-region {
  display: flex;
  flex-direction: column;
  .layer {
    height: 500px;
  }
  .handle {
    margin-top: 10px;
    float: 1;
    .btns {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
      &:nth-child(1) {
        .el-button {
          width: 260px;
        }
      }
      &:nth-child(2) {
        margin-top: 10px;
        margin-bottom: 10px;
        .el-button {
          width: 130px;
        }
      }
    }
  }
}
</style>