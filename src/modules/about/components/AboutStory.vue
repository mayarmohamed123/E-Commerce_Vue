<template>
  <div class="about-story__container">
    <!-- Breadcrumb -->
    <AppBreadcrumb :items="breadcrumbItems" />

    <div class="about-story">
      <div class="about-story__content">
        <h2 class="about-story__title">Our Story</h2>
        <p class="about-story__subtitle">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p class="about-story__subtitle">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>

      <div class="about-story__images">
        <img :src="storyImage" alt="story image" class="about-story__image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import storyImg from "@/assets/images/Side Image.webp";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";

/**
 * AboutStory Component
 * Displays the company story and mission statement with an accompanying image.
 */

/** Breadcrumb item type */
interface BreadcrumbItem {
  /** Label for the breadcrumb item */
  label: string;
  /** Optional link path for navigation */
  to?: string;
}

/** Story image asset */
const storyImage: string = storyImg;

/** Breadcrumb navigation items */
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", to: "/" },
  { label: "About" },
];
</script>
