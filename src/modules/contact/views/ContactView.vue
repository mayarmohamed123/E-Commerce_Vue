<template>
  <div class="contact-page container">
    <AppBreadcrumb :items="breadcrumbItems" />

    <div class="contact-page__grid">
      <div class="contact-page__image-section">
        <img :src="heroImage" alt="Contact Us" class="contact-page__image" />
      </div>

      <div class="contact-page__form-section">
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "../components/ContactForm.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";
import defaultHeroImage from "@/assets/images/Frame 760.webp";

/**
 * ContactView Component
 * Main view for the contact page, combining breadcrumbs, hero image, and the contact form.
 */

/** Breadcrumb item interface */
interface BreadcrumbItem {
  /** Label for navigation link */
  label: string;
  /** Optional target path */
  to?: string;
}

/** Hero image asset for the contact section */
const heroImage: string = defaultHeroImage;

/** Breadcrumb navigation items */
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", to: "/" },
  { label: "Contact" },
];
</script>
