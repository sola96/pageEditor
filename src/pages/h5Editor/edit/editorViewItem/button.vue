<template>
  <!-- 按钮 -->
  <div class="editor-view_button">anniu</div>
</template>

<script>
import { common } from "./mixin";
import { createHtmlStr } from "../../utils";
import store from "../../store";
export default {
  mixins: [common],
  data() {
    return {
      /** @property {Object} in_itemData mixin中的in_itemData*/
      STATE: store.state
    };
  },
  methods: {
    getSelfHtmlStr() {
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
</style>