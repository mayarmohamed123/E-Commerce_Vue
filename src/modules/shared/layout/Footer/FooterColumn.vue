<template>
  <div class="footer-column">
    <h3 class="footer-column__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/** 
 * FooterColumn Component
 * A layout component for the footer that groups links or content under a title.
 */

/** Props interface for FooterColumn */
interface Props {
  /** Title text to display at the top of the column */
  title: string;
}

defineProps<Props>();
</script>

<style lang="scss">

</style>
