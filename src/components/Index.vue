<template>
  <div class="c-index" :class="{leave: isLeave}">
    <div class="u-mask"></div>
    <div class="g-title">
      <p class="u-title">人工智能·终端机</p>
      <p class="u-subtitle">Artificial intelligence</p>
    </div>
    <div class="g-in" :class="{init: init}">
      <div class="m-function m-photo">
        <a data-to="/photo" class="u-link" v-on:click.capture="fJumpTo">
          <div class="u-content">
              <label class="icon"></label>
              <p class="u-text f-shadow">现场拍照</p>
          </div>
        </a>
      </div>
      <div class="m-function m-face">
        <a data-to="/face" class="u-link" v-on:click.capture="fJumpTo">
          <div class="u-content">
            <label class="icon"></label>
            <p class="u-text f-shadow">人脸识别</p>
          </div>
        </a>
      </div>
      <div class="m-function m-cloud">
        <a data-to="/cloud" class="u-link" v-on:click.capture="fJumpTo">
          <div class="u-content">
            <label class="icon"></label>
            <p class="u-text f-shadow">云摄影</p>
          </div>
        </a>
      </div>
      <div class="m-function m-profession">
        <a data-to="/adv" class="u-link" v-on:click.capture="fJumpTo">
          <div class="u-content u-profession-content" >
            <label class="icon"></label>
            <p class="u-text f-shadow u-profession">广告宣传</p>
          </div>
        </a>
      </div>
    </div>
    <!--<div class="g-footer">-->
      <!--<p>2017博鳌国际干细胞&抗衰老高峰论坛</p>-->
    <!--</div>-->
  </div>
</template>
<script>
import router from '../router';
export default {
  name: 'Index',
  data () {
    return {
      isLeave: false,
      init: true
    }
  },
  methods: {
    fJumpTo: function(e) {
      this.isLeave = true;
      setTimeout(() => {
        router.push(e.target.getAttribute('data-to'));
      }, 1000);
    }
  },
  created: function() {
    setTimeout(() => {
      this.init = false;
    }, 801);
  }
}
</script>
<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInReverse {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
  }
}
@keyframes switch {
  from {
    transform: translateX(1080px);
  }
  to {
    transform: translateX(-1080px);
  }
}
@keyframes floatBall {
  0% {
    transform: translate3d(-1%,0,-10px);
  }
  20% {
   transform: translate3d(-2%,-3%, -10px) scale(.95);
  }
  40% {
   transform: translate3d(0%,-2%, -10px);
  }
  60% {
   transform: translate3d(1%,-3%, -10px) scale(1.05);
  }
  80% {
   transform: translate3d(2%, 0%, -10px);
  }
  100% {
   transform: translate3d(3%,2%, -10px) scale(.98);
  }
}
.leave {
  .g-title {
    opacity: 0;
  }
  .g-in {
    animation: fadeIn .8s reverse;
    animation-fill-mode: forwards;
  }
  .g-footer {
    opacity: 0;
    transform: translateY(40px);
  }
}
.c-index {
  position: relative;
  width: 100%;
  height: 100%;
}
.u-mask {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  z-index: 1;
}
.g-title {
  position: relative;
  z-index: 2;
  display: block;
  text-align: center;
  color: white;
  transform: translate3d(0, 70px, 0) scale(.7);
  transition: opacity .8s;
  .u-title {
    font-size: 94px;
  }
  .u-subtitle {
    font-size: 44px;
    line-height: 60px;
  }
}
.g-footer {
  position: absolute;
  z-index: 99;
  display: block;
  text-align: center;
  color: white;
  font-size: 45px;
  bottom: 40px;
  left: 0;
  right: 0;
  animation: switch 10s .8s linear both infinite;
  transition: all .8s linear;
}
.g-in {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  &.init {
    animation: fadeIn .8s;
  }
  .m-function {
    display: block;
    position: absolute;
    background-size: 100% auto;
    background-repeat: no-repeat;
    text-align: center;
    transition: transform 1s;
    white-space: nowrap;
    .u-link {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      color: white;
      &:before {
        width: 1px;
        height: 100%;
        content: '';
        display: inline-block;
        vertical-align: middle;
      }
    }
    .u-content {
      display: inline-block;
      vertical-align: middle;
      pointer-events: none;
      .icon {
        display: block;
        background-size: 100% auto;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
      }
    }
    &:active, &:hover {
      transform: scale(.9);
    }
  }
  .m-photo {
    background-image: url('../assets/p1-ball1.png');
    width: 405px;
    height: 404px;
    font-size: 49px;
    right: 120px;
    top: 295px;
    animation: floatBall 7s linear alternate infinite;
    .icon {
      background-image: url('../assets/p1-photo.png');
      width: 144px;
      height: 114px;
      margin-bottom: 8px;
    }
  }
  .m-face {
    background-image: url('../assets/p1-ball2.png');
    width: 557px;
    height: 556px;
    font-size: 54px;
    left: 100px;
    top: 650px;
    animation: floatBall 10s linear alternate infinite;
    .icon {
      background-image: url('../assets/p1-face.png');
      width: 185px;
      height: 185px;
      margin-bottom: 24px;
    }
  }
  .m-cloud {
    background-image: url('../assets/p1-ball3.png');
    width: 403px;
    height: 405px;
    font-size: 49px;
    right: 127px;
    bottom: 300px;
    animation: floatBall 9s linear alternate infinite;
    .icon {
      background-image: url('../assets/p1-cloud.png');
      width: 112px;
      height: 112px;
      margin-bottom: 22px;
    }
  }
  .m-profession{
    background-image: url("../assets/p1-ball4.png");
    width:450px;
    height:450px;
    font-size:49px;
    left:50px;
    bottom:100px;
    animation: floatBall 8s linear alternate infinite;
    .icon {
      background-image: url('../assets/p1-profession.png');
      width: 200px;
      height: 160px;
    }
    .u-profession-content{
      margin-bottom: 55px;
    }

  }
}
</style>










