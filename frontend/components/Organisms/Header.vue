<template>
  <header class="l_header">
    <Button class="l_header__title" href="/">Chansoo's Web</Button>
    <nav class="l_header__nav">
      <Button href="/Work">WORK</Button>
      <Button href="/About"> ABOUT </Button>
      <Button href="/Contact"> CONTACT </Button>
    </nav>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.l_header {
  z-index: 99;
  position: sticky;
  top: 0;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  flex: none;
  height: 60px;
  font-size: 30px;
}
.l_header__nav {
  display: flex;
  align-items: center;
  font-size: 20px;
}
</style>
