<template>
  <!-- item -->
  <div class="sort-item">
    <div class="item-content" @dblclick="setCustomLabel">
      <input
        v-clickoutside="save"
        type="text"
        ref="input"
        v-model="customLabel"
        v-if="isEditing"
        @keydown.enter="save"
      />
      <div class="label" v-else>{{customLabel || itemData.label}}</div>
    </div>
  </div>
</template>

<script>
import clickoutside from "element-ui/src/utils/clickoutside";

export default {
  data() {
    return {
      customLabel: "",
      isEditing: false
    };
  },
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  directives: {
    clickoutside
  },
  methods: {
    //设置customLabel
    setCustomLabel() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    //保存customLabel
    save() {
      this.isEditing = false;
    }
  },
  created() {
    this.customLabel = this.itemData.label || "";
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.item-content {
  width: 100%;
  height: 100%;
  //   transition: 0.2s;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  input {
    background-color: $color-line;
    width: 100%;
    padding: 4px 0;
  }
  .label {
    height: 100%;
    max-width: 70%;
    @include no-wrap;
  }
}
</style>