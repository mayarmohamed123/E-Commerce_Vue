<template>
  <div class="contact-form">
    <div class="contact-form__info-section">
      <div class="contact-form__info-header">
        <div class="contact-form__icon-wrapper">
          <img :src="icons.phone" alt="phone" />
        </div>
        <h3 class="contact-form__title">Call us</h3>
      </div>
      <p class="contact-form__text">We are available 24/7, 7 days a week.</p>
      <p class="contact-form__text">Phone: +8801611112222</p>
    </div>
    
    <hr class="contact-form__divider" />
    
    <div class="contact-form__info-section">
      <div class="contact-form__info-header">
        <div class="contact-form__icon-wrapper">
          <img :src="icons.email" alt="email" />
        </div>
        <h3 class="contact-form__title">Write To US</h3>
      </div>
      <p class="contact-form__text">Fill out our form and we will contact you within 24 hours.</p>
      
      <form class="contact-form__form" @submit.prevent>
        <div class="contact-form__input-group">
          <input type="text" placeholder="Your Name *" class="contact-form__input" required />
          <input type="email" placeholder="Your Email *" class="contact-form__input" required />
        </div>
        <textarea placeholder="Your Massage" class="contact-form__textarea" rows="8"></textarea>
        <div class="contact-form__actions">
          <PrimaryButton type="submit">Send Massage</PrimaryButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/modules/shared/components/PrimaryButton.vue";
import phoneIcon from "@/assets/images/Phone.svg";
import emailIcon from "@/assets/images/emial.svg";

export default {
  name: "ContactForm",
  components: {
    PrimaryButton
  },
  data() {
    return {
      icons: {
        phone: phoneIcon,
        email: emailIcon
      }
    };
  }
};
</script>
