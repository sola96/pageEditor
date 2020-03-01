<template>
  <!-- 菜单项目 -->
  <div class="menu-item">
    <template v-if="!custom">
      <el-dropdown
        size="small"
        @command="selectItem"
        v-if="config.children&&config.children.length>0"
        trigger="click"
      >
        <div class="label">
          <span>{{config.label}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in config.children"
            :key="index"
            :command="item.config"
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="label" v-else @click="selectItem(config.config)">{{config.label}}</div>
    </template>
    <template v-else>
      <el-popover placement="bottom" trigger="click">
        <slot name="content"></slot>
        <div class="label" slot="reference">
          <span>{{config.label}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    custom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(itemConfig) {
      this.$emit("selectItem", {
        type: this.config.type,
        config: itemConfig,
        label: this.config.label
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.menu-item {
  .label {
    font-size: 12px;
    color: #fff;
    width: 60px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background-color: $color-theme;
    border-radius: 2px;
    i {
      padding-left: 4px;
    }
    &:hover {
      background-color: $color-theme-d;
    }
  }
}
</style>