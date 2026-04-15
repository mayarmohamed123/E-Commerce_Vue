<template>
  <div class="products-page">
    <div class="container">
      <div class="products-page__breadcrumbs">
        <span>Home / </span><span class="active">Explore Our Products</span>
      </div>

      <div class="products-page__header">
        <h2 class="products-page__title">Explore Our Products</h2>
        <div class="products-page__sort">
          <label for="products-sort" class="products-page__sort-label">Sort by</label>
          <select
            id="products-sort"
            v-model="selectedSort"
            class="products-page__sort-select"
          >
            <option
              v-for="option in sortOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="products-page__grid">
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.id"
          :product="product"
          :showNewBadge="product.id % 3 === 0" 
        />
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

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    PrimaryButton
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
      ]
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
