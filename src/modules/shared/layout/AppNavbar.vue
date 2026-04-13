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
          <span v-if="cartItemCount > 0" class="navbar__badge">{{ cartItemCount }}</span>
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
            @click.native="closeMenu">
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Sliding Cart -->
    <SlidingCart />
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlidingCart from "@/modules/cart/components/SlidingCart.vue";

export default {
  name: "AppNavbar",
  components: {
    SlidingCart,
  },
  data() {
    return {
      isMenuOpen: false,
      navLinks: [
        { text: "Home", path: "/" },
        { text: "Products", path: "/products" },
        { text: "Contact", path: "/contact" },
        { text: "About", path: "/about" },
      ],
      searchIcon: require("@/assets/images/Search.svg"),
      cartIcon: require("@/assets/images/Cart1.svg"),
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItemCount"]),
  },
  created() {
    this.fetchCart();
  },
  methods: {
    ...mapActions("cart", ["toggleCart", "fetchCart"]),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style lang="scss"></style>
