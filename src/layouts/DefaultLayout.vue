<template>
  <div class="layout">
    <AppNavbar />
    <main class="layout__content">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "./AppFooter.vue";
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "DefaultLayout",
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style lang="scss"></style>
