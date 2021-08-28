<template>
  <main class="l_main">
    <h1>Skills</h1>
    <MySkills />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import MySkills from '~/components/visual/MySkills2.vue'

export default Vue.extend({
  name: 'Skills',
  components: { MySkills },
  data() {
    return {}
  },
  head: {
    title: "Chansoo's Portfolio - Skills",
  },
  mounted() {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.l_main {
  & > h1 {
    position: absolute;
    top: 20px;
    left: 50px;
    font-size: 50px;
  }
}
</style>
