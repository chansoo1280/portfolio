<template>
  <div class="m_profile">
    <dl>
      <dt>NAME</dt>
      <dd>김찬수</dd>
    </dl>
    <dl>
      <dt>ROLE</dt>
      <dd>프론트엔드 개발자</dd>
    </dl>
    <dl>
      <dt>HOBBY</dt>
      <dd>앱개발</dd>
    </dl>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.m_profile {
  padding: 40px;
  & > dl {
    display: flex;
    font-size: 26px;
    margin-bottom: 20px;
    gap: 20px;
    & > dt {
      min-width: 100px;
    }
  }
}
</style>
