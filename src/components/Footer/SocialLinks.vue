<template>
  <div class="social-links">
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Facebook.svg')"
        alt="Facebook"
        class="social-links__icon"
      />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Twitter.svg')"
        alt="Twitter"
        class="social-links__icon"
      />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/icon-instagram.svg')"
        alt="Instagram"
        class="social-links__icon"
      />
    </a>
    <a href="#" class="social-links__link">
      <img
        :src="require('@/assets/images/Icon-Linkedin.svg')"
        alt="LinkedIn"
        class="social-links__icon"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks',
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.social-links {
  display: flex;
  gap: 20px;
  margin-top: 8px;

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $transition-default, opacity $transition-default;

    &:hover {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    filter: invert(1);
  }
}
</style>
