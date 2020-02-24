<template>
  <!-- 右键菜单 -->
  <div class="right-click-menu" :style="menuStyle">
    <ul>
      <li v-for="(item,index) in menuList" :key="index" @click.stop="command(item)">
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
        {
          label: "编辑",
          command: "edit",
          value: ""
        },
        {
          label: "置于顶层",
          command: "move",
          value: "top"
        },
        {
          label: "上移一层",
          command: "move",
          value: "-1"
        },
        {
          label: "下移一层",
          command: "move",
          value: "+1"
        },
        {
          label: "置于底层",
          command: "move",
          value: "bottom"
        },
        {
          label: "删除",
          command: "delete",
          value: ""
        }
      ],
      height: 0
    };
  },
  computed: {
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
  props: ["x", "y"],
  methods: {
    command(item) {
      this.$emit("command", item);
    }
  },
  mounted() {
    this.height = this.menuList.length * 26;
    this.maxTop = document.body.clientHeight - this.height;
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