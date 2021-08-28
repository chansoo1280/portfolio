<template>
  <main class="l_main">
    <h1>Contact</h1>
    <ul class="contents">
      <li>
        <h2>address</h2>
        <div>대한민국 서울</div>
      </li>
      <li>
        <h2>email</h2>
        <div>chansoo1280@naver.com</div>
      </li>
      <li>
        <h2>resume</h2>
        <div>hi!</div>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Contact',
  components: {},
  data() {
    return {}
  },
  head: {
    title: "Chansoo's Portfolio - Contact",
  },
  mounted() {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.contents {
  display: flex;
  height: 100%;
  & > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    & > h2 {
      padding: 30px 0;
      font-size: 30px;
    }
    & > div {
      flex: 1;
    }
  }
}
</style>
