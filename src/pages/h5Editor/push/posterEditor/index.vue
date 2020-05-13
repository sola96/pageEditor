<template>
  <div class="poster-editor">
    <div class="editor-content">
      <edit-region :posterData.sync="posterData" @selectImg="selectImgHandler" />
      <handle-region
        :posterData="posterData"
        @selectImg="selectImgHandler"
        @cancel="cancel"
        @confirm="confirm"
      />
    </div>
    <input type="file" @change="selectImg" style="display:none" ref="input" />
  </div>
</template>

<script>
import editRegion from "./editRegion";
import handleRegion from "./handleRegion";
export default {
  components: {
    editRegion,
    handleRegion
  },
  data() {
    return {
      posterData: null,
      originPosterData: null
    };
  },
  props: {},
  computed: {},
  methods: {
    selectImgHandler() {
      this.$refs.input.click();
    },
    selectImg({ currentTarget: inputNode }) {
      let file = inputNode.files;
      let imgData = file;
      let reader = new FileReader();
      reader.onload = () => {
        this.posterData = Object.assign({}, this.imgData, {
          src: reader.result
        });
      };
      if (imgData && (imgData = imgData[0])) {
        if (!/image/.test(imgData.type)) {
          alert("请选择图片文件");
        } else {
          this.posterData = null;
          this.originPosterData = imgData;
          reader.readAsDataURL(imgData);
        }
      }
      inputNode.value = "";
    },
    cancel() {},
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.poster-editor {
  .editor-content {
    width: 900px;
    height: 600px;
    background-color: #fff;
    margin: 40px auto 0;
    box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.2);
    display: flex;
    & > .edit-region {
      height: 100%;
      width: 1px;
      flex: 1;
    }
    & > .handle-region {
      width: 280px;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid rgb(230, 230, 230);
    }
  }
}
</style>