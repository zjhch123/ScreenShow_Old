<template>
  <div id="app">
    <div class="u-app-bg">
      <img src="./assets/bg.png" class="u-bg"/>
      <img src="./assets/bg-ball1.png" class="u-ball u-ball1"/>
      <img src="./assets/bg-ball2.png" class="u-ball u-ball2"/>
      <img src="./assets/bg-ball3.png" class="u-ball u-ball3"/>
      <img src="./assets/bg-ball4.png" class="u-ball u-ball4"/>
      <img src="./assets/bg-ball5.png" class="u-ball u-ball5"/>
      <img src="./assets/bg-ball6.png" class="u-ball u-ball6"/>
      <img src="./assets/bg-ball7.png" class="u-ball u-ball7"/>
      <img src="./assets/bg-ball8.png" class="u-ball u-ball8"/>
    </div>
    <div class="c-app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import fastclick from 'fastclick';
import router from './router';
export default {
  name: 'app',
  methods: {
    // jumpToAdv() {
    //   return setTimeout(() => {
    //     if (router.history.current.name == 'Index') {
    //       router.push('/adv');
    //     }
    //   }, 180 * 1000);
    // }
  },
  mounted: function() {
    fastclick.attach(document.body);
    // let timeoutToBack = this.jumpToAdv()
    // document.addEventListener('touchstart', () => {
    //   clearTimeout(timeoutToBack);
    //   timeoutToBack = this.jumpToAdv()
    // });
  }
}
</script>
<style scoped lang="scss">
@keyframes floatBall {
  0% {
    transform: translate3d(-10%,0,-10px) scale(.9);
  }
  20% {
   transform: translate3d(-12%,-15%, -10px);
  }
  40% {
   transform: translate3d(0%,-14%, -10px) scale(1.1);
  }
  60% {
   transform: translate3d(16%,-13%, -10px);
  }
  80% {
   transform: translate3d(11%, 0%, -10px) scale(.8);
  }
  100% {
   transform: translate3d(7%,14%, -10px);
  }
}
@keyframes scaleBall {
  0% {
    transform: scale(1.1)
  }
  50% {
   transform: scale(1.3)
  }
  100% {
    transform: scale(1.2)
  }
}
.u-app-bg {
  width: 1080px;
  height: 1920px;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  z-index: 0;
  transform: translateZ(-10px);
  img {
    display: block;
  }
  .u-bg {
    width: 100%;
    height: 100%;
  }
  .u-ball {
    position: absolute;
  }
  .u-ball1 {
    top: 60px;
    left: 390px;
    width: 217px;
    height: 190px;
    animation: floatBall 4s linear alternate infinite;
  }
  .u-ball2 {
    width: 278px;
    height: 278px;
    top: 240px;
    left: 470px;
    animation: floatBall 6s linear alternate infinite;
  }
  .u-ball3 {
    width: 175px;
    height: 286px;
    right: 0;
    top: 510px;
    animation: scaleBall 3s linear alternate infinite;
  }
  .u-ball4 {
    width: 539px;
    height: 539px;
    left: 110px;
    top: 520px;
    animation: floatBall 8s linear alternate infinite;
  }
  .u-ball5 {
    width: 248px;
    height: 248px;
    top: 730px;
    left: 580px;
    animation: floatBall 5s linear alternate infinite;
  }
  .u-ball6 {
    width: 242px;
    height: 371px;
    left: 0;
    top: 1090px;
    animation: scaleBall 7s linear alternate infinite;
  }
  .u-ball7 {
    width: 311px;
    height: 304px;
    top: 1210px;
    left: 424px;
    animation: floatBall 4s linear alternate infinite;
  }
  .u-ball8 {
    width: 193px;
    height: 193px;
    right: 183px;
    bottom: 78px;
    animation: floatBall 3s linear alternate infinite;
  }
}
</style>
<style lang="scss">
html, body {
  width: 1080px;
  height: 1920px;
  margin: auto;
}
#app {
  background-color: black;
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 1080px;
  height: 1920px;
  position: relative;
  overflow: hidden;
  .c-app-container {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
  }
}
body, dl, dd, ul, ol, h1, h2, h3, h4, h5, h6, p, form, input, textarea, button, th, td { margin: 0; padding: 0; }
img, iframe { border: 0 none; }
table { border-collapse: collapse; border-spacing: 0; table-layout: fixed; }
ol, ul { list-style: none outside none; }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: bold; }
em, strong { font-style: normal; font-weight: bold; }
body, textarea, select, input { color: #000; }
a, button { cursor: pointer; text-decoration: none; }
body { position: relative; }
img[src=""] { opacity: 0; filter: alpha(opacity=0); }
* { -webkit-tap-highlight-color: transparent; }
::-ms-clear, ::-ms-reveal { display: none; }
input { outline: none; border: 0; }
html { font-size: 14px; }
::-webkit-input-placeholder { color: #aaa; }
::-moz-placeholder { color: #aaa; }
:-ms-input-placeholder { color: #aaa; }
input:-moz-placeholder { color: #aaa; }
*:not(input) { -webkit-user-select: none; }
.f-shadow {
  text-shadow: 0 0 20px rgba(0,0,0,.6);
}
</style>
