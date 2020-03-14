<template>
  <!-- iphonex手机模型 -->
  <div class="phone iphone-x">
    <div class="frame">
      <div class="status-bar"></div>
      <div class="navigation-bar"></div>
      <div class="content"></div>
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
export default {};
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
}
.frame {
  background: #222;
  border-radius: 54px;
  box-shadow: inset 0 0 0 2px #606467, inset 0 0 0 6px #e2e3e4;
  height: 590px;
  padding: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content {
    background-color: #fff;
    background-size: cover;
    border-radius: 36px;
    height: 572px;
    position: relative;
    width: 100%;
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
  }
}

.sensors {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .dot-1 {
    background: #444;
    border-radius: 2px;
    height: 4px;
    width: 40px;
  }
  .dot-2 {
    background: #444;
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