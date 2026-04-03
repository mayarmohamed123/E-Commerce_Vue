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
          <li
            v-for="link in accountLinks"
            :key="link.path"
            class="footer__list-item">
            <router-link :to="link.path" class="footer__link">{{
              link.text
            }}</router-link>
          </li>
        </ul>
      </footer-column>

      <!-- Column 4: Quick Link -->
      <footer-column title="Quick Link">
        <ul class="footer__list">
          <li
            v-for="link in quickLinks"
            :key="link.path"
            class="footer__list-item">
            <router-link :to="link.path" class="footer__link">{{
              link.text
            }}</router-link>
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
              class="footer__qr-img" />
          </div>
          <div class="footer__stores">
            <a
              v-for="store in storeLinks"
              :key="store.name"
              :href="store.url"
              class="footer__store-link">
              <img
                :src="require(`@/assets/images/${store.icon}`)"
                :alt="store.name"
                class="footer__store-img" />
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
import FooterColumn from "./Footer/FooterColumn.vue";
import FooterNewsletter from "./Footer/FooterNewsletter.vue";
import SocialLinks from "./Footer/SocialLinks.vue";

export default {
  name: "TheFooter",
  components: {
    FooterColumn,
    FooterNewsletter,
    SocialLinks,
  },
  data() {
    return {
      accountLinks: [
        { text: "My Account", path: "/account" },
        { text: "Login / Register", path: "/login" },
        { text: "Cart", path: "/cart" },
        { text: "Wishlist", path: "/wishlist" },
        { text: "Shop", path: "/shop" },
      ],
      quickLinks: [
        { text: "Privacy Policy", path: "/privacy" },
        { text: "Terms Of Use", path: "/terms" },
        { text: "FAQ", path: "/faq" },
        { text: "Contact", path: "/contact" },
      ],
      storeLinks: [
        {
          name: "Google Play",
          url: "#",
          icon: "png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg",
        },
        {
          name: "App Store",
          url: "#",
          icon: "download-appstore.svg",
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
