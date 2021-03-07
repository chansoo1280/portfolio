<template>
  <main class="l_main">
    <h1>Skills</h1>
    <MySkills />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import MySkills from '~/components/visual/MySkills.vue'

export default Vue.extend({
  name: 'Skills',
  components: { MySkills },
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
