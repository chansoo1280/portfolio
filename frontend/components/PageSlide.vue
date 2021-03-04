<template>
  <div class="wrap">
    <ol ref="slider" class="slider">
      <slot />
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      show_idx: 1,
    }
  },
  mounted() {},
})
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.slider {
  & > li {
    width: 100%;
    height: 100vh;
  }
}
</style>
