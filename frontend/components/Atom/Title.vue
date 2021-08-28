<template>
  <h1 :is="as">
    <slot />
  </h1>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    as: {
      type: String,
      default: 'h1',
    },
  },
})
</script>
<style lang="scss" scoped>
h1,
h2,
h3 {
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}
h1 {
  font-size: 36px;
}
h2 {
  font-size: 24px;
}
</style>
