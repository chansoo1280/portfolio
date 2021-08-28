<template>
  <div ref="swiper" v-swiper:mySwiper="swiperOption" class="swiper-wrap">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
      <div class="swiper-slide">
        <div>12</div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'WorkSlide',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        mousewheel: {
          sensitivity: 8,
          releaseOnEdges: true,
        },
        slidesPerView: 3,
        spaceBetween: 80,
        freeMode: true,
        on: {
          reachBeginning: this.setUnDisabled,
          reachEnd: this.setUnDisabled,
          progress: this.handleProgressSwiper,
        },
      },
    }
  },
  mounted() {},
  methods: {
    handleProgressSwiper(swiper, progress) {
      if (!swiper.wrapperEl.style.transform.includes('rotateX')) {
        swiper.wrapperEl.style.transform =
          swiper.wrapperEl.style.transform + 'rotateX(5deg)'
      }
      if (progress > 0 && progress < 1) {
        this.setDisabled(true)
      }
    },
    setUnDisabled() {
      this.$refs.swiper.swiper.mousewheel.disable()
      setTimeout(() => {
        this.setDisabled(false)
        this.$refs.swiper.swiper.mousewheel.enable()
      }, 600)
    },
    ...mapActions({
      setDisabled: 'nav/setDisabled',
    }),
  },
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  perspective: 500px;
  perspective-origin: center;
  z-index: 9;
  padding: 200px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.swiper-slide {
  background: rgb(201, 201, 201);
}
.swiper-wrapper {
  backface-visibility: hidden !important;
  transition: 0.6s ease-out !important;
}
.swiper-pagination-progressbar {
  --swiper-theme-color: hsl(212, 100%, 94%);
  position: fixed;
  top: auto;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 30%;
}
</style>
