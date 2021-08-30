<template>
  <footer class="l_footer">
    <div class="l_footer__con">
      <Span>chansoo1280@naver.com</Span>
      <Span>All Content © Copyright ChanSoo Kim 2021</Span>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.l_footer {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #8a8a8a;
  &__con {
    max-width: 1440px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #fff;
  }
}
</style>
