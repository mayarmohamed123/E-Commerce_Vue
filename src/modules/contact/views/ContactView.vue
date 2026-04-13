<template>
  <div class="contact-page container">
    <div class="contact-page__breadcrumb">
      <span class="contact-page__breadcrumb-home">Home</span>
      <span class="contact-page__breadcrumb-separator">/</span>
      <span>Contact</span>
    </div>

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
import defaultHeroImage from "@/assets/images/Frame 760.webp"; 
export default {
  name: "ContactView",
  components: {
    ContactForm,
  },
  data() {
    return {
      heroImage: defaultHeroImage
    };
  }
};
</script>
