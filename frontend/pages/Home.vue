<template>
  <main class="l_main">
    <h1>Home</h1>
    <bf-bg />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BfBg from '~/components/visual/Bf_bg.vue'
export default Vue.extend({
  name: 'Home',
  components: { 'bf-bg': BfBg },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.l_main {
}
</style>
