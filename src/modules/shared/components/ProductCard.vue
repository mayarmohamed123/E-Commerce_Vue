<template>
  <div class="product-card">
    <div class="product-card__top">
      <div class="product-card__badges">
        <span
          v-if="showDiscount && product.discountPercentage"
          class="product-card__badge product-card__badge--discount">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
        <span
          v-if="showNewBadge && product.isNew"
          class="product-card__badge product-card__badge--new">
          NEW
        </span>
      </div>

      <div class="product-card__actions">
        <button class="icon-button">
          <img
            :src="require('@/assets/images/heart small.svg')"
            alt="heart"
            class="icon-button__icon" />
        </button>
        <button class="icon-button">
          <img
            :src="require('@/assets/images/Quick View.svg')"
            alt="eye"
            class="icon-button__icon" />
        </button>
      </div>

      <div class="product-card__image-container">
        <img
          :src="product.thumbnail || (product.images && product.images[0])"
          :alt="product.title"
          class="product-card__image" />
      </div>

      <div class="product-card__add-to-cart">
        <button
          class="add-to-cart-button add-to-cart-button--black">
          <img
            src="@/assets/images/Cart1.svg"
            alt="cart"
            class="add-to-cart-button__icon" />
          <span class="add-to-cart-button__text">Add To Cart</span>
        </button>
      </div>
    </div>

    <div class="product-card__bottom">
      <h3 class="product-card__name">{{ product.title }}</h3>
      <PriceDisplay
        :current-price="product.price"
        :original-price="product.originalPrice"
        :discount="product.discountPercentage ? Math.round(product.discountPercentage) : null" />
      <StarRating :rating="product.rating" :reviews="product.reviews ? product.reviews.length : 0" />
    </div>
  </div>
</template>

<script>
import PriceDisplay from "./PriceDisplay.vue";
import StarRating from "./StarRating.vue";

export default {
  name: "ProductCard",
  components: {
    PriceDisplay,
    StarRating,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    showDiscount: {
      type: Boolean,
      default: true,
    },
    showNewBadge: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
