<template>
  <div class="m_contact-me">
    <dl>
      <dt>EMAIL</dt>
      <dd>chansoo1280@naver.com</dd>
    </dl>
    <dl>
      <dt>ADRESS</dt>
      <dd>대한민국, 서울</dd>
    </dl>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.m_contact-me {
  padding: 100px 0 300px;
  display: flex;
  & > dl {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > dt {
      margin-bottom: 20px;
    }
    & > dd {
      font-size: 30px;
    }
  }
}
</style>
