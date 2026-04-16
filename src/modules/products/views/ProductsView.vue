<template>
  <div class="products-page">
    <div class="container">
      <AppBreadcrumb :items="breadcrumbItems" />

      <div class="products-page__header">
        <h2 class="products-page__title">Explore Our Products</h2>
        <SortDropdown v-model="selectedSort" :options="sortOptions" />
      </div>

      <div class="products-page__grid">
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.id"
          :product="product"
          :showNewBadge="product.id % 3 === 0" 
        />
        <template v-if="isLoading">
          <CardSkeleton v-for="i in 8" :key="'skeleton-' + i" />
        </template>
      </div>

      <div class="products-page__actions" v-if="hasMore">
        <PrimaryButton 
          @click="loadMoreProducts" 
          :disabled="isLoading"
          class="products-page__load-btn"
        >
          {{ isLoading ? 'Loading...' : 'Load more ...' }}
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/modules/shared/components/ProductCard.vue';
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue';
import AppBreadcrumb from '@/modules/shared/components/AppBreadcrumb.vue';
import CardSkeleton from '@/modules/shared/components/CardSkeleton.vue';
import SortDropdown from '../components/SortDropdown.vue';

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    PrimaryButton,
    AppBreadcrumb,
    CardSkeleton,
    SortDropdown,
  },
  data() {
    return {
      selectedSort: "Price: Low to High",
      sortOptions: [
        "Price: Low to High",
        "Price: High to Low",
        "Rating",
        "Name A-Z",
        "Name Z-A",
        "Discount"
      ],
      breadcrumbItems: [
        { label: "Home", to: "/" },
        { label: "Products" },
      ],
    };
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'isLoading', 'hasMore']),
    sortedProducts() {
      const productsCopy = [...this.allProducts];

      switch (this.selectedSort) {
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
            (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
          );
        default:
          return productsCopy;
      }
    }
  },
  created() {
    this.fetchInitialProducts();
  },
  methods: {
    ...mapActions('products', ['fetchInitialProducts', 'loadMoreProducts'])
  }
};
</script>
