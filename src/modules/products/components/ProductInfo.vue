<template>
  <div class="product-details__content" v-if="props.product">
    <!-- Left: Image Gallery -->
    <div class="product-details__gallery">
      <div class="product-details__thumbnails">
        <div
          v-for="(img, index) in props.product.images"
          :key="index"
          class="product-details__thumbnail"
          :class="{ 'product-details__thumbnail--active': activeImage === img }"
          @click="activeImage = img">
          <img :src="img" :alt="props.product.title" />
        </div>
      </div>
      <div class="product-details__main-image">
        <img :src="activeImage" :alt="props.product.title" />
      </div>
    </div>

    <!-- Right: Product Info -->
    <div class="product-details__info">
      <h1 class="product-details__title">{{ props.product.title }}</h1>

      <div class="product-details__rating-row">
        <StarRating
          :rating="props.product.rating ?? 0"
          :reviews="props.product.reviews ? props.product.reviews.length : 0" />
        <span class="stock-status">In Stock</span>
      </div>

      <div class="product-details__price">${{ props.product.price.toFixed(2) }}</div>

      <p class="product-details__description">
        {{ props.product.description }}
      </p>

      <div class="product-details__divider"></div>

      <div class="product-details__category">
        Category: <span>{{ props.product.category }}</span>
      </div>

      <!-- Controls -->
      <div class="product-details__controls">
        <div class="product-details__quantity">
          <button @click="decrementQuantity">-</button>
          <div class="value">{{ quantity }}</div>
          <button @click="incrementQuantity">+</button>
        </div>

        <button class="product-details__buy-btn" @click="handleAddToCart">
          Buy Now
        </button>

        <button class="product-details__wishlist-btn">
          <img :src="heartIcon" alt="wishlist" class="icon" />
        </button>
      </div>

      <!-- Delivery Info -->
      <div class="product-details__delivery-info">
        <div class="product-details__delivery-box">
          <img :src="deliveryIcon" alt="delivery" class="icon" />
          <div class="box-info">
            <span class="title">Free Delivery</span>
            <span class="subtitle"
              >Enter your postal code for Delivery Availability</span
            >
          </div>
        </div>
        <div class="product-details__delivery-box">
          <img :src="returnIcon" alt="return" class="icon" />
          <div class="box-info">
            <span class="title">Return Delivery</span>
            <span class="subtitle">Free 30 Days Delivery Returns. Details</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCartStore } from "@/stores";
import StarRating from "@/modules/shared/components/StarRating.vue";
import type { Product } from "@/types";
import heartIcon from "@/assets/images/heart small.svg";
import deliveryIcon from "@/assets/images/icon-delivery1.svg";
import returnIcon from "@/assets/images/Icon-return.svg";

/** Props interface */
interface Props {
  /** Product data to display */
  product: Product;
}

/** Component Props */
const props = defineProps<Props>();

/** Cart store */
const cartStore = useCartStore();

/** Active/selected product image */
const activeImage = ref<string>(props.product?.images?.[0] ?? "");

/** Selected quantity to purchase */
const quantity = ref<number>(1);

/** Watch for product changes and reset state */
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      activeImage.value = newVal.images?.[0] ?? "";
      quantity.value = 1;
    }
  },
  { immediate: true },
);

/** Increase quantity */
const incrementQuantity = (): void => {
  if (props.product && quantity.value < (props.product.stock ?? Infinity)) {
    quantity.value++;
  }
};

/** Decrease quantity */
const decrementQuantity = (): void => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

/** Add product to cart with selected quantity */
const handleAddToCart = (): void => {
  cartStore.addToCart({
    ...props.product,
    quantity: quantity.value,
  });
};
</script>
