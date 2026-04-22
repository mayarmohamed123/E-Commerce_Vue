<template>
  <div class="product-details__related" v-if="relatedProducts.length > 0">
    <SectionHeader subtitle="Related Item" title="More of this category" />
    <div class="products-grid">
      <ProductCard
        v-for="item in relatedProducts"
        :key="item.id"
        :product="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores";
import SectionHeader from "@/modules/shared/components/SectionHeader.vue";
import ProductCard from "@/modules/shared/components/ProductCard.vue";

/** Props interface */
interface Props {
  /** Category name to fetch related products */
  category: string;
}

const props = defineProps<Props>();

/** Products store */
const productsStore = useProductsStore();

/** Related products from store - using storeToRefs for reactivity */
const { relatedProducts } = storeToRefs(productsStore);

/** Watch category changes and fetch related products */
watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      productsStore.fetchRelatedProducts(newCategory);
    }
  },
  { immediate: true },
);
</script>
