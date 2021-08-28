// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
//
/// / import style
// import 'swiper/swiper-bundle.min.css'
/// / import 'swiper/css/swiper.css'
//
// Vue.use(VueAwesomeSwiper)

import Vue from 'vue'
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay,
  Scrollbar,
} from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.css'
SwiperClass.use([Pagination, Mousewheel, Autoplay, Scrollbar])
Vue.use(getAwesomeSwiper(SwiperClass))
