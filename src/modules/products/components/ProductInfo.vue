<template>
  <div class="product-details__content" v-if="product">
    <!-- Left: Image Gallery -->
    <div class="product-details__gallery">
      <div class="product-details__thumbnails">
        <div
          v-for="(img, index) in product.images"
          :key="index"
          class="product-details__thumbnail"
          :class="{ 'product-details__thumbnail--active': activeImage === img }"
          @click="activeImage = img">
          <img :src="img" :alt="product.title" />
        </div>
      </div>
      <div class="product-details__main-image">
        <img :src="activeImage" :alt="product.title" />
      </div>
    </div>

    <!-- Right: Product Info -->
    <div class="product-details__info">
      <h1 class="product-details__title">{{ product.title }}</h1>
      
      <div class="product-details__rating-row">
        <StarRating :rating="product.rating" :reviews="product.reviews ? product.reviews.length : 0" />
        <span class="stock-status">In Stock</span>
      </div>

      <div class="product-details__price">
        ${{ product.price.toFixed(2) }}
      </div>

      <p class="product-details__description">
        {{ product.description }}
      </p>

      <div class="product-details__divider"></div>

      <div class="product-details__category">
        Category: <span>{{ product.category }}</span>
      </div>

      <!-- Controls -->
      <div class="product-details__controls">
        <div class="product-details__quantity">
          <button @click="decrementQuantity"> - </button>
          <div class="value">{{ quantity }}</div>
          <button @click="incrementQuantity"> + </button>
        </div>
        
        <button class="product-details__buy-btn" @click="handleAddToCart">Buy Now</button>
        
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
            <span class="subtitle">Enter your postal code for Delivery Availability</span>
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

<script>
import { mapActions } from "vuex";
import StarRating from "@/modules/shared/components/StarRating.vue";

export default {
  name: "ProductInfo",
  components: {
    StarRating,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeImage: this.product.images[0],
      quantity: 1,
      heartIcon: require("@/assets/images/heart small.svg"),
      deliveryIcon: require("@/assets/images/icon-delivery1.svg"),
      returnIcon: require("@/assets/images/Icon-return.svg"),
    };
  },
  watch: {
    product: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.activeImage = newVal.images[0];
          this.quantity = 1;
        }
      },
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    incrementQuantity() {
      if (this.product && this.quantity < this.product.stock) {
        this.quantity++;
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    handleAddToCart() {
      this.addToCart({
        ...this.product,
        quantity: this.quantity,
      });
    },
  },
};
</script>
