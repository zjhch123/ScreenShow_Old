<template>
  <div class="g-adv-container" :class="fadeOut ? 'fadeOut' : 'fadeIn'">
    <div class="u-mask"></div>
    <swiper :options="swiperOption" ref="advSwiper" class="m-swiper" v-dbclick="fJumpToIndex">
    <!-- slides -->
      <swiper-slide 
        class="swiper-slider" 
        v-for="(img, index) in advs"
        :key="index">
          <img :src="require(`../assets/${img}`)"/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import router from '../router';
export default {
  data() {
    return {
      fadeOut: false,
      advs: ['adv1.jpg', 'adv2.jpg', 'adv3.jpg', 'adv4.jpg'],
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.advSwiper.swiper
    }
  },
  mounted() {
    
  },
  components: {
    swiper, swiperSlide
  },
  methods: {
    fJumpToIndex() {
      this.fadeOut = true
      setTimeout(() => {
        router.push('index');
      }, 700)
    }  
  }
}
</script>
<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
  }
}
.g-adv-container {
  &.fadeIn {
    .u-close-btn, .m-swiper {
      animation: fadeIn .6s;
    }
  }
  &.fadeOut {
    .u-close-btn, .m-swiper {
      opacity: 0;
      transform: scale(0.98);
      transition: .6s;
    }
  }
  .u-close-btn {
    position: absolute;
    z-index: 99;
    right: 30px;
    top: 30px;
    transform: scale(1.5);
  }
  .u-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0,0,0,.6);
  }
  .u-jump {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
  }
  .m-swiper {
    position: relative;
    z-index: 2;
    animation-fill-mode: both;
  }
  .swiper-slider {
    width: 1080px;
    height: 1920px;
  }
  .swiper-pagination {
    transform-origin: center;
    transform: scale(2.5);
    bottom: 30px;
  }
}
</style>


