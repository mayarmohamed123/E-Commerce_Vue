<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Column 1: Exclusive / Newsletter -->
      <footer-column title="Exclusive">
        <footer-newsletter />
      </footer-column>

      <!-- Column 2: Support -->
      <footer-column title="Support">
        <address class="footer__address">
          111 Bijoy sarani, Dhaka,<br />
          DH 1515, Bangladesh.
        </address>
        <a href="mailto:exclusive@gmail.com" class="footer__link">
          exclusive@gmail.com
        </a>
        <a href="tel:+8801588888999" class="footer__link">
          +88015-88888-9999
        </a>
      </footer-column>

      <!-- Column 3: Account -->
      <footer-column title="Account">
        <ul class="footer__list">
          <li v-for="link in accountLinks" :key="link.path" class="footer__list-item">
            <router-link :to="link.path" class="footer__link">{{ link.text }}</router-link>
          </li>
        </ul>
      </footer-column>

      <!-- Column 4: Quick Link -->
      <footer-column title="Quick Link">
        <ul class="footer__list">
          <li v-for="link in quickLinks" :key="link.path" class="footer__list-item">
            <router-link :to="link.path" class="footer__link">{{ link.text }}</router-link>
          </li>
        </ul>
      </footer-column>

      <!-- Column 5: Download App -->
      <footer-column title="Download App">
        <p class="footer__text-small">Save $3 with App New User Only</p>
        <div class="footer__app">
          <div class="footer__qr">
            <img
              :src="require('@/assets/images/Qr Code.svg')"
              alt="QR Code"
              class="footer__qr-img"
            />
          </div>
          <div class="footer__stores">
            <a v-for="store in storeLinks" :key="store.name" :href="store.url" class="footer__store-link">
              <img
                :src="require(`@/assets/images/${store.icon}`)"
                :alt="store.name"
                class="footer__store-img"
              />
            </a>
          </div>
        </div>

        <!-- Social Icons Component -->
        <social-links />
      </footer-column>
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <p class="footer__copyright">
        &copy; Copyright Rimel 2022. All right reserved
      </p>
    </div>
  </footer>
</template>

<script>
import FooterColumn from './Footer/FooterColumn.vue';
import FooterNewsletter from './Footer/FooterNewsletter.vue';
import SocialLinks from './Footer/SocialLinks.vue';

export default {
  name: 'TheFooter',
  components: {
    FooterColumn,
    FooterNewsletter,
    SocialLinks,
  },
  data() {
    return {
      accountLinks: [
        { text: 'My Account', path: '/account' },
        { text: 'Login / Register', path: '/login' },
        { text: 'Cart', path: '/cart' },
        { text: 'Wishlist', path: '/wishlist' },
        { text: 'Shop', path: '/shop' },
      ],
      quickLinks: [
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms Of Use', path: '/terms' },
        { text: 'FAQ', path: '/faq' },
        { text: 'Contact', path: '/contact' },
      ],
      storeLinks: [
        {
          name: 'Google Play',
          url: '#',
          icon: 'png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg',
        },
        {
          name: 'App Store',
          url: '#',
          icon: 'download-appstore.svg',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

/* ========================================
   BLOCK: .footer
   ======================================== */
.footer {
  background-color: $primary-black;
  color: $secondary-white;
  font-family: $font-family-poppins;
  padding-top: 60px;

  /* ELEMENT: __container */
  .footer__container {
    max-width: $max-width-container;
    margin: 0 auto;
    padding: 0 $padding-container 40px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 40px;
  }

  /* ELEMENT: __address */
  .footer__address {
    font-style: normal;
    font-size: 14px;
    color: #cccccc;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  /* ELEMENT: __link */
  .footer__link {
    color: #cccccc;
    text-decoration: none;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
    display: block;
    transition: color $transition-default;

    &:hover {
      color: $accent-red;
    }
  }

  /* ELEMENT: __list */
  .footer__list {
    list-style: none;
    padding: 0;
    margin: 0;

    .footer__list-item {
      margin-bottom: 4px;
    }
  }

  /* ELEMENT: __text-small */
  .footer__text-small {
    font-size: 12px;
    color: #aaaaaa;
    margin: 0 0 12px 0;
    line-height: 1.5;
  }

  /* ELEMENT: __app */
  .footer__app {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;

    .footer__qr {
      .footer__qr-img {
        width: 76px;
        height: 76px;
      }
    }

    .footer__stores {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .footer__store-link {
        display: block;
        transition: opacity $transition-default;

        &:hover {
          opacity: 0.8;
        }

        .footer__store-img {
          width: 110px;
          height: auto;
        }
      }
    }
  }

  /* ELEMENT: __bottom */
  .footer__bottom {
    border-top: 1px solid #333333;
    text-align: center;
    padding: 20px $padding-container;

    .footer__copyright {
      font-size: 13px;
      color: $text-light;
      margin: 0;
    }
  }
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 1024px) {
  .footer {
    .footer__container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .footer {
    .footer__container {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    .footer__container {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }
}
</style>
