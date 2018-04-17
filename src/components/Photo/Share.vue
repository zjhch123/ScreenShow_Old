<template>
  <div class="c-share" :class="{init: init, leave: leave}">
    <div class="g-in">
      <div class="m-title">
        <p class="u-title f-shadow">保存成功!</p>
      </div>
      <div class="m-photo">
        <div class="u-border"></div>
        <div class="m-container">
          <div class="u-inner">
            <img :src="imageurl"/>
          </div>
        </div>
      </div>
      <div class="m-func">
        <div class="u-qr">
          <img :src="QRcode"/>
        </div>
        <div class="m-content">
          <p><label class="icon icon-timeline"></label><span class="u-title">扫一扫</span></p>
          <p>立即分享到微信朋友圈</p>
        </div>
      </div>
      <div class="m-btn-group">
          <a class="u-back u-btn f-shadow" @click="fBack">返回</a>
          <a :class="['u-print u-btn f-shadow',isPrinting?'btn-disabled':'']" @click="fPrint">打印</a>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/';
import {basePath, AjaxUrl, printWSIP} from '../../config';
export default {
  name: 'TakePhoto',
  data () {
    return {
      init: true,
      leave: false,
      imageurl: '',
      QRcode: '',
      socket:null,
      isPrinting:false,
      timer:''
    }
  },
  methods: {
    fBack: function() {
      this.leave = true;
      setTimeout(() => {
        router.push('/index');
      }, 2001);
    },
    fPrint:function () {
      let that = this
      this.socket.send(this.imageurl)
      this.isPrinting = true
      this.timer=setTimeout(function () {
        that.isPrinting = false
      },3*1000)
    }
  },
  created: function() {
    setTimeout(() => {
      this.init = false;
    }, 2001);
    this.imageurl = localStorage.getItem('imageurl')
    this.QRcode = localStorage.getItem('QRcode')
    this.socket=new WebSocket(printWSIP.printWSIP_V)
    this.socket.onopen = function () {
      console.log('open')
    }
    this.socket.onmessage = function (e) {
      let data = e.data
      console.log(data);
    }
  },
  destroyed: function() {
    localStorage.removeItem('imageurl')
    localStorage.removeItem('QRcode')
    this.socket.close()
    clearTimeout(this.timer)
  }
}
</script>
<style scoped lang="scss">
@keyframes scroll {
  0% {
    transform: translateY(0)
  }
  80% {
    transform: translateY(-25%);
  }
  90% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
  }
}
.c-share {
  position: relative;
  width: 100%;
  height: 100%;
}
.init {
  .m-title {
    animation: fadeIn .8s;
    animation-fill-mode: both;
  }
  .m-photo {
    animation: fadeIn .8s .4s;
    animation-fill-mode: both;
  }
  .m-func {
    animation: fadeIn .8s .8s;
    animation-fill-mode: both;
  }
  .m-btn-group {
    animation: fadeIn .4s 1.2s;
    animation-fill-mode: both;
  }
}
.leave {
  .m-title {
    animation: fadeIn .8s 1s reverse;
    animation-fill-mode: forwards;
  }
  .m-photo {
    animation: fadeIn .8s .6s reverse;
    animation-fill-mode: forwards;
  }
  .m-func {
    animation: fadeIn .8s .2s reverse;
    animation-fill-mode: forwards;
  }
  .m-btn-group {
    animation: fadeIn .4s reverse;
    animation-fill-mode: forwards;
  }
}
.g-in {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  .m-title {
    margin: 125px auto 70px auto;
    text-align: center;
    .u-title {
      font-size: 72px;
      color: #54faff;
      font-weight: bolder;
    }
  }
  .m-photo {
    position: relative;
    width: 665px;
    height: 665px;
    margin-left: auto;
    margin-right:auto;
    .u-border {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      z-index: 1;
      background-image: linear-gradient(45deg,#21feff,#7e01cd);
      width: 100%;
      height: 100%;
      transition: all .1s;
    }
    .m-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      width: 640px;
      height: 640px;
      box-sizing: border-box;
      overflow: hidden;
      margin: auto;
      background-color: black;
      transition: all .8s;
      &::-webkit-scrollbar {
        display: none;
      }
      .u-inner {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 5px;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          display: none;
        }
        img {
          display: block;
          width: 100%;
          animation: scroll 3.5s 2s linear;
          animation-fill-mode: both;
        }
      }
    }
  }
  .m-func {
    margin: auto;
    .u-qr {
      width: 230px;
      height: 230px;
      display: inline-block;
      background-color: white;
      padding: 5px;
      margin: 90px auto 50px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .m-content {
      color: white;
      font-size: 44px;
      text-align: center;
      font-weight: bold;
      .icon {
        display: inline-block;
        vertical-align: middle;
      }
      .icon-timeline {
        background-image: url('../../assets/p4-timeline.png');
        width: 58px;
        height: 59px;
      }
      .u-title {
        display: inline-block;
        vertical-align: middle;
        margin-left: 18px;
      }
    }
  }
  .m-btn-group {
    font-size: 0;
    margin-top: 70px;
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
    .btn-disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.6;
    }
    .u-back {
      background-image: url('../../assets/p3-back-btn.png');
    }
    .u-print {
      background-image: url('../../assets/p3-save-btn.png');
    }
  }
}
</style>


