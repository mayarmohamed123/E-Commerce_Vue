<template>
  <div class="home">
    <div class="container">
      <HomeSilder />
      <FlashSales :products="homeData.flashSales" :isLoading="homeData.isLoading" />
      <HomeCategories :categories="homeData.categories" />
      <ExploreProducts :products="homeData.exploreProducts" :isLoading="homeData.isLoading" />
      <AppServices />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHomeData } from "../composables/useHomeData";
import FlashSales from "../components/FlashSales.vue";
import HomeCategories from "../components/HomeCategories.vue";
import ExploreProducts from "../components/ExploreProducts.vue";
import AppServices from "../../shared/components/AppServices.vue";
import HomeSilder from "../components/HomeSilder.vue";

/**
 * Fetch home data using the useHomeData composable.
 * This replaces the useHomeStore which is only used in this view.
 */
const homeData = reactive(useHomeData());
</script>
