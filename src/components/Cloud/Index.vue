<template>
  <div class="c-photo-index">
    <div class="u-mask"></div>
      <div class="c-photo-container">
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
  </div>
</template>
<script>
import router from '../../router';
export default {
  name: 'Cloud',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth < fromDepth) {
        this.transitionName = 'slide-right'
      } else if (toDepth === fromDepth) {
        this.transitionName = 'fade'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  },
}
</script>
<style scoped>
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.c-photo-index {
  width: 100%;
  height: 100%;
}
.c-photo-container {
  animation: fade .5s;
  height: 100%;
  width: 100%;
}
.u-mask {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  z-index: 0;
}
.slide-left-enter-active {
  animation: slide-left-in .5s;
}
.slide-left-leave-active {
  animation: slide-left-out .5s;
}
.slide-right-enter-active {
  animation: slide-right-in .5s;
}
.slide-right-leave-active {
  animation: slide-right-out .5s;
}
.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes slide-right-in {
  0% {
    opacity: 0;
    transform: translateX(-70%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slide-right-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(70%);
  }
}
@keyframes slide-left-in {
  0% {
    opacity: 0;
    transform: translateX(70%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slide-left-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-70%);
  }
}
@keyframes fade-in {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>









