<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper-wrap">
    <div class="swiper-wrapper">
      <div class="swiper-slide">1</div>
      <div class="swiper-slide">2</div>
      <div class="swiper-slide">3</div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  name: 'WorkSlide',
  data() {
    return {
      banners: ['/1.jpg', '/2.jpg', '/3.jpg'],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
        mousewheel: true,
        // some swiper options...
      },
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  height: 100%;
}
</style>
