<template>
  <!-- 图片 -->
  <div class="editor-view_picture">
    <div v-if="!in_itemData.src" class="add-picture">
      <i class="el-icon-circle-plus"></i>
      <span>添加图片</span>
      <input type="file" @change="selectImg" />
    </div>
    <div class="picture" v-else>
      <img :src="in_itemData.src" alt />
    </div>
  </div>
</template>

<script>
const MAX_IMG_SIZE = 2048000; //图片最大限制

export default {
  data() {
    return {
      in_itemData: {},
      originImgData: null
    };
  },
  props: {
    itemData: {
      default() {
        return {};
      },
      type: Object
    }
  },
  methods: {
    //选择图片
    selectImg({ currentTarget: inputNode }) {
      let file = inputNode.files;
      let imgData = file;
      let reader = new FileReader();
      file.length > 0 && Object.assign(this.$data, this.$options.data());
      reader.onload = () => {
        this.in_itemData = Object.assign({}, this.in_itemData, {
          src: reader.result
        });
      };
      if (imgData && (imgData = imgData[0])) {
        if (!/image/.test(imgData.type)) {
          alert("请选择图片文件(*.jpg或*.png格式,2MB以内)");
        } else if (!["jpg", "png"].includes(imgData.name.replace(/.+\./, ""))) {
          alert("请选择正确格式的图片(*.jpg或*.png格式)");
        } else if (imgData.size > MAX_IMG_SIZE) {
          alert("图片体积过大,请控制在2MB以内");
        } else {
          this.originImgData = imgData;
          reader.readAsDataURL(imgData);
        }
      }
    }
  },
  created() {
    this.in_itemData = Object.assign({}, this.itemData);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_picture {
  width: 100%;
  .add-picture {
    margin: 10px;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 120px;
    color: $color-text-l;
    font-size: 14px;
    border: 1px solid $color-line;
    transition: 0.2s;
    position: relative;
    cursor: pointer;
    &:hover {
      color: $color-theme;
      background-color: rgb(250, 250, 250);
    }
    i {
      padding-right: 6px;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  .picture {
    img {
      width: 100%;
    }
  }
}
</style>