<template>
  <div class="c-save" :class="{saved: saved}">
    <div class="u-filter" :class="{show: uploading}">
      <p>{{msg}}</p>
    </div>
    <div class="g-in">
      <div class="m-photo">
        <div class="u-border"></div>
        <div class="m-container">
          <div class="u-inner">
            <canvas width="787" height="1172" class="demo J_demo"/>
          </div>
        </div>
      </div>
      <div class="m-btn-group">
        <a class="u-back u-btn f-shadow" @click="fBack">重拍</a>
        <a class="u-save u-btn f-shadow" @click="savePhoto">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router/';
import {base64, basePath, AjaxUrl} from '../../config';

export default {
  name: 'TakePhoto',
  data () {
    return {
      msg: '上传中,请稍后..',
      saved: false,
      img: null,
      uploading: false
    }
  },
  methods: {
    savePhoto: function() {
      let that = this
      const canvas = document.querySelector('.J_demo');
      canvas.toBlob(function($Blob) {
        let formData = new FormData();
        formData.append("file", $Blob ,"file_"+Date.parse(new Date())+".jpg");
        let body = formData
        that.uploading = true;
        that.msg = '上传中,请稍后..';
        fetch(AjaxUrl.upload, {
          method: 'POST',
          body: body
        }).then(function (response) {
          return response.json();
        }).then((data)=> {
          console.log(data.data);
          localStorage.setItem('imageurl', basePath + data.data.imageurl)
          localStorage.setItem('QRcode', basePath + '/' + data.data.QRcode)
          setTimeout(() => {
            that.saved = true;
            setTimeout(() => {
              router.push('/photo/share');
            }, 200);
          }, 1000);
        }).catch((err) => {
          that.msg = '上传失败,请重试';
          setTimeout(() => {
            that.uploading = false;
          }, 1500);
        });
      });
    },
    fBack: function() {
      router.push('/photo');
    }
  },
  created: function() {
  },
  mounted: function() {
    const canvas = document.querySelector('.J_demo');
    const ctx = canvas.getContext('2d');
    this.img = localStorage.getItem('img');
    const bgImage = new Image();
    const photoImage = new Image();
    bgImage.onload = function() {
      ctx.drawImage(bgImage, 0, 0);
    }
    photoImage.onload = function() {
      ctx.drawImage(photoImage, 118, 284,545, 545);
    }
    bgImage.src = require('../../assets/vertical-bgc.png');
    photoImage.src = localStorage.getItem('img') || '';
  },
  destroyed: function() {
    localStorage.removeItem('img')
  }

}
</script>
<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
  }
}
@keyframes opacityIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.c-save {
  position: relative;
  width: 100%;
  height: 100%;
}

.saved {
  .g-in {
    .m-photo {
      .u-border {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,255,0);
        background-image: linear-gradient(45deg,#21feff,#7e01cd);
      }
      .m-container {
        border: 0px;
      }
    }
  }
}
.u-filter {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,.6);
  pointer-events: auto;
  display: none;
  animation: opacityIn .6s;
  &.show {
    display: block;
  }
  p {
    font-size: 75px;
    color: white;
    font-weight: bolder;
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}
.g-in {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  .m-photo {
    position: relative;
    margin: 90px auto 25px auto;
    width: 980px;
    height: 1560px;
    .u-border {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      z-index: 1;
      background-color: rgba(0,51,255,1);
      width: 970px;
      height: 1450px;
      transition: all .1s;
    }
    .m-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      width: 955px;
      height: 1423px;
      box-sizing: border-box;
      /*去掉边框*/
      /*padding: 24px;*/
      overflow: auto;
      margin: auto;
      background-color: #ffffff;
      transition: all .8s;
      &::-webkit-scrollbar {
        display: none;
      }
      .u-inner {
        width: 100%;
        position: relative;
        .demo {
          display: block;
          width: 100%;
        }
        .photo {
          position: absolute;
          top: 332px;
          height: 829px;
          width: 829px;
          z-index: 99;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .m-btn-group {
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


