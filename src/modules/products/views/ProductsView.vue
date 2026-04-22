<template>
  <div class="products-page">
    <div class="container">
      <AppBreadcrumb :items="breadcrumbItems" />

      <div class="products-page__header">
        <h2 class="products-page__title">{{ pageTitle }}</h2>
        <SortDropdown v-model="selectedSort" :options="sortOptions" />
      </div>

      <div class="products-page__grid">
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.id"
          :product="product"
          :showNewBadge="product.id % 3 === 0" />
        <template v-if="isLoading">
          <CardSkeleton v-for="i in 8" :key="'skeleton-' + i" />
        </template>
      </div>

      <div class="products-page__actions" v-if="hasMore">
        <PrimaryButton
          @click="loadMoreProducts"
          :disabled="isLoading"
          class="products-page__load-btn">
          {{ isLoading ? "Loading..." : "Load more ..." }}
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores";
import type { Product } from "@/types";
import ProductCard from "@/modules/shared/components/ProductCard.vue";
import PrimaryButton from "@/modules/shared/components/PrimaryButton.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";
import CardSkeleton from "@/modules/shared/components/CardSkeleton.vue";
import SortDropdown from "../components/SortDropdown.vue";

/**
 * ProductsView Component
 * Main product exploration view with category filtering, sorting, and pagination.
 */

/** Breadcrumb navigation item interface */
interface BreadcrumbItem {
  /** Text to display */
  label: string;
  /** Target path */
  to?: string;
}

/** Route and Store access */
const route = useRoute();
const productsStore = useProductsStore();

/** User-selected sort option */
const selectedSort = ref<string>("Price: Low to High");

/** Available options for product sorting */
const sortOptions: string[] = [
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
  "Name A-Z",
  "Name Z-A",
  "Discount",
];

/** Computed store properties */
const allProducts = computed(() => productsStore.products);
const isLoading = computed(() => productsStore.isLoading);
const hasMore = computed(() => productsStore.hasMore);
const activeCategory = computed(() => productsStore.activeCategory);

/** Dynamic page title derived from current category filter */
const pageTitle = computed((): string => {
  const cat = activeCategory.value;
  return cat
    ? cat.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "Explore Our Products";
});

/** Breadcrumb navigation array */
const breadcrumbItems = computed((): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [{ label: "Home", to: "/" }];
  const cat = activeCategory.value;
  if (cat) {
    items.push({ label: "Products", to: "/products" });
    items.push({
      label: cat
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
    });
  } else {
    items.push({ label: "Products" });
  }
  return items;
});

/** Sorted products based on selected sort option */
const sortedProducts = computed((): Product[] => {
  const productsCopy = [...allProducts.value];

  switch (selectedSort.value) {
    case "Price: Low to High":
      return productsCopy.sort((a, b) => a.price - b.price);
    case "Price: High to Low":
      return productsCopy.sort((a, b) => b.price - a.price);
    case "Rating":
      return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "Name A-Z":
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case "Name Z-A":
      return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case "Discount":
      return productsCopy.sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0),
      );
    default:
      return productsCopy;
  }
});

/**
 * Load products based on category query param
 * @param category - Optional category name
 */
const loadProducts = (category?: string | null): void => {
  const cat = category ?? (route.query.category as string | undefined);
  if (cat) {
    productsStore.fetchProductsByCategory(cat);
  } else {
    productsStore.fetchInitialProducts();
  }
};

/**
 * Load more products for pagination
 */
const loadMoreProducts = (): void => {
  productsStore.loadMoreProducts();
};

/** Load products on mount */
onMounted(() => {
  loadProducts();
});

/** Watch route for category changes */
watch(
  () => route.query.category,
  (newCategory) => {
    loadProducts(newCategory as string | undefined);
  },
);
</script>
