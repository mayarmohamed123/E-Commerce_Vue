<template>
  <section class="home__section explore-products">
    <SectionHeader
      subtitle="Our Products"
      title="Explore Our Products"
      :showArrows="true" />
    <div class="product-grid product-grid--large">
      <template v-if="isLoading">
        <CardSkeleton v-for="i in 8" :key="'skeleton-' + i" />
      </template>
      <template v-else>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :showNewBadge="true" />
      </template>
    </div>
    <div class="center-btn">
      <PrimaryButton @click="$router.push('/products')"
        >View All Products</PrimaryButton
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from "@/modules/shared/components/SectionHeader.vue";
import ProductCard from "@/modules/shared/components/ProductCard.vue";
import PrimaryButton from "@/modules/shared/components/PrimaryButton.vue";
import CardSkeleton from "@/modules/shared/components/CardSkeleton.vue";
import type { Product } from "@/types";

/** Props interface */
interface Props {
  /** Products to display */
  products: Product[];
  /** Loading state */
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>
