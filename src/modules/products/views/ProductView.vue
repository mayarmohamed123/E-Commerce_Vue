<template>
  <div class="product-details">
    <div class="container" v-if="currentProduct">
      <AppBreadcrumb :items="breadcrumbItems" />

      <!-- Main Product Info component -->
      <ProductInfo :product="currentProduct" />

      <!-- Related Products component -->
      <RelatedProducts :category="currentProduct.category" />
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

<script>
import { mapGetters, mapActions } from "vuex";
import ProductInfo from "../components/ProductInfo.vue";
import RelatedProducts from "../components/RelatedProducts.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";

export default {
  name: "ProductView",
  components: {
    ProductInfo,
    RelatedProducts,
    AppBreadcrumb,
  },
  computed: {
    ...mapGetters("products", ["currentProduct", "isLoading"]),
    breadcrumbItems() {
      const routeTitle = this.$route.query.title;
      return [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: routeTitle || (this.currentProduct ? this.currentProduct.title : "...") },
      ];
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchProductById(to.params.id).then(data => {
        if (!data) {
          vm.$router.replace({ name: 'NotFound' });
        }
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductById(to.params.id).then(data => {
      if (!data) {
        next({ name: 'NotFound' });
      } else {
        next();
      }
    });
  },
  methods: {
    ...mapActions("products", ["fetchProductById"]),
  },
};
</script>

<style lang="scss"></style>
