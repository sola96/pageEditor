<template>
  <!-- 右键菜单 -->
  <div class="right-click-menu" :style="menuStyle">
    <ul>
      <li
        v-for="(item,index) in menuList_addition"
        :key="index"
        @click.stop="command(item)"
        :style="item.style"
      >
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        // {
        //   label: "编辑",
        //   command: "edit",
        //   value: "",
        //   custom: false,
        //   style:{
        //     "border-top":"1px solid #EBEEF5"
        //   }
        // },
        {
          label: "置于顶层",
          command: "move",
          value: "top",
          custom: false,
          style: {
            "border-top": "1px solid #EBEEF5"
          }
        },
        {
          label: "上移一层",
          command: "move",
          value: "-1",
          custom: false
        },
        {
          label: "下移一层",
          command: "move",
          value: "+1",
          custom: false
        },
        {
          label: "置于底层",
          command: "move",
          value: "bottom",
          custom: false
        },
        {
          label: "删除",
          command: "delete",
          value: "",
          custom: false,
          style: {
            color: "#F56C6C"
          }
        }
      ],
      height: 0
    };
  },
  computed: {
    //加上附加菜单之后的菜单
    menuList_addition() {
      let result = [];
      if (this.additionMenu && this.additionMenu.length > 0) {
        result = [...this.additionMenu, ...this.menuList];
      } else {
        result = this.menuList;
      }
      return result;
    },
    //菜单位置
    menuStyle() {
      let top = this.y;
      if (top > this.maxTop) {
        top = top - this.height;
      }
      return {
        height: this.height + "px",
        left: this.x + "px",
        top: top + "px"
      };
    }
  },
  props: {
    //left的值
    x: {
      type: Number
    },
    //top的值
    y: {
      type: Number
    },
    additionMenu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    command(item) {
      this.$emit("command", item);
    }
  },
  watch: {
    menuList_addition: {
      handler(newVal) {
        this.height = newVal.length * 26;
        this.maxTop = document.body.clientHeight - this.height;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.right-click-menu {
  width: 120px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.1);
  user-select: none;
  position: fixed;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 26px;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      color: $color-text;
      text-align: center;
      line-height: 26px;
      cursor: pointer;
      &:hover {
        background-color: $color-line;
      }
    }
  }
}
</style>