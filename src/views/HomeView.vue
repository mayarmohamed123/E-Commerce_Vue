<template>
  <DefaultLayout>
    <div class="home">
      <h1 class="home__title">Welcome to Exclusive</h1>
      <p class="home__subtitle">Your one-stop e-commerce destination</p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "HomeView",
  components: {
    DefaultLayout,
  },
};
</script>

<style lang="scss"></style>
