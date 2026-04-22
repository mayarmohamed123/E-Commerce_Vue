<template>
  <router-link
    :to="{ path: '/product/' + props.product.id, query: { title: props.product.title } }"
    class="product-card">
    <div class="product-card__top">
      <div class="product-card__badges">
        <span
          v-if="props.showDiscount && props.product.discountPercentage"
          class="product-card__badge product-card__badge--discount">
          -{{ Math.round(props.product.discountPercentage) }}%
        </span>
        <span
          v-if="props.showNewBadge && props.product.isNew"
          class="product-card__badge product-card__badge--new">
          NEW
        </span>
      </div>

      <div class="product-card__actions">
        <button class="icon-button" @click.stop.prevent>
          <img :src="heartIcon" alt="heart" class="icon-button__icon" />
        </button>
        <button class="icon-button" @click.stop.prevent>
          <img :src="quickViewIcon" alt="eye" class="icon-button__icon" />
        </button>
      </div>

      <div class="product-card__image-container">
        <img
          :src="props.product.thumbnail || (props.product.images && props.product.images[0])"
          :alt="props.product.title"
          class="product-card__image" />
      </div>

      <div class="product-card__add-to-cart">
        <button
          class="add-to-cart-button add-to-cart-button--black"
          @click.stop.prevent="handleAddToCart">
          <img :src="cartIcon" alt="cart" class="add-to-cart-button__icon" />
          <span class="add-to-cart-button__text">Add To Cart</span>
        </button>
      </div>
    </div>

    <div class="product-card__bottom">
      <h3 class="product-card__name">{{ props.product.title }}</h3>
      <PriceDisplay
        :current-price="props.product.price"
        :original-price="props.product.originalPrice"
        :discount="
          props.product.discountPercentage
            ? Math.round(props.product.discountPercentage)
            : null
        " />
      <StarRating
        :rating="props.product.rating ?? 0"
        :reviews="props.product.reviews ? props.product.reviews.length : 0" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores";
import type { Product } from "@/types";
import heartIcon from "@/assets/images/heart small.svg";
import quickViewIcon from "@/assets/images/Quick View.svg";
import cartIcon from "@/assets/images/Cart1.svg";
import PriceDisplay from "./PriceDisplay.vue";
import StarRating from "./StarRating.vue";

/**
 * ProductCard Component
 * Displays a summary of a product with price, rating, and quick actions.
 */

/** Props interface for ProductCard */
interface Props {
  /** Product data to display */
  product: Product;
  /** Whether to show discount badge */
  showDiscount?: boolean;
  /** Whether to show NEW badge */
  showNewBadge?: boolean;
}

/** Component Props with defaults */
const props = withDefaults(defineProps<Props>(), {
  showDiscount: true,
  showNewBadge: false,
});

/** Cart store for adding items */
const cartStore = useCartStore();

/**
 * Add product to cart
 * Accesses the product from props and triggers store action.
 */
const handleAddToCart = (): void => {
  cartStore.addToCart(props.product);
};
</script>
