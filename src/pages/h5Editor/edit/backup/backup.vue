<template>
  <!-- 备份 -->
  <div class="backup">
    <div class="tip">
      系统会自动为你保存当前编辑器中的数据
      <br />你也可以通过快捷键"ctrl + s"来保存数据
      <br />数据保存在本地，清除浏览器缓存将会使数据失效
    </div>
    <div class="save-interval">
      <div class="label">保存间隔</div>
      <el-select class="input" size="mini" v-model="saveInterval" @change="setSaveInterval">
        <el-option
          v-for="item in saveIntervalCollection"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="detail" v-if="backupDetail">
      <div class="backup-content" title="点击可恢复数据">
        <div class="name">已备份</div>
        <div class="time">上次备份时间:{{backupDetail.timestamp | getTime}}</div>
      </div>
    </div>
    <div v-else class="no-backup">当前页面无备份数据</div>
  </div>
</template>

<script>
import store from "../../store";
import { getTime } from "../../utils";
export default {
  data() {
    return {
      /**@property {Number} saveTimer  执行保存任务的定时器*/
      STATE: store.state,
      saveInterval: 1000 * 60 * 5,
      saveIntervalCollection: [
        {
          label: "5分钟",
          value: 1000 * 60 * 5
        },
        {
          label: "10分钟",
          value: 1000 * 60 * 10
        },
        {
          label: "20分钟",
          value: 1000 * 60 * 20
        },
        {
          label: "30分钟",
          value: 1000 * 60 * 30
        }
      ]
    };
  },
  computed: {
    backupDetail() {
      let pageConfigId = this.STATE.idMap.pageConfigId;
      let backupPages = this.STATE.backupPages;
      return backupPages[pageConfigId];
    }
  },
  filters: {
    getTime
  },
  methods: {
    //保存时间间隔
    setSaveInterval(value) {
      let oldSaveInterval = this.saveInterval;
      this.saveInterval = value;
      //如果时间间隔发生改变要重新设置定时器
      if (oldSaveInterval !== value) {
        this.saveTimer && clearInterval(this.saveTimer);
        this.saveTimer = setInterval(() => this.saveTsak(), this.saveInterval);
      }
    },
    saveTsak() {
      this.$emit("backup");
    }
  },
  created() {
    this.saveTimer = setInterval(() => this.saveTsak(), this.saveInterval);
  },
  mounted() {
    document.addEventListener("keydown", e => {
      //ctrl + s
      if (e.keyCode === 83 && e.ctrlKey) {
        e.preventDefault();
        this.saveTsak();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.backup {
  font-size: 13px;
  color: $color-text;
  .tip {
    color: $color-text-l;
  }
  .save-interval {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      margin-right: 60px;
    }
    .input {
      flex: 1;
    }
  }
  .detail {
    margin-top: 4px;
    user-select: none;
    .backup-content {
      cursor: pointer;
      padding: 4px 0;
      color: $color-text;
      &:hover {
        background-color: $color-bg-1;
        color: $color-theme;
      }
      .name {
        margin-top: 6px;
        font-weight: bold;
      }
      .timestamp {
        color: $color-text-l;
      }
    }
  }
  .no-backup {
    margin-top: 10px;
    color: #aaa;
  }
}
</style>