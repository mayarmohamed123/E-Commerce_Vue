<template>
  <section class="home__section flash-sales">
    <SectionHeader subtitle="Today's" title="Flash Sales" :showArrows="true" />
    <div class="product-grid">
      <template v-if="isLoading">
        <CardSkeleton v-for="i in 4" :key="'skeleton-' + i" />
      </template>
      <template v-else>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :showDiscount="true"
        />
      </template>
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
import CardSkeleton from '@/modules/shared/components/CardSkeleton.vue';

export default {
  name: "FlashSales",
  components: {
    SectionHeader,
    ProductCard,
    PrimaryButton,
    CardSkeleton
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
