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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores";
import FlashSales from "../components/FlashSales.vue";
import HomeCategories from "../components/HomeCategories.vue";
import ExploreProducts from "../components/ExploreProducts.vue";
import AppServices from "../../shared/components/AppServices.vue";
import HomeSilder from "../components/HomeSilder.vue";

/** Home store */
const homeStore = useHomeStore();

/** Reactive refs from store — storeToRefs preserves reactivity so the template
 *  updates when fetchHomeData() resolves after mount. */
const { flashSalesProducts: flashSales, productCategories: categories, exploreSectionProducts: exploreProducts, loading: isLoading } = storeToRefs(homeStore);

/** Fetch home data on mount */
onMounted(() => {
  homeStore.fetchHomeData();
});
</script>
