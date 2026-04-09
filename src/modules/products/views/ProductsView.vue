<template>
  <div class="products-page">
    <div class="container">
      <div class="products-page__breadcrumbs">
        <span>Home / </span><span class="active">Explore Our Products</span>
      </div>

      <div class="products-page__header">
        <h2 class="products-page__title">Explore Our Products</h2>
      </div>

      <div class="products-page__grid">
        <ProductCard
          v-for="product in allProducts"
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
  computed: {
    ...mapGetters('products', ['allProducts', 'isLoading', 'hasMore'])
  },
  created() {
    this.fetchInitialProducts();
  },
  methods: {
    ...mapActions('products', ['fetchInitialProducts', 'loadMoreProducts'])
  }
};
</script>
