<template>
  <div class="layout">
    <AppNavbar />
    <main class="layout__content">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "./AppFooter.vue";
import AppNavbar from "./AppNavbar.vue";

/**
 * DefaultLayout Component
 * Standard page layout containing the navbar, main content slot, and footer.
 */
</script>

<style lang="scss"></style>
