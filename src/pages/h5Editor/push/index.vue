<template>
  <div class="page-editor-push">
    <poster-editor
      @complete="posterEditorComplete"
      @submit="posterEditorSubmit"
      @cancel="posterEditorCancel"
    ></poster-editor>
  </div>
</template>

<script>
import posterEditor from "./posterEditor";
export default {
  data() {
    return {};
  },
  components: { posterEditor },
  methods: {
    posterEditorComplete() {},
    posterEditorSubmit() {},
    posterEditorCancel(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.page-editor-push {
}
</style>