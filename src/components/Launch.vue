<template>
  <div class="c-hello" :class="{launched: isLoaded}" @click="launch">
    <div class="u-mask"></div>
    <div class="g-title f-shadow">
      <p class="u-title">人工智能·终端机</p>
      <p class="u-subtitle">Artificial intelligence</p>
    </div>
    <div class="g-footer">
      <p class="u-footer">杭州木笔科技有限公司</p>
    </div>
  </div>
</template>
<script>
import router from '../router';
export default {
  name: 'launch',
  data () {
    return {
      isLoaded: false
    }
  },
  methods: {
    launch: function() {
      this.isLoaded = true;
      setTimeout(function() {
        router.push('/index');
      }.bind(this), 900);
    }
  },
  created: function() {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.c-hello {
  height: 100%;
  width: 100%;
}
.launched {
  .u-mask {
    display: block;
  }
  .g-title {
    transition: transform .8s;
    transform: translate3d(0, 70px, 0) scale(.7) !important;
  }
  .g-footer {
    transform: translate3d(0, 100px, 0);
  }
}
.u-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  z-index: 1;
  display: none;
  animation: fadeIn .8s;
}
.g-title {
  position: relative;
  z-index: 2;
  display: block;
  text-align: center;  
  color: white;
  transform: translate3d(0, 695px, 0);
  animation: fadeIn .8s;
  .u-title {
    font-size: 94px;
  }
  .u-subtitle {
    font-size: 44px;
    line-height: 60px;
  }
}
.g-footer {
  z-index: 2;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
  transition: transform .8s;
  .u-footer {
    font-size: 33px;
    color: #a099fc;
  }
}
</style>










