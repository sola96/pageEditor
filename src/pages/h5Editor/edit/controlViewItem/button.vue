<template>
  <!-- 按钮 -->
  <div class="editor-view_button">
    <ul>
      <li v-for="(item,index) in in_data.btns" :key="index">
        <el-input type="text" label="按钮文本" v-model="item.text" placeholder="请输入"></el-input>
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
</style>