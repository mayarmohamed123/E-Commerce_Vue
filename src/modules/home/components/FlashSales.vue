<template>
  <section class="home__section flash-sales">
    <SectionHeader subtitle="Today's" title="Flash Sales" :showArrows="true" />
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :showDiscount="true"
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
  name: "FlashSales",
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
