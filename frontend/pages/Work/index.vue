<template>
  <main class="l_main">
    <ContentsHeader>
      <ContentsBar>
        <Title>Work</Title>
      </ContentsBar>
      <ContentsBar>
        <Span> 2021 </Span>
      </ContentsBar>
    </ContentsHeader>
    <ul class="m_work">
      <li v-for="work in work_list" :key="work.idx" class="t_col-2">
        <NuxtLink :to="'/Work/' + work.idx">
          {{ work.name }}
        </NuxtLink>
      </li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      work_list: [
        {
          idx: 1,
          name: '물가조회',
        },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
.m_work {
  padding: 0 100px;
  display: grid;
  align-content: center;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(auto, 300px);
  & > li {
    border: 1px solid;
    border-radius: 10px;
    &.t_col-2 {
      grid-column: auto / span 2;
    }
    &.t_col-3 {
      grid-column: auto / span 3;
    }
    &.t_row-2 {
      grid-row: auto / span 2;
    }
    & > a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
