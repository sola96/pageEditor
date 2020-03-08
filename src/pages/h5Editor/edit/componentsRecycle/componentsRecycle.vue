<template>
  <!-- 组件回收站 -->
  <div class="components-recycle">
    <div class="tip">删除的组件会暂存在这里，最多保存5个</div>
    <ul>
      <li
        @click="addComponent(item,index)"
        v-for="(item,index) in STATE.deleteItemCollection"
        :key="item.itemData.id"
      >
        <div class="label">{{item.itemData.label}}</div>
        <div class="time">
          <span>删除时间：</span>
          {{item.timestamp | getTime}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      STATE: store.state
    };
  },
  filters: {
    getTime(val) {
      let date = new Date(val);
      let trans = n => `${n < 10 ? "0" : ""}${n}`;
      return `${trans(date.getHours())}:${trans(date.getMinutes())}`;
    }
  },
  methods: {
    addComponent({ itemData, componentState }, index) {
      store.commit("ADD_ITEM", itemData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.components-recycle {
  width: 100%;
  font-size: 13px;
  user-select: none;
  .tip {
    color: $color-text-l;
  }
  li {
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 4px;
    &:hover {
      background-color: $color-bg-2;
      .label{
          color: $color-theme;
      }
    }
    .label {
      font-size: 14px;
      color: $color-text;
      font-weight: 800;
    }
    .time {
      font-size: 12px;
      color: $color-text-l;
      margin-top: 2px;
    }
  }
}
</style>