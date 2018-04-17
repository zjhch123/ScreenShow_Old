<template>
  <div class="m-content">
    <iframe width="1080" height="608" src="https://my.matterport.com/show/?m=JGPnGQ6hosj&play=1&qs=1" frameborder="0" allowfullscreen></iframe>
    <div class="back-index">
      <div class="m-btn-group">
        <a class="u-btn u-back f-shadow" @click="fBack">返回</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import router from '../router';
  export default{
    name:'Show',
    methods:{
      fBack:function () {
        router.push('./index')
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-content{
    width:100%;
    height: 100%;
    margin-top:40%;
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
  .back-index{
    /*margin-top:40px;*/
  }
</style>
