<template>
  <header class="m_header">
    <NuxtLink v-if="backHref" :to="backHref">
      <i class="xi-arrow-left"></i>
      <Span class="ir">뒤로가기</Span>
    </NuxtLink>
    <slot />
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    backHref: {
      type: String,
      default: null,
    },
  },
})
</script>
<style lang="scss" scoped>
.m_header {
  overflow: hidden;
  position: relative;
  padding: 40px 30px;
  margin-bottom: 40px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-bg-1 {
    background: url(~assets/images/index/bg_1.jpg) no-repeat center top/cover;
    color: #fff;
    background-attachment: fixed;
  }
  & > a {
    position: absolute;
    top: 40px;
    left: 30px;
    font-size: 48px;
  }
}
</style>
