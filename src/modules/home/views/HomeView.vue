<template>
  <div class="home">
    <div class="container">
      <HomeSilder />
      <FlashSales :products="flashSales" :isLoading="isLoading" />
      <HomeCategories :categories="categories" />
      <ExploreProducts :products="exploreProducts" :isLoading="isLoading" />
      <AppServices />
    </div>
  </div>
</template>

<script setup lang="ts">
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
const { flashSales, categories, exploreProducts, isLoading } = useHomeData();
</script>
