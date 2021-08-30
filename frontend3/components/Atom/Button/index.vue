<template>
  <fragment>
    <button v-if="href === null" class="btn" @click="$emit('click')">
      <slot />
    </button>
    <NuxtLink v-else :to="href" class="btn" @click="$emit('click')"
      ><slot
    /></NuxtLink>
  </fragment>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    href: {
      type: String,
      default: null,
    },
  },
})
</script>
<style lang="scss" scoped>
.btn {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
