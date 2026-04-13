<template>
  <div>
    <!-- Overlay -->
    <transition name="cart-overlay">
      <div
        v-if="isCartOpen"
        class="cart-overlay"
        @click="closeCart">
      </div>
    </transition>

    <!-- Sliding Cart Panel -->
    <transition name="cart-slide">
      <div v-if="isCartOpen" class="sliding-cart">
        <!-- Header -->
        <div class="sliding-cart__header">
          <h2 class="sliding-cart__title">Shopping Cart</h2>
          <button class="sliding-cart__close" @click="closeCart">
            <img :src="cancelIcon" alt="close" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="sliding-cart__items">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="sliding-cart__item"
            :class="{ 'sliding-cart__item--highlighted': highlightedItem === item.id }">
            <!-- Remove Button -->
            <button class="sliding-cart__item-remove" @click="removeItem(item.id)">
              <img :src="cancelIconSmall" alt="remove" />
            </button>

            <!-- Thumbnail -->
            <div class="sliding-cart__item-image">
              <img :src="item.thumbnail" :alt="item.title" />
            </div>

            <!-- Title -->
            <span class="sliding-cart__item-title">{{ item.title }}</span>

            <!-- Quantity Spinner -->
            <div class="sliding-cart__item-quantity">
              <span class="sliding-cart__item-qty-value">{{ String(item.quantity).padStart(2, '0') }}</span>
              <div class="sliding-cart__item-qty-arrows">
                <button @click="incrementQuantity(item)">
                  <img :src="dropUpIcon" alt="increase" />
                </button>
                <button @click="decrementQuantity(item)">
                  <img :src="dropDownIcon" alt="decrease" />
                </button>
              </div>
            </div>

            <!-- Price -->
            <span class="sliding-cart__item-price">${{ (item.price * item.quantity).toFixed(0) }}</span>
          </div>

          <!-- Empty State -->
          <div v-if="cartItems.length === 0" class="sliding-cart__empty">
            <p>Your cart is empty.</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="sliding-cart__footer">
          <div class="sliding-cart__summary-row">
            <span>Subtotal:</span>
            <span>${{ cartSubtotal.toFixed(0) }}</span>
          </div>
          <div class="sliding-cart__summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div class="sliding-cart__summary-row sliding-cart__summary-row--total">
            <span>Total:</span>
            <span>${{ cartTotal.toFixed(0) }}</span>
          </div>
          <button class="sliding-cart__checkout-btn">Place Order</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SlidingCart",
  data() {
    return {
      highlightedItem: null,
      cancelIcon: require("@/assets/images/icon-cancel.svg"),
      cancelIconSmall: require("@/assets/images/icon-cancel.svg"),
      dropUpIcon: require("@/assets/images/Drop-Up-Small.svg"),
      dropDownIcon: require("@/assets/images/Drop-Down-Small.svg"),
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "isCartOpen", "cartSubtotal", "cartTotal"]),
  },
  watch: {
    isCartOpen(val) {
      // Prevent body scroll when cart is open
      document.body.style.overflow = val ? "hidden" : "";
    },
  },
  methods: {
    ...mapActions("cart", ["closeCart", "updateQuantity", "removeItem"]),
    incrementQuantity(item) {
      this.updateQuantity({ productId: item.id, quantity: item.quantity + 1 });
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        this.updateQuantity({ productId: item.id, quantity: item.quantity - 1 });
      }
    },
  },
  beforeDestroy() {
    document.body.style.overflow = "";
  },
};
</script>
