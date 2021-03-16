<template>
  <main ref="main" class="l_main">
    <h1>Works</h1>
    <WorkSlide />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import WorkSlide from '~/components/WorkSlide.vue'

export default Vue.extend({
  name: 'Works',
  components: { WorkSlide },
  data() {
    return {}
  },
  head: {
    title: "Chansoo's Portfolio - Works",
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
