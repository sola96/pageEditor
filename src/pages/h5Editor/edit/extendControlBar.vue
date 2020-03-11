<template>
  <!-- 控制条 -->
  <div class="extend-control-bar">
    <ul>
      <li class="setting">
        <el-tooltip effect="dark" content="设置项" placement="bottom">
          <i class="el-icon-setting"></i>
        </el-tooltip>
      </li>
      <li class="save">
        <i class="el-icon-upload"></i>
        <span>保存</span>
      </li>
      <li class="backup" v-popover:componentBackup>
        <i class="el-icon-document"></i>
        <span>备份</span>
        <el-popover ref="componentBackup" placement="bottom" width="300" trigger="click">
          <component-backup v-on="$listeners"></component-backup>
        </el-popover>
      </li>
      <li v-popover:componentsRecycle>
        <i class="el-icon-delete"></i>
        <span>组件回收站</span>
        <el-popover ref="componentsRecycle" placement="bottom" width="300" trigger="click">
          <components-recycle></components-recycle>
        </el-popover>
      </li>
      <li
        v-for="item in items"
        :key="item.value"
        :class="{active:extendView[item.value]}"
        @click="setView(item.value)"
      >
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import componentsRecycle from "./componentsRecycle/componentsRecycle";
import componentBackup from "./backup/backup";
export default {
  components: { componentsRecycle, componentBackup },
  data() {
    return {
      items: [
        {
          name: "预览视图",
          icon: "el-icon-mobile-phone",
          value: "previewView"
        },
        {
          name: "排序视图",
          icon: "el-icon-sort",
          value: "componentSortView"
        }
      ]
    };
  },
  props: ["extendView"],
  methods: {
    setView(value) {
      this.$emit(
        "update:extendView",
        Object.assign({}, this.extendView, { [value]: !this.extendView[value] })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.extend-control-bar {
  user-select: none;
  ul {
    height: 30px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 10px;
    box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.1);
    li:not(:first-child) {
      margin-left: 20px;
    }
    li {
      font-size: 14px;
      color: $color-text;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: #000;
      }
      &:active {
        transform: scale(0.95);
      }
      &.active {
        color: $color-theme;
      }
      i {
        padding-right: 2px;
      }
      .el-icon-setting {
        font-size: 16px;
      }
    }
    li.save {
      i {
        font-size: 17px;
      }
    }
  }
}
</style>