<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
div {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
