<template>
  <main class="l_main">
    <ContentsHeader class="m_header-bg-1">
      <ContentsBar>
        <Title>ABOUT</Title>
      </ContentsBar>
      <ContentsBar>
        <Span> 저를 소개합니다! </Span>
      </ContentsBar>
    </ContentsHeader>
    <ContentsBar>
      <Title as="h2">Profile</Title>
    </ContentsBar>
    <Profile />
    <ContentsBar>
      <Title as="h2">History</Title>
    </ContentsBar>
    <HistoryView />
    <ContentsBar>
      <Title as="h2">Skills</Title>
    </ContentsBar>
    <SkillsView />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped></style>
