<template>
  <div class="product-details">
    <div class="container" v-if="currentProduct">
      <AppBreadcrumb :items="breadcrumbItems" />

      <!-- Main Product Info component -->
      <ProductInfo :product="currentProduct" />

      <!-- Related Products component -->
      <RelatedProducts :category="currentProduct.category ?? ''" />
    </div>

    <!-- Loading State -->
    <div class="container" v-else-if="isLoading">
      <p>Loading product details...</p>
    </div>

    <div class="container" v-else>
      <p>Product not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/stores";
import ProductInfo from "../components/ProductInfo.vue";
import RelatedProducts from "../components/RelatedProducts.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";

/** Breadcrumb item type */
interface BreadcrumbItem {
  label: string;
  to?: string;
}

/** Router and store */
const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

/** Store getters as computed refs */
const currentProduct = computed(() => productsStore.current);
const isLoading = computed(() => productsStore.loading);

/** Breadcrumb items based on current product */
const breadcrumbItems = computed((): BreadcrumbItem[] => {
  const routeTitle = route.query.title as string | undefined;
  return [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    {
      label:
        routeTitle ||
        (currentProduct.value ? currentProduct.value.title : "..."),
    },
  ];
});

/**
 * Fetch product by ID
 * @param id - Product ID to fetch
 */
const fetchProduct = async (id: string | number): Promise<void> => {
  const data = await productsStore.fetchProductById(Number(id));
  if (!data) {
    router.replace({ name: "NotFound" });
  }
};

/** Fetch product on mount */
onMounted(() => {
  fetchProduct(route.params.id as string);
});

/** Watch for route changes to refetch product */
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchProduct(newId as string);
    }
  },
);
</script>

<style lang="scss"></style>
