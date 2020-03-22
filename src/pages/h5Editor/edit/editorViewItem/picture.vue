<template>
  <!-- 图片 -->
  <div class="editor-view_picture">
    <div class="content" :class="{fold:isFold,active:isActive}">
      <div v-show="!src" class="add-picture">
        <i class="el-icon-circle-plus"></i>
        <span>添加图片</span>
        <input ref="fileInput" type="file" @change="selectImg" />
      </div>
      <div class="picture" v-show="src" :class="{fold:isFold}">
        <img :src="src" alt />
        <div class="fold-info" v-if="isFold">
          <div class="info">{{imgName}}</div>
          <i class="el-icon-arrow-down" @click="spreadPicture"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MAX_IMG_SIZE = 2048000; //图片最大限制 1024 * 1000 * 2
import { common } from "./mixin";
import { createDom, createHtmlStr } from "../../utils";
import store from "../../store";

export default {
  mixins: [common],
  data() {
    return {
      /** @property {Object} in_itemData mixin中的in_itemData*/
      STATE: store.state,
      originImgData: null, //数据原始数据
      isFold: false, //是否处于折叠状态
      src: "",
      imgName: ""
    };
  },
  computed: {
    /** @property {Boolean} isActive 是否处于活跃状态*/
  },
  methods: {
    //选择图片
    selectImg({ currentTarget: inputNode }) {
      let file = inputNode.files;
      let imgData = file;
      let reader = new FileReader();
      // file.length > 0 && Object.assign(this.$data, this.$options.data());
      reader.onload = () => {
        this.src = reader.result;
      };
      if (imgData && (imgData = imgData[0])) {
        if (!/image/.test(imgData.type)) {
          this.$message.info("请选择图片文件(*.jpg或*.png格式,2MB以内)");
        } else if (!["jpg", "png"].includes(imgData.name.replace(/.+\./, ""))) {
          this.$message.info("请选择正确格式的图片(*.jpg或*.png格式)");
        } else if (imgData.size > MAX_IMG_SIZE) {
          this.$message.info("图片体积过大,请控制在2MB以内");
        } else {
          this.originImgData = imgData;
          this.imgName = imgData.name;
          reader.readAsDataURL(imgData);
          this.setControlData();
        }
      }
    },
    //右键菜单事件
    rightClick({ command, value }) {
      if (command === "add") {
        //添加图片
        this.$refs.fileInput.click();
      } else if (command === "fold") {
        //折叠图片
        this.foldPicture();
      } else if (command === "spread") {
        //收起图片
        this.spreadPicture();
      }
    },
    //收起图片
    foldPicture() {
      let menuList = [
        {
          label: "更换图片",
          command: "add",
          value: ""
        },
        {
          label: "展开图片",
          command: "spread",
          value: ""
        }
      ];
      this.isFold = true;
      this.registerMenu(menuList);
    },
    //展开图片
    spreadPicture() {
      let menuList = [
        {
          label: "更换图片",
          command: "add",
          value: ""
        },
        {
          label: "收起图片",
          command: "fold",
          value: ""
        }
      ];
      this.isFold = false;
      this.registerMenu(menuList);
    },
    //设置控制器视图
    setControlData() {
      let _this = this;
      let data = {
        get originImgData() {
          return _this.originImgData;
        },
        get src() {
          return _this.src;
        },
        get imgName() {
          return _this.imgName;
        },
        get fileInput() {
          return _this.$refs.fileInput;
        }
      };
      this.$emit("setControlData", { type: this.itemData.type, data });
    },
    getSelfHtmlStr() {
      if (!this.src) return null;
      let nodeObj = {
        tag: "img",
        attrs: {
          src: this.src
        },
        style: {
          width: "100%"
        }
      };
      return createHtmlStr(nodeObj);
    }
  },

  watch: {
    originImgData: {
      handler(newVal, oldVal) {
        let menuList = null;
        if (newVal && !oldVal) {
          menuList = [
            {
              label: "更换图片",
              command: "add",
              value: ""
            },
            {
              label: this.isFold ? "展开图片" : "收起图片",
              command: this.isFold ? "spread" : "fold",
              value: ""
            }
          ];
          this.registerMenu(menuList);
        }
        if (!newVal) {
          menuList = [
            {
              label: "添加图片",
              command: "add",
              value: ""
            }
          ];
          this.registerMenu(menuList);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.editor-view_picture {
  width: 100%;
  & > .content {
    border: 1px solid transparent;
    box-sizing: border-box;
    &.active {
      border-color: $color-theme;
    }
    &.fold {
      margin: 10px;
    }
  }
  .add-picture {
    margin: 10px;
    background-color: #fff;
    border-radius: 2px;
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
    position: relative;
    overflow: hidden;
    &.fold {
      height: 40px;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
      border-radius: 2px;
    }
    img {
      width: $editor-width;
    }
    .fold-info {
      width: 100%;
      height: 40px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgb(255, 255, 255);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-left: 20px;
      user-select: none;

      .info {
        width: 80%;
        @include no-wrap;
        font-size: 13px;
      }
      i {
        display: inline-block;
        height: 40px;
        flex: 1;
        box-sizing: border-box;
        padding-right: 20px;
        cursor: pointer;
        line-height: 40px;
        text-align: right;
        &:hover {
          color: $color-theme;
        }
      }
    }
  }
}
</style>