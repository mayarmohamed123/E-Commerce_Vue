<template>
  <div class="layout">
    <TheNavbar />
    <main class="layout__content">
      <slot></slot>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style lang="scss" scoped>
/* ========================================
   BLOCK: .layout
   ======================================== */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* ELEMENT: __content */
  .layout__content {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
}
</style>
