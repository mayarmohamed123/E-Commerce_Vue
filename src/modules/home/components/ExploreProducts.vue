<template>
  <section class="home__section explore-products">
    <SectionHeader subtitle="Our Products" title="Explore Our Products" :showArrows="true" />
    <div class="product-grid product-grid--large">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :showNewBadge="true"
      />
    </div>
    <div class="center-btn">
      <PrimaryButton @click="$router.push('/products')">View All Products</PrimaryButton>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/modules/shared/components/SectionHeader.vue';
import ProductCard from '@/modules/shared/components/ProductCard.vue';
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue';

export default {
  name: "ExploreProducts",
  components: {
    SectionHeader,
    ProductCard,
    PrimaryButton
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>
