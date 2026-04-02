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
            active-class="navbar__menu-link--active"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>

      <!-- Search & Actions -->
      <div class="navbar__actions">
        <div class="navbar__search">
          <input
            type="text"
            class="navbar__search-input"
            placeholder="What are you looking for?"
          />
          <button class="navbar__search-btn">
            <img
              :src="require('@/assets/images/Search.svg')"
              alt="Search"
              class="navbar__search-icon"
            />
          </button>
        </div>

        <button class="navbar__action-btn">
          <img
            :src="require('@/assets/images/Cart1.svg')"
            alt="Cart"
            class="navbar__action-icon"
          />
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
    <div class="navbar__mobile-menu" :class="{ 'navbar__mobile-menu--open': isMenuOpen }">
      <ul class="navbar__mobile-list">
        <li v-for="link in navLinks" :key="'mobile-' + link.path" class="navbar__mobile-item">
          <router-link
            :to="link.path"
            class="navbar__mobile-link"
            @click.native="closeMenu"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      isMenuOpen: false,
      navLinks: [
        { text: 'Home', path: '/' },
        { text: 'Contact', path: '/contact' },
        { text: 'About', path: '/about' },
        { text: 'Sign Up', path: '/signup' },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

/* ========================================
   BLOCK: .navbar
   ======================================== */
.navbar {
  width: 100%;
  background-color: $primary-white;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: $font-family-poppins;

  /* ELEMENT: __container */
  .navbar__container {
    max-width: $max-width-container;
    margin: 0 auto;
    padding: 16px $padding-container;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ELEMENT: __logo */
  .navbar__logo {
    font-size: 24px;
    font-weight: 700;
    color: $primary-black;
    text-decoration: none;
    letter-spacing: 1px;
    transition: opacity $transition-default;

    &:hover {
      opacity: 0.7;
    }
  }

  /* ELEMENT: __menu */
  .navbar__menu {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;

    /* ELEMENT: __menu-item */
    .navbar__menu-item {
      position: relative;
    }

    /* ELEMENT: __menu-link */
    .navbar__menu-link {
      font-size: 14px;
      font-weight: 400;
      color: $primary-black;
      text-decoration: none;
      padding: 4px 0;
      position: relative;
      transition: color $transition-default;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $primary-black;
        transition: width $transition-default;
      }

      &:hover {
        color: #555555;

        &::after {
          width: 100%;
        }
      }

      /* MODIFIER: --active */
      &.navbar__menu-link--active {
        &::after {
          width: 100%;
        }
      }
    }
  }

  /* ELEMENT: __actions */
  .navbar__actions {
    display: flex;
    align-items: center;
    gap: 16px;

    /* ELEMENT: __search */
    .navbar__search {
      display: flex;
      align-items: center;
      background-color: $bg-light;
      border-radius: 4px;
      padding: 8px 12px;
      gap: 8px;

      /* ELEMENT: __search-input */
      .navbar__search-input {
        border: none;
        outline: none;
        background: transparent;
        font-size: 12px;
        font-family: $font-family-poppins;
        color: $text-gray;
        width: 180px;

        &::placeholder {
          color: #999999;
        }
      }

      /* ELEMENT: __search-btn */
      .navbar__search-btn {
        background: none;
        border: none;
        cursor: pointer;
        transition: opacity $transition-default;

        &:hover {
          opacity: 0.6;
        }

        .navbar__search-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  /* ELEMENT: __action-btn */
  .navbar__action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $transition-default, opacity $transition-default;

    &:hover {
      transform: scale(1.1);
      opacity: 0.7;
    }

    .navbar__action-icon {
      width: 24px;
      height: 24px;
    }
  }

  /* ELEMENT: __toggle (mobile hamburger) */
  .navbar__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    .navbar__toggle-bar {
      width: 24px;
      height: 2px;
      background-color: $primary-black;
      border-radius: 2px;
      transition: all $transition-default;
    }
  }

  /* ELEMENT: __mobile-menu */
  .navbar__mobile-menu {
    display: none;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s ease;
    background-color: $primary-white;

    /* MODIFIER: --open */
    &.navbar__mobile-menu--open {
      max-height: 300px;
    }

    .navbar__mobile-list {
      list-style: none;
      padding: 0 24px 16px;
      margin: 0;

      .navbar__mobile-item {
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }
      }

      .navbar__mobile-link {
        display: block;
        padding: 12px 0;
        color: $primary-black;
        text-decoration: none;
        font-size: 14px;
        transition: color $transition-default;

        &:hover {
          color: $accent-red;
        }
      }
    }
  }
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
  .navbar {
    .navbar__menu {
      display: none;
    }

    .navbar__actions {
      .navbar__search {
        display: none;
      }
    }

    .navbar__toggle {
      display: flex;
    }

    .navbar__mobile-menu {
      display: block;
    }
  }
}

@media (max-width: 480px) {
  .navbar {
    .navbar__actions {
      gap: 8px;
    }
  }
}
</style>
