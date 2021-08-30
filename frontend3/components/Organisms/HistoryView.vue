<template>
  <div class="m_history-view">
    <ol class="m_history-view__con">
      <li class="m_history-view__con__list">
        <span>2019-12</span>
        <div>개발공부 시작</div>
      </li>
      <li class="m_history-view__con__list">
        <span>2020-03</span>
        <div>위드라인 입사</div>
      </li>
      <li class="m_history-view__con__list">
        <span>2020-05</span>
        <div>asd</div>
      </li>
      <li class="m_history-view__con__list">
        <span>2020-10</span>
        <div>asd</div>
      </li>
      <li class="m_history-view__con__list">
        <span>2021-04</span>
        <div>asd</div>
      </li>
      <li class="m_history-view__con__list">
        <span>2021-07</span>
        <div>asd</div>
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.m_history-view {
  margin-bottom: 40px;
  position: relative;
  padding: 0 0 0 144px;
  height: 500px;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    display: block;
    width: 100%;
    height: 2px;
    background: #000;
  }
}
.m_history-view__con {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
.m_history-view__con__list {
  position: relative;
  flex: 1;
  height: 100%;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: #000;
  }
  & > div {
    padding: 10px 10px 10px 50px;
    position: absolute;
    bottom: 50%;
    left: 0;
    width: 200%;
    height: 50%;
    display: flex;
    align-items: center;
  }
  & > span {
    position: absolute;
    bottom: 50%;
    left: 0;
    display: block;
    transform-origin: left center;
    transform: translate(0, -20px) rotate(-45deg);
  }
  &:nth-child(2n) {
    & > div {
      top: 50%;
      bottom: auto;
    }
    & > span {
      top: 50%;
      bottom: auto;
      transform-origin: right center;
      transform: translate(-100%, 20px) rotate(-45deg);
      text-align: right;
    }
  }
}
</style>
