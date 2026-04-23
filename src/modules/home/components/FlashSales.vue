<template>
  <section class="home__section flash-sales">
    <SectionHeader subtitle="Today's" title="Flash Sales" :showArrows="true" />
    <div class="product-grid">
      <template v-if="isLoading">
        <CardSkeleton v-for="i in 4" :key="'skeleton-' + i" />
      </template>
      <template v-else>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :showDiscount="true" />
      </template>
    </div>
    <div class="center-btn">
      <router-link to="/products">
        <PrimaryButton>View All Products</PrimaryButton>
      </router-link>
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
  /** Flash sale products */
  products: Product[];
  /** Loading state */
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>
