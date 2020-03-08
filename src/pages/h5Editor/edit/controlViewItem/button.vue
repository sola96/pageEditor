<template>
  <!-- 按钮 -->
  <div class="editor-view_button">
    <ul class="setting-list">
      <li class="setting-item" v-for="(item,index) in in_data.btns" :key="index">
        <div class="title">
          <span>{{`按钮${index+1}`}}</span>
          <div class="line"></div>
        </div>
        <div class="text">
          <div class="label">按钮名称</div>
          <el-input
            size="mini"
            class="input"
            type="text"
            label="按钮文本"
            v-model="item.text"
            placeholder="请输入"
            @blur="in_data.refreshPreview"
          ></el-input>
        </div>
        <div class="color">
          <div class="label">字体颜色</div>
          <el-color-picker class="input" size="small" v-model="item.style.color" @change="in_data.refreshPreview"></el-color-picker>
          <div class="label">背景颜色</div>
          <el-color-picker class="input" size="small" v-model="item.style.backgroundColor" @change="in_data.refreshPreview"></el-color-picker>
        </div>
        <div class="url">
          <div class="label">跳转链接</div>
          <el-input size="mini" class="input" type="text" v-model="item.url"></el-input>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      in_data: {
        btns: []
      },
      text: []
    };
  },
  methods: {
    setData(data) {
      this.in_data = data;
      console.log(this.in_data.btns[0] === this.in_data.btns[1]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_button {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 13px;
  .setting-item {
    width: 100%;
    .title {
      color: $color-theme;
      font-size: 12px;
      padding: 4px 0;
      display: flex;
      align-items: center;
      .line {
        margin-left: 10px;
        flex: 1;
        height: 0;
        border-bottom: 1px solid $color-line;
      }
    }
    .text,
    .color,
    .url {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0 20px 0;
      background-color: #f6f9ff;
      border-radius: 2px;
      & > .label {
        height: 100%;
        padding: 0 10px 0 4px;
        color: $color-text;
      }
      & > .input {
        flex: 1;
      }
    }
  }
}
</style>