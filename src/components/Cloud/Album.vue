<template>
  <div class="c-cloud" :class="{back: back}" @click="fCenter">
    <!--<div class="u-mask"></div>-->
    <!--显示全部照片宫格-->
    <div class="m-back"></div>
    <!--单张照片打印预览-->
    <div class="m-front m-right" v-show="isShow">
      <div class="m-content">
        <div class="u-img">
          <img :src="currentImgSrc"/>
        </div>
        <div class="u-title">
          <p>扫一扫</p>
          <p>查看云摄影相片</p>
        </div>
        <div class="u-qr">
          <img :src="singleQRcode" alt="图片二维码">
        </div>
        <div class="m-btn-group">
          <a class="u-back u-btn f-shadow" @click="fBack">返回</a>
          <a :class="['u-print u-btn f-shadow',isPrinting?'btn-disabled':'']" @click="toPrinting">打印</a>
        </div>
      </div>
    </div>
    <!--显示全部照片二维码-->
    <div class="m-front m-right" v-show="isShowAll">
      <div class="m-content">
        <div class="u-img">
          <img :src="QRcode"/>
        </div>
        <div class="u-title">
          <p>扫一扫</p>
          <p>查看全部云摄影相片</p>
        </div>
        <div class="m-btn-group">
          <a class="u-back u-btn f-shadow" @click="fAllBack">返回</a>
        </div>
      </div>
    </div>
    <div class="m-hide" id="horizImg"></div>
    <div class="m-allQR" @click.stop="showQROfAll">
      <img src="../../assets/QR.png" alt="显示所有照片的二维码" width="70px">
    </div>
  </div>
