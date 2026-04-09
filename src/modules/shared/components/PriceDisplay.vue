<template>
  <div class="price-display">
    <span class="price-display__current">${{ currentPrice }}</span>
    <span v-if="originalPrice" class="price-display__original"
      >${{ originalPrice }}</span
    >
    <span v-if="discount" class="price-display__discount"
      >-{{ discount }}%</span
    >
  </div>
</template>

<script>
export default {
  name: "PriceDisplay",
  props: {
    currentPrice: {
      type: [Number, String],
      required: true,
    },
    originalPrice: {
      type: [Number, String],
      default: null,
    },
    discount: {
      type: [Number, String],
      default: null,
    },
  },
};
</script>
