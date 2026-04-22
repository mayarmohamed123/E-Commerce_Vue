<template>
  <nav class="navbar">
    <div class="navbar__container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo">Exclusive</router-link>

      <!-- Navigation Links (Desktop) -->
      <ul class="navbar__menu">
        <li v-for="link in navLinks" :key="link.path" class="navbar__menu-item">
          <router-link
            :to="link.path"
            class="navbar__menu-link"
            :exact="link.path === '/'"
            active-class="navbar__menu-link--active">
            {{ link.text }}
          </router-link>
        </li>
      </ul>

      <!-- Search & Actions -->
      <div class="navbar__actions">
        <!-- Desktop Search -->
        <div class="navbar__search navbar__search--desktop">
          <input
            type="text"
            class="navbar__search-input"
            placeholder="What are you looking for?" />
          <button class="navbar__search-btn">
            <img :src="searchIcon" alt="Search" class="navbar__search-icon" />
          </button>
        </div>

        <button class="navbar__action-btn" @click="toggleCart">
          <img :src="cartIcon" alt="Cart" class="navbar__action-icon" />
          <span v-if="cartItemCount > 0" class="navbar__badge">{{
            cartItemCount
          }}</span>
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button class="navbar__toggle" @click="toggleMenu">
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      class="navbar__mobile-menu"
      :class="{ 'navbar__mobile-menu--open': isMenuOpen }">
      <!-- Mobile Search -->
      <div class="navbar__search navbar__search--mobile">
        <input
          type="text"
          class="navbar__search-input"
          placeholder="What are you looking for?" />
        <button class="navbar__search-btn">
          <img :src="searchIcon" alt="Search" class="navbar__search-icon" />
        </button>
      </div>

      <ul class="navbar__mobile-list">
        <li
          v-for="link in navLinks"
          :key="'mobile-' + link.path"
          class="navbar__mobile-item">
          <router-link
            :to="link.path"
            class="navbar__mobile-link"
            @click="closeMenu">
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Sliding Cart -->
    <SlidingCart />
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores";
import SlidingCart from "@/modules/cart/components/SlidingCart.vue";
import searchIcon from "@/assets/images/Search.svg";
import cartIcon from "@/assets/images/Cart1.svg";

/** Navigation link type */
interface NavLink {
  text: string;
  path: string;
}

/** Cart store */
const cartStore = useCartStore();

/** Mobile menu state */
const isMenuOpen = ref<boolean>(false);

/** Navigation links */
const navLinks = ref<NavLink[]>([
  { text: "Home", path: "/" },
  { text: "Products", path: "/products" },
  { text: "Contact", path: "/contact" },
  { text: "About", path: "/about" },
]);

/** Cart item count from store (reactive) */
const cartItemCount = computed(() => cartStore.cartItemCount);

/** Fetch cart on mount */
onMounted(() => {
  cartStore.fetchCart();
});

/** Toggle mobile menu */
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

/** Close mobile menu */
const closeMenu = (): void => {
  isMenuOpen.value = false;
};

/** Toggle cart drawer */
const toggleCart = (): void => {
  cartStore.toggleCart();
};
</script>

<style lang="scss"></style>
