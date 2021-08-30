<template>
  <transition name="page">
    <div :key="$route.path" class="l_wrap">
      <Header />
      <Nuxt />
      <Footer />
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.l_wrap {
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .l_main {
    position: relative;
    padding: 30px;
    max-width: 1440px;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
  }
}
</style>
