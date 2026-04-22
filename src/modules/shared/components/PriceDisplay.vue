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

<script setup lang="ts">
/**
 * PriceDisplay Component
 * Displays product pricing information including current price, optional original price, and discount percentage.
 */

/** Props interface for PriceDisplay */
interface Props {
  /** Current active price of the item */
  currentPrice: number | string;
  /** Original price before discount (optional) */
  originalPrice?: number | string | null;
  /** Discount percentage to display (optional) */
  discount?: number | string | null;
}

/** Define props with defaults */
withDefaults(defineProps<Props>(), {
  originalPrice: null,
  discount: null,
});
</script>
