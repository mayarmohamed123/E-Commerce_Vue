<template>
  <section class="home__section home-hero-slide">
    <div class="home-hero-slide__content">
      <div class="home-hero-slide__brand">
        <img
          :src="assets.appleLogo"
          alt="Apple logo"
          class="home-hero-slide__brand-logo" />
        <span class="home-hero-slide__brand-text">iPhone 14 Series</span>
      </div>

      <h1 class="home-hero-slide__title">
        Up to 10%<br />
        off Voucher
      </h1>

      <router-link to="/products" class="home-hero-slide__link">
        <span class="home-hero-slide__link-text">Shop Now</span>
        <img
          :src="assets.arrowRight"
          alt="Arrow right"
          class="home-hero-slide__link-icon" />
      </router-link>
    </div>

    <div class="home-hero-slide__media">
      <img
        :src="assets.heroImage"
        alt="iPhone 14 Pro"
        class="home-hero-slide__image" />
    </div>

    <div class="home-hero-slide__pagination" aria-label="Hero slide pagination">
      <span class="home-hero-slide__dot"></span>
      <span class="home-hero-slide__dot"></span>
      <span class="home-hero-slide__dot home-hero-slide__dot--active"></span>
      <span class="home-hero-slide__dot"></span>
      <span class="home-hero-slide__dot"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import appleLogo from "@/assets/images/1200px-Apple_gray_logo 1.svg";
import heroImage from "@/assets/images/hero_endframe__cvklg0xk3w6e_large 2.webp";
import arrowRight from "@/assets/images/icons arrow-right.svg";

/** Slider assets type */
interface SliderAssets {
  appleLogo: string;
  heroImage: string;
  arrowRight: string;
}

/** Hero slide image assets */
const assets: SliderAssets = {
  appleLogo,
  heroImage,
  arrowRight,
};
</script>
