<template>
  <main class="l_main">
    <h1>Chansoo's Web</h1>
    <no-ssr>
      <full-page ref="fullpage" :options="options">
        <div class="section">
          <div class="l_main__slide">
            <h2>welcome!</h2>
            <div></div>
          </div>
        </div>
        <div class="section l_main__slide">
          <div class="l_main__slide">
            <h2>welcome!</h2>
            <div></div>
          </div>
        </div>
        <div class="section l_main__slide">
          <div class="l_main__slide">
            <h2>welcome!</h2>
            <div></div>
          </div>
        </div>
        <div class="section l_main__slide">
          <div class="l_main__slide">
            <h2>welcome!</h2>
            <div></div>
          </div>
        </div>
        <div class="section l_main__slide">
          <div class="l_main__slide">
            <h2>welcome!</h2>
            <div></div>
          </div>
        </div>
      </full-page>
    </no-ssr>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Index',
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HERE',
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: [
          'Home',
          'Frontend Developer',
          'Interaction Animation',
          'Works',
          'Connect',
        ],
        easing: 'easeInOutCubic',
      },
    }
  },
  mounted() {
    console.log(this.$refs.fullpage)
  },
})
</script>

<style></style>
