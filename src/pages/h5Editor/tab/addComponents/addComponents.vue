<template>
  <div class="add-components">
    <ul>
      <li>
        <menu-item v-on="$listeners" :config="menuConfig[0]"></menu-item>
      </li>
      <li>
        <menu-item v-on="$listeners" :config="menuConfig[1]"></menu-item>
      </li>
      <li>
        <menu-item v-on="$listeners" :config="menuConfig[2]"></menu-item>
      </li>
      <li>
        <menu-item v-on="$listeners" :config="menuConfig[3]" :custom="true">
          <div slot="content">表单11233333</div>
        </menu-item>
      </li>
      <li>
        <menu-item v-on="$listeners" :config="menuConfig[4]"></menu-item>
      </li>
    </ul>
  </div>
</template>

<script>
import menuItem from "./menuItem";
export default {
  components: { menuItem },
  data() {
    return {
      menuConfig: [
        {
          label: "图片",
          type: "picture",
          children: [
            {
              label: "单图",
              config: {
                name: "单图"
              }
            },
            {
              label: "双图",
              config: {
                name: "双图"
              }
            }
          ]
        },
        {
          label: "富文本",
          type: "richText",
          config: {
            name: "富文本"
          }
        },
        {
          label: "视频",
          type: "video",
          config: {
            name: "视频"
          }
        },
        {
          label: "表单",
          type: "form",
          config: {
            name: "表单"
          }
        },
        {
          label: "按钮",
          type: "button",
          children: [
            {
              label: "单个按钮",
              config: {
                name: "单个按钮"
              }
            },
            {
              label: "两个按钮",
              config: { name: "2个按钮" }
            },
            {
              label: "三个按钮",
              config: { name: "3个按钮" }
            },
            {
              label: "四个按钮",
              config: { name: "4个按钮" }
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.add-components {
  width: 100%;
  height: 100%;
  & > ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    & > li {
      cursor: pointer;
    }
    & > li:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>