<template>
  <!-- iphonex手机模型 -->
  <div class="phone iphone-x">
    <div class="frame">
      <div class="content">
        <div class="status-bar">
          <div class="time">{{time}}</div>
        </div>
        <div class="navigation-bar">页面名称</div>
        <div class="scroll">
          <div class="scroll-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="header-container">
      <div class="header">
        <div class="sensors">
          <div class="dot-1"></div>
          <div class="dot-2"></div>
        </div>
      </div>
    </div>
    <!-- <div class="btns"></div>
    <div class="power"></div>-->
  </div>
</template>

<script>
import { getTime } from "../../utils";
export default {
  data() {
    return {
      time: ""
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.time = getTime(Date.now());
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.phone *,
.phone *::before,
.phone *::after {
  box-sizing: border-box;
  display: block;
  width: 100%;
}
.phone {
  position: relative;
  height: 590px;
  width: 290px;
  margin: 0 auto;
  transform-origin: center;
  transform: scale(0.9);
}
.frame {
  background: #222;
  border-radius: 50px;
  box-shadow: inset 0 0 0 2px #606467, inset 0 0 0 6px #e2e3e4;
  height: 590px;
  padding: 18px;
  width: 100%;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
    height: 100%;
    position: relative;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    .status-bar {
      width: 222px;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time {
        font-weight: bold;
        font-size: 12px;
      }
    }
    .navigation-bar {
      width: 100%;
      height: 26px;
      line-height: 26px;
      text-align: center;
      padding: 0 20%;
      font-size: 12px;
      font-weight: bold;
    }
    .scroll {
      flex: 1;
      height: 1px;
      width: 100%;
      overflow-y: scroll;
      //   margin-right: -10px;
    }
  }
}

.header-container {
  width: 100%;
  height: 18px;
  position: absolute;
  top: 18px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 18px;
  .header {
    background: #222;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    height: 18px;
    width: 142px;
    margin-top: -1px;
  }
}

.sensors {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .dot-1,
  .dot-2 {
    margin-top: -4px;
  }
  .dot-1 {
    background: #444;
    border-radius: 2px;
    height: 4px;
    width: 40px;
  }
  .dot-2 {
    background: #2c5487;
    border-radius: 50%;
    height: 6px;
    width: 6px;
    margin-left: 6px;
  }
}
.btns {
  background: #606467;
  height: 26px;
  left: -2px;
  position: absolute;
  top: 92px;
  width: 3px;
  &::after,
  &::before {
    background: #606467;
    content: "";
    height: 50px;
    left: 0;
    position: absolute;
    width: 3px;
  }
  &::after {
    top: 48px;
  }
  &::before {
    top: 112px;
  }
}
.power {
  background: #606467;
  height: 80px;
  position: absolute;
  right: -2px;
  top: 160px;
  width: 3px;
}
</style>