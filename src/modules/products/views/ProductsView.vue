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
    };
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'isLoading', 'hasMore', 'activeCategory']),
    pageTitle() {
      return this.activeCategory
        ? this.activeCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Explore Our Products';
    },
    breadcrumbItems() {
      const items = [{ label: 'Home', to: '/' }];
      if (this.activeCategory) {
        items.push({ label: 'Products', to: '/products' });
        items.push({ label: this.activeCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) });
      } else {
        items.push({ label: 'Products' });
      }
      return items;
    },
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
  // Vue Router in-component navigation guards
  //
  // beforeRouteEnter – called before the component is created.
  // `this` is NOT available yet, so we use the next(vm => ...) callback.
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadProducts(to.query.category);
    });
  },
  // beforeRouteUpdate – called when the route changes but this component
  // is reused (e.g. navigating between categories via query param).
  // `this` IS available here.
  beforeRouteUpdate(to, from, next) {
    this.loadProducts(to.query.category);
    next();
  },
  methods: {
    ...mapActions('products', ['fetchInitialProducts', 'loadMoreProducts', 'fetchProductsByCategory']),
    loadProducts(category = this.$route.query.category) {
      if (category) {
        this.fetchProductsByCategory(category);
      } else {
        this.fetchInitialProducts();
      }
    }
  }
};
</script>
