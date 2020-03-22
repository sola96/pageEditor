<template>
  <!-- 按钮 -->
  <div class="control-view_button">
    <ul class="setting-list">
      <li class="setting-item" v-for="(item,index) in in_data.btns" :key="index">
        <div class="title">
          <span>{{`按钮${index+1}`}}</span>
          <div class="line"></div>
        </div>
        <div class="setting">
          <div class="label">按钮名称</div>
          <el-input
            size="mini"
            class="input"
            type="text"
            label="按钮文本"
            v-model="item.text"
            placeholder="请输入"
          ></el-input>
        </div>
        <div class="setting">
          <div class="label">字体颜色</div>
          <el-color-picker
            class="input"
            size="small"
            v-model="item.style.color"
          ></el-color-picker>
          <div class="label">字体大小</div>
          <el-select
            class="input"
            size="mini"
            v-model="item.style.fontSize"
          >
            <el-option
              v-for="item in fontSize"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="setting">
          <div class="label">背景颜色</div>
          <el-color-picker
            class="input"
            size="small"
            v-model="item.style.backgroundColor"
          ></el-color-picker>
          <div class="label">对齐方式</div>
          <el-select
            class="input"
            size="mini"
            v-model="item.style.textAlign"
          >
            <el-option
              v-for="item in textAlign"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="setting">
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
      text: [],
      textAlign: [
        {
          label: "左对齐",
          value: "left"
        },
        {
          label: "居中",
          value: "center"
        },
        {
          label: "右对齐",
          value: "right"
        }
      ],
      fontSize: [
        {
          label: "12px",
          value: "12px"
        },
        {
          label: "14px",
          value: "14px"
        },
        {
          label: "16px",
          value: "16px"
        },
        {
          label: "18px",
          value: "18px"
        }
      ]
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
.control-view_button {
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
    .setting {
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
<style>
.control-view_button .el-select .el-input__inner {
  padding: 0 4px !important;
}
</style>