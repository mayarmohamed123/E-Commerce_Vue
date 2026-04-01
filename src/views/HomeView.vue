<template>
  <DefaultLayout>
    <div class="home">
      <h1 class="home__title">Welcome to Exclusive</h1>
      <p class="home__subtitle">Your one-stop e-commerce destination</p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'HomeView',
  components: {
    DefaultLayout,
  },
};
</script>

<style lang="scss" scoped>
/* ========================================
   BLOCK: .home
   ======================================== */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;

  .home__title {
    font-size: 36px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 12px;
  }

  .home__subtitle {
    font-size: 16px;
    color: #777777;
  }
}
</style>
