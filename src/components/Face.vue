<template>
  <div class="c-face" :class="{back: back}">
    <div class="u-mask"></div>
    <div class="c-face-container">
      <div class="u-bg">
        <img class="J-image" src="" />
      </div>
      <div class="m-content">
        <div class='m-circle m-circle1'>
          <div class="u-border"></div>
          <div class="u-circle"></div>
        </div>
        <div class='m-circle m-circle2'>
          <div class="u-border"></div>
          <div class="u-circle"></div>
        </div>
        <div class='m-circle m-circle3'>
          <div class="u-border"></div>
          <div class="u-circle"></div>
        </div>
        <div class="u-inner" :class='{showText: showText, hideText: hideText}'>
          <p :style="{fontSize:fontSize}" v-html="greeting"></p>
        </div>
      </div>
      <div class="m-btn-group">
        <a class="u-btn u-back f-shadow" @click="fBack">返回</a>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router';
import {wsIp} from '../config';

export default {
  name: 'Face',
  data () {
    return {
      back: false,
      greeting: '',
      showText: false,
      hideText: false,
      socket: null,
      name: null,
      bgSrc: '',
      fontSize: '60px'
    }
  },
  methods: {
    setMsg: function(msg, fontSize) {
      if (this.greeting == msg) {
        return
      }
      this.showText = false;
      this.hideText = true;
      fontSize = fontSize || '60px';
      setTimeout(() => {
        this.greeting = msg;
        this.hideText = false;
        this.fontSize = fontSize;
        this.showText = true;
      }, 600);
    },
    fBack: function() {
      this.back = true;
      setTimeout(() => {
        router.push('/index');
      }, 1000);
    },
    showName: function() {
      let that = this
      return new Promise((res, rej) => {
        this.setMsg(that.name.trim().split(' ').join('<br/>'));
        setTimeout(() => {
          res('OK');
        }, 600);
      })
    }
  },
  created: function() {
    this.socket = new WebSocket(wsIp);
    this.setMsg('欢迎光临');
  },
  mounted: function() {
    let that = this;
    let image = document.querySelector('.J-image')
    this.socket.onopen= function(){
        that.socket.send('get_names');
        that.socket.send('get_frame_650_650');
    }
    this.socket.onmessage = async function(data) {
      if (data.data.length < 255) {
        console.log(data.data)
        if (data.data == '') {
          that.name = null;
          that.setMsg('欢迎光临');
          setTimeout(() => {
            that.socket.send('get_names');
          }, 600);
          return;
        }
        if (that.name == data.data) {
          that.socket.send('get_names');
          return;
        }
        that.name = data.data;
        await that.showName();
        that.socket.send('get_names');
      } else {
        image.src = data.data;
        that.socket.send('get_frame_650_650');
      }
    }
  },
  destroyed: function() {
    this.socket.close()
  }
}
</script>
<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(.9)
  }
  to {
    opacity: 1;
  }
}
@keyframes transformIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
  }
}
.back {
  .c-face-container {
    transition: all .8s;
    opacity: 0;
    transform: scale(.9);
  }
}
.c-face {
  position: relative;
  width: 100%;
  height: 100%;
}
.u-mask{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  z-index: 1;
}
.c-face-container {
  animation: fadeIn .8s;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  .u-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1080px;
    z-index: 8;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .m-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 235px;
    width: 600px;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
    z-index: 9;
    .u-inner {
      animation: transformIn .8s .8s;
      animation-fill-mode: both;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -253px;
      margin-left: -253px;
      background-image: url('../assets/p5-inner.png');
      width: 506px;
      height: 507px;
      background-size: 100% auto;
      display: inline-block;
      font-size: 48px;
      color: white;
      font-weight: bold;
      z-index: 999;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        width: 1px;
        vertical-align: middle;
      }
      p {
        transition: all .6s;
        display: inline-block;
        vertical-align: middle;
      }
      &.showText {
        p {
          opacity: 1;
          transform: translateY(0);
        }
      }
      &.hideText {
        p {
          opacity: 0;
          transform: translateY(-20px);
        }
      }
    }
  }
  .m-btn-group {
    font-size: 0;
    position: absolute;
    z-index: 3;
    top: 1200px;
    left: 0;
    right: 0;
    text-align: center;
    .u-btn {
      display: inline-block;
      width: 298px;
      line-height: 129px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% auto;
      font-size: 48px;
      color: white;
      transition: transform .8s;
      &+.u-btn {
        margin-left: 90px;
      }
      &:active {
        transform: scale(.9);
      }
    }
    .u-back {
      background-image: url('../assets/p3-back-btn.png');
    }
    .u-save {
      background-image: url('../assets/p3-save-btn.png');
    }
  }
}
@keyframes moveover {
  0%   {transform:translate(-50%, -50%) rotate(0deg);}
  100% {transform:translate(-50%, -50%) rotate(360deg);}
}
.m-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .u-border {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  .u-circle {
    margin: auto;
    background-repeat: no-repeat;
    background-size: auto 100%;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    animation: moveover 3s linear infinite reverse;
  }
}
.m-circle1 {
  width: 640px;
  height: 641px;
  .u-border {
    background-image: url('../assets/p5-border1.png');
  }
  .u-circle {
    width: 668px;
    height: 668px;
    background-image: url('../assets/p5-circle1.png');
  }
}
.m-circle2 {
  width: 805px;
  height: 806px;
  .u-border {
    background-image: url('../assets/p5-border2.png');
  }
  .u-circle {
    width: 840px;
    height: 840px;
    background-image: url('../assets/p5-circle2.png');
  }
}
.m-circle3 {
  width: 982px;
  height: 982px;
  .u-border {
    background-image: url('../assets/p5-border3.png');
  }
  .u-circle {
    width: 996px;
    height: 996px;
    background-image: url('../assets/p5-circle3.png');
  }
}
</style>










