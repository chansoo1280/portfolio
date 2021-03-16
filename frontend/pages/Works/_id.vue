<template>
  <main ref="main" class="l_main">
    <h1>Works - {{ $route.params.id }}</h1>
    뒷 배경 고정
    <h2>프로젝트 내용</h2>
    큰 배너 client skill date
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WorksInfo',
  layout: 'info',
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.l_main {
}
</style>