</template>
<script>
  import router from '../../router';
  import VueQRCodeComponent from 'vue-qrcode-component'
  import Vue from 'vue'
  import {basePath, AjaxUrl, printWSIP} from '../../config';

  export default {
    name: 'Album',
    data() {
      return {
        back: false,
        photoInterval: 0,
        photolist: [],
        backPhotolist: [],
        QRcode: '',
        isShow: false,
        currentImgSrc: "",
        socket: null,
        transitionName: '',
        singleQRcode: '',
        uploading: false,
        isPrinting: false,
        baseImageUrl: '',
        timer:null,
        isShowAll:false
      }
    },
    methods: {
      _getRandom: function (range, count) {
        let arr = [], ret = [];
        for (let i = 0; i < range; i++) {
          arr.push(i);
        }
        for (let i = 0; i < count; i++) {
          const num = Math.floor(Math.random() * arr.length);
          ret.push(arr.splice(num, 1)[0]);
        }
        return ret;
      },
      fCenter: function (e) {
        if (e.target.tagName === "IMG") {
          this.currentImgSrc = e.target.src;
          this._savePhoto()
        }
      },
      fBack: function () {
        this.isShow = false
      },
      fAllBack:function () {
        this.isShowAll = false
      },
      _savePhoto: function () {
        let that = this
        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 671;
        canvas.id = 'horizontalImg';
        let imgCanvas = document.getElementById('horizImg');
        imgCanvas.appendChild(canvas)
        const ctx = canvas.getContext('2d');
        const bgImage = new Image();
        const photoImage = new Image();
        bgImage.onload = function () {
          ctx.drawImage(bgImage, 0, 0);
        }
        photoImage.onload = function () {
          ctx.drawImage(photoImage, 12, 122, 643, 426);
        }

        bgImage.src = require('../../assets/horizontal-bgc.png');
        photoImage.src = this.currentImgSrc;

        setTimeout(() => {
          canvas.toBlob(function ($Blob) {
            let formData = new FormData()
            formData.append('file', $Blob, `file_${Date.parse(new Date())}.jpg`)
            that.uploading = true;
            fetch(AjaxUrl.upload, {
              method: 'POST',
              body: formData
            }).then(function (response) {
              return response.json()
            }).then(data => {
              console.log(data.data)
              that.singleQRcode = basePath + '/' + data.data.QRcode
              that.baseImageUrl = basePath + data.data.imageurl
              that.isShow = true;
            })
          })
        }, 1000)

      },
      toPrinting: function () {
        let that = this
        this.socket.send(this.baseImageUrl)
        this.isPrinting = true
        this.timer=setTimeout(function () {
          that.isPrinting = false
        },30*1000)
      },
      getUrlParam: function (_str, _name) {
        let self = this;
        let _reg = new RegExp('(^|&|\\?)' + _name + '=([^&]*)(&|$)'),
          _r = _str.replace(/script|%22|%3E|%3C|'|"|>|<|\\/g, '_').match(_reg);

        if (_r != null) return decodeURIComponent(_r[2]);
        return '';
      },
      showQROfAll:function () {
        this.isShowAll = true
      }

    },
    created: function () {
      this.socket = new WebSocket(printWSIP.printWSIP_H)
    },
    mounted: function () {
      let that = this;
      let photoDom;
      const ROTATE_COUNT = 6;
      let topic_id = that.getUrlParam(window.location.search, 'id').split('/')[0] || 34
      fetch(AjaxUrl.cloud, {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        dataType: 'json',
        body: 'topic_id=' + topic_id
      }).then(function (response) {
        return response.json();
      }).then((json) => {
        that.QRcode = !!json.data.QRCode ? basePath + '/' + json.data.QRCode : '';
        if (json.data.imageUrls.length !== 0) {
          for (let i = 0; i < 15; i++) {
            that.photolist[i] = basePath + json.data.imageUrls[i % json.data.imageUrls.length]
          }
          that.backPhotolist = JSON.parse(JSON.stringify(that.photolist)).reverse()
        }
        if (json.data.imageUrls.length !== 0) {
          photoDom = document.querySelector('.m-back')
          for (let i = 0; i < 15; i++) {
            photoDom.innerHTML +=
              `<div class="u-photo J_photo">
              <div class="u-front">
                <img src='${that.photolist[i]}'/>
              </div>
              <div class="u-back">
                <img src='${that.backPhotolist[i]}'/>
              </div>
            </div> `
          }
          this.photoInterval = setInterval(() => {
            this._getRandom(15, ROTATE_COUNT).map(function (id) {
              return document.querySelectorAll('.J_photo')[id]
            }).forEach(function (ele) {
              ele.classList.add('rotate');
              setTimeout(function () {
                ele.classList.remove('rotate');
              }, 5000);
            })
          }, 5000);
        }
      }).catch((err) => {
        console.log(err)
      })

      that.socket.onopen = function () {
        console.log('open')
      }
      that.socket.onmessage = function (e) {
        let data = e.data
        console.log(data);
      }
    },
    beforeDestroy: function () {
      clearInterval(this.photoInterval);
    },
    destroyed: function () {
      this.socket.close()
    }
  }
</script>

<style lang="scss">
  @keyframes fadeInCloud {
    0% {
      opacity: 0.3;
    }
    40% {
      opacity: 0.6;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  .c-cloud {
    width: 100%;
    height: 100%;
    position: relative;
    &.back {
      .m-front {
        transition: all .4s;
        opacity: 0;
      }
      .m-front {
        pointer-events: none;
      }
      .m-back {
        opacity: 0;
        transition: all .4s .8s;;
      }
    }
    .u-mask {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .6);
      z-index: 0;
    }
    .m-back, .m-front {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .m-back {
      animation: fadeInCloud .4s;
      font-size: 0;
      padding: 80px 30px;
      text-align: justify;
      box-sizing: border-box;
      pointer-events: auto;
      z-index: 1;
      &:after {
        width: 100%;
        height: 1px;
        content: '';
        display: inline-block;
      }
      .u-photo {
        margin-bottom: 35px;
        display: inline-block;
        width: 322px;
        height: 322px;
        backface-visibility: hidden;
        position: relative;
        transform-style: preserve-3d;
        perspective: 1000px;
        .u-front, .u-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .u-front {
          z-index: 2;
          transition: transform .4s .4s linear;
          img {
            position: absolute;
            height: 100%;
            display: block;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .u-back {
          background-color: black;
          transition: transform .4s linear;
          transform: rotate3d(1, 0, 0, -90deg);
          z-index: 1;
          img {
            position: absolute;
            height: 100%;
            display: block;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
        }
      }
      .u-photo {
        &.rotate {
          .u-front {
            transition: transform .4s linear;
            transform: rotate3d(1, 0, 0, -90deg);
          }
          .u-back {
            transition: transform .4s .4s linear;
            transform: rotate3d(1, 0, 0, -180deg);
          }
        }
      }
    }
    .m-front {
      /*pointer-events: auto;*/
      animation: fadeInCloud .4s .6s;
      animation-fill-mode: backwards;
      background-color: rgba(41, 41, 79, .6);
      transform: translateZ(500px);
      z-index: 9;
      &:before {
        width: 1px;
        height: 100%;
        vertical-align: middle;
        content: '';
        display: inline-block;
      }
      .m-content {
        display: inline-block;
        vertical-align: middle;
        pointer-events: none;
      }
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
      .u-img {
        margin-top: 133px;
        background-color: white;
        padding: 8px;
        display: inline-block;
        img {
          display: block;
          /*width: 322px;*/
          height: 500px;
        }
      }
      .u-title {
        font-size: 49px;
        color: #3df6ff;
        font-weight: bold;
      }
    }
    .m-allQR {
      /*pointer-events: none;*/
      background: #0c5f66;
      padding: 10px;
      border-radius: 3px;
      box-shadow: 3px 3px 3px blue;
      z-index: 4;
      position: absolute;
      top: 720px;
      right: 10px;
    }
    .m-btn-group {
      font-size: 0;
      margin-top: 70px;
      .u-btn {
        pointer-events: auto;
        display: inline-block;
        width: 298px;
        line-height: 129px;
        text-align: center;
        background-repeat: no-repeat;
        background-size: 100% auto;
        font-size: 48px;
        color: white;
        transition: transform .8s;
        & + .u-btn {
          margin-left: 90px;
        }
        &:active {
          transform: scale(.9);
        }
      }
      .u-back {
        background-image: url('../../assets/p3-back-btn.png');
      }
      .u-print {
        background-image: url('../../assets/p3-save-btn.png');
      }
      .btn-disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
      }
    }
    .m-hide {
      position: absolute;
      z-index: 999;
      display: none;
    }

  }

</style>
