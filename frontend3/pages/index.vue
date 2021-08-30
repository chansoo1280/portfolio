<template>
  <main class="l_main">
    <Title as="h1" class="ir">Main</Title>
    <ul class="m_work">
      <li class="m_work__list t_col-3 t_row-2">
        <NuxtLink to="/About">
          <Title as="h2">WELCOME TO<br />MY PORTFOLIO!</Title>
          <span>저를 소개합니다!</span>
        </NuxtLink>
        <img src="~/assets/images/index/bg_1.jpg" alt="" />
      </li>
      <li class="m_work__list">
        <NuxtLink to="/About">
          <Title as="h2">APP DEV</Title>
        </NuxtLink>
      </li>
      <li class="m_work__list">
        <NuxtLink to="/About">
          <Title as="h2">WEB DEV</Title>
        </NuxtLink>
      </li>
      <li class="m_work__list t_col-2">
        <NuxtLink to="/About">
          <Title as="h2">My Works</Title>
        </NuxtLink>
        <img src="~/assets/images/index/bg_2.jpg" alt="" />
      </li>
      <li class="m_work__list t_col-2">
        <NuxtLink to="/About">
          <Title as="h2">Blog</Title>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    getImgVir(ref: any) {
      if (!ref) return false
      const { offsetWidth, offsetHeight } = ref
      console.log(offsetWidth, offsetHeight)
      return offsetWidth > offsetHeight
    },
  },
})
</script>
<style lang="scss" scoped>
.m_work {
  padding: 0 100px;
  display: grid;
  align-content: center;
  height: 100%;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, minmax(auto, 28%));
  &__list {
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
    /* border: 1px solid; */
    border-radius: 10px;
    box-shadow: 2px 2px 4px 1px rgb(231, 231, 231);
    & > img {
      transition: opacity 0.3s, transform 2s ease-in-out;
      transform-origin: center;
      filter: grayscale(0.8);
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: translate(0, -2px);
      box-shadow: 2px 4px 4px 2px rgb(105, 105, 105);
      color: #fff;
      & > img {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
    &.t_col-2 {
      grid-column: auto / span 2;
    }
    &.t_col-3 {
      grid-column: auto / span 3;
      & > a > h2 {
        font-size: 80px;
      }
    }
    &.t_row-2 {
      grid-row: auto / span 2;
    }
    & > a {
      z-index: 9;
      position: absolute;
      top: 0;
      left: 0;
      padding: 20px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      font-weight: 700;
      & > h2 {
        font-size: 34px;
      }
    }
  }
}
</style>
