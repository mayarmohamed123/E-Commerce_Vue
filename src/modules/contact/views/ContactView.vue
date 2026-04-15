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

<script>
import ContactForm from "../components/ContactForm.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";
import defaultHeroImage from "@/assets/images/Frame 760.webp";
export default {
  name: "ContactView",
  components: {
    ContactForm,
    AppBreadcrumb,
  },
  data() {
    return {
      heroImage: defaultHeroImage,
      breadcrumbItems: [
        { label: "Home", to: "/" },
        { label: "Contact" },
      ],
    };
  },
};
</script>
