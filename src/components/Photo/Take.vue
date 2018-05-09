<template>
  <div class="c-photo" :class="{back: back}">
    <div class="u-flash" :class="{take: take}"></div>
    <div class="m-ready" :class="{show: ready}">
      <!-- <p class="five u-number">5</p> -->
      <!--<p class="four u-number">4</p>-->
      <!--<p class="three u-number">3</p>-->
      <!--<p class="two u-number">2</p>-->
      <!--<p class="one u-number">1</p>-->
    </div>
    <div class="g-in">
      <div class="u-title">
        <label class="icon"></label><span class="title f-shadow">现场拍照</span>
      </div>
      <div class="m-photo">
        <label class="u-border"></label>
        <div class="u-inner">
          <img class="J-image"/>
          <canvas width="720" height="720" class="u-face-obj" ref="canvas"/>
        </div>
      </div>
      <div class="m-btn-group" :class="{hidden: ready}">
        <a class="u-back u-btn f-shadow" @click="fBack">返回</a>
        <a class="u-save u-btn f-shadow" @click="fSave">拍照</a>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router';
import {wsIp, faceObjHeight} from '../../config';

export default {
  name: 'TakePhoto',
  data () {
    return {
      init: true,
      back: false,
      take: false,
      pic: false,
      ready: false,
      socket: null,
      socket_frame: null,
      faceObj: {
        faceObj0: {
          top: new Image(),
          middle: new Image(),
          bottom: new Image()
        },
        faceObj1: {
          top: new Image(),
          middle: new Image(),
          bottom: new Image()
        },
        faceObj2: {
          top: new Image(),
          middle: new Image()
        }
      }
    }
  },
  methods: {
    fBack: function() {
      this.back = true;
      setTimeout(() => {
        router.push('/index');
      }, 1000);
    },
    fSave: function() {
      this.ready = true;
      setTimeout(() => {
        this.take = true;
        this.pic = true;
        setTimeout(() => {
          router.push('/photo/save');
        }, 500);
        // 倒计时是5s，实际上不是5s，是8.5s
      }, 1000);
    },
    upload() {
      const canvas = this.$refs.canvas
      const image = document.querySelector('.J-image')
      const result = document.createElement('canvas')
      result.width = 720
      result.height = 720
      const ctx = result.getContext('2d')
      ctx.drawImage(image, 0, 0)
      ctx.drawImage(canvas, 0, 0)
      const img = result.toDataURL('image/jpeg')
      localStorage.setItem('img',img)
    },
    clearNumber(number) {
      let temp = number % 100
      let hundred = ~~number / 100
      if (temp < 25) {
        number = hundred * 100
      } else if (temp < 50) {
        number = hundred * 100 + 25
      } else if (temp < 75) {
        number = hundred * 100 + 50
      } else {
        number = (hundred + 1) * 100
      }
      return number
    },
    loadFaceImage() {
      /* 时间紧迫，就先这么写了，如果以后有时间的话优化一下 */
      this.faceObj.faceObj0.top.src = require('../../assets/face_obj_0_top.png')
      this.faceObj.faceObj0.middle.src = require('../../assets/face_obj_0_middle.png')
      this.faceObj.faceObj0.bottom.src = require('../../assets/face_obj_0_bottom.png')
      this.faceObj.faceObj1.top.src = require('../../assets/face_obj_1_top.png')
      this.faceObj.faceObj1.middle.src = require('../../assets/face_obj_1_middle.png')
      this.faceObj.faceObj1.bottom.src = require('../../assets/face_obj_1_bottom.png')
      this.faceObj.faceObj2.top.src = require('../../assets/face_obj_2_top.png')
      this.faceObj.faceObj2.middle.src = require('../../assets/face_obj_2_middle.png')
    },
    drawFaceObject0(result) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      if (result.face_num == 0) {
        ctx.clearRect(0,0,720,720)
        return
      }
      const faceWidth = result.right - result.left
      const faceHeight = result.bottom - result.top
      const scale = 1.1
      ctx.clearRect(0,0,720,720)
      ctx.drawImage(obj, faceLeft, faceTop * 0.8, faceWidth * scale, faceWidth * faceObjHeight / obj.width * scale)
    },
    drawFaceObject1(result) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      if (result.face_num == 0) {
        ctx.clearRect(0,0,720,720)
        return
      }
      const faceWidth = result.right - result.left
      const faceHeight = result.bottom - result.top
      const scale = 1.1
      ctx.clearRect(0,0,720,720)
      ctx.drawImage(obj, faceLeft, faceTop * 0.8, faceWidth * scale, faceWidth * faceObjHeight / obj.width * scale)
    },
    drawFaceObject2(result) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      if (result.face_num == 0) {
        ctx.clearRect(0,0,720,720)
        return
      }
      const faceWidth = result.right - result.left
      const faceHeight = result.bottom - result.top
      const scale = faceWidth / this.faceObj.faceObj2.top.width
      ctx.clearRect(0,0,720,720)
      ctx.drawImage(this.faceObj.faceObj2.top, result.nose[0] - this.faceObj.faceObj2.middle.width * scale / 2, result.nose[1] - this.faceObj.faceObj2.middle.height * scale / 2, this.faceObj.faceObj2.middle.width * scale, this.faceObj.faceObj2.middle.height * scale)
      ctx.drawImage(this.faceObj.faceObj2.middle, result.nose[0] - this.faceObj.faceObj2.middle.width * scale / 2, result.nose[1] - this.faceObj.faceObj2.middle.height * scale / 2, this.faceObj.faceObj2.middle.width * scale, this.faceObj.faceObj2.middle.height * scale)
    }
  },
  created: function() {
      this.socket = new WebSocket(wsIp)
      this.socket_frame = new WebSocket(wsIp)
      this.loadFaceImage()
  },
  mounted: function() {
      let that = this
      let image = document.querySelector('.J-image')
      // const face_obj_num = parseInt(Math.random() * 10) % 3
      const face_obj_num = 2
      image.onload = function() {
        if (that.pic) {
          that.upload()
        }
      }
      this.socket.onopen = function() {
          that.socket.send('get_frame_and_detect_async');
      }
      this.socket.onmessage = function(data) {
        image.src = data.data;
        that.socket_frame.send('get_facialLandmark')
      }
      this.socket_frame.onmessage = function(data) {
        // { "face_num":1, "bottom":586,"top":236,"left":150,"right":509,"l_eye":[242,372] ,"r_eye":[389,370] , "nose":[312,457] ,"l_lip":[275,520],"r_lip":[373,517] }
        const result = JSON.parse(data.data)
        that[`drawFaceObject${face_obj_num}`](result)
        that.socket.send('get_frame_and_detect_async');
      }
  },
  destroyed: function() {
    this.socket.close()
    this.socket_frame.close()
  }
}
</script>
<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
  }
}
@keyframes nextTo {
  from {
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes flash {
  0% {
    width: 1080px;
    height: 1920px;
    opacity: 0;
  }
  50% {
    width: 1080px;
    height: 1920px;
    opacity: 1;
  }
  100% {
    width: 1080px;
    height: 1920px;
    opacity: 0;
  }
}
@keyframes numberShow {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.3);
  }
  100% {
    opacity: 0;
  }
}
.c-photo {
  position: relative;
  width: 100%;
  height: 100%;
  &.back {
    transition: all .8s;
    opacity: 0;
  }
}
.u-flash {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0;
  transform: translate(-50%, -50%);
  width: 0px;
  height: 0px;
  background-color: white;
  z-index: 999;
  &.take {
    animation: flash .4s ease-in;
  }
}
.m-ready {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(-50%);
  z-index: 1000;
  color: white;
  text-align: center;
  pointer-events: none;
  .u-number {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 400px;
    font-weight: bolder;
    display: none;
  }
  &.show {
    /*.five {
      animation: numberShow 1.5s 1s;
      animation-fill-mode: both;
      display: block;
    }*/
    .four {
      animation: numberShow 1.5s 1s;
      animation-fill-mode: both;
      display: block;
    }
    .three {
      animation: numberShow 1.5s 2.5s;
      animation-fill-mode: both;
      display: block;
    }
    .two {
      animation: numberShow 1.5s 4s;
      animation-fill-mode: both;
      display: block;
    }
    .one {
      animation: numberShow 1.5s 5.5s;
      animation-fill-mode: both;
      display: block;
    }
  }
}
.g-in {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  &.add {
    animation: fadeIn .8s;
  }
  .u-title {
    margin-top: 60px;
    font-size: 56px;
    color: white;
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 110px;
      height: 92px;
      background-image: url('../../assets/p3-photo.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      margin-right: 20px;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .m-photo {
    position: relative;
    width: 1080px;
    height: 1080px;
    margin: 60px 0 90px;
    .u-inner, .u-border {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
    }
    .u-border {
      width: 953px;
      height: 953px;
      z-index: 3;
      background-image: url('../../assets/p3-photo-border.png');
    }
    .u-inner {
      width: 100%;
      height: 100%;
      background-color: black;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
      .u-face-obj {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1080px;
        height: 1080px;
      }
    }
  }
  .m-btn-group {
    &.hidden {
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
    }
    transition: all .8s;
    font-size: 0;
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
      background-image: url('../../assets/p3-back-btn.png');
    }
    .u-save {
      background-image: url('../../assets/p3-save-btn.png');
    }
  }
}
</style>


