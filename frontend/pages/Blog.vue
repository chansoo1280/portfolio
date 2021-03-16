<template>
  <main class="l_main">
    <h1>Blog</h1>
    <div class="contents">
      <a target="_blank" href="https://chansoo1280.tistory.com/">
        <h2>Chansoo's Web(blog)</h2>
        <img src="~/assets/images/blog.png" alt="" />
      </a>
      <a href="#a"></a>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Blog',
  components: {},
  data() {
    return {}
  },
  head: {
    title: "Chansoo's Portfolio - Blog",
  },
  mounted() {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.contents {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  & > a {
    grid-column: auto / span 1;
    &:nth-child(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
    transition: all 0.3s;
    box-shadow: 2px 2px 7px #b3b3b3;
    overflow: hidden;
    position: relative;
    & > h2 {
      padding: 20px;
      font-size: 20px;
      text-align: center;
      line-height: 30px;
      color: #000;
    }
    & > img {
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      width: auto;
      height: 100%;
      transition: transform 0.3s;
      transform: translate(-50%, -50%);
      transform-origin: center;
    }
    &:hover > img {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
}
</style>
