<template>
  <div class="social-links">
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Facebook.svg')"
        alt="Facebook"
        class="social-links__icon" />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Twitter.svg')"
        alt="Twitter"
        class="social-links__icon" />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/icon-instagram.svg')"
        alt="Instagram"
        class="social-links__icon" />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Linkedin.svg')"
        alt="LinkedIn"
        class="social-links__icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: "SocialLinks",
};
</script>

<style lang="scss"></style>
