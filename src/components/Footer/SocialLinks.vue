<template>
  <div class="social-links">
    <a
      v-for="social in socials"
      :key="social.name"
      :href="social.url"
      class="social-links__link">
      <img :src="social.icon" :alt="social.name" class="social-links__icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: "SocialLinks",
  data() {
    return {
      socials: [
        {
          name: "Facebook",
          url: "#",
          icon: require("@/assets/images/Icon-Facebook.svg"),
        },
        {
          name: "Twitter",
          url: "#",
          icon: require("@/assets/images/Icon-Twitter.svg"),
        },
        {
          name: "Instagram",
          url: "#",
          icon: require("@/assets/images/icon-instagram.svg"),
        },
        {
          name: "LinkedIn",
          url: "#",
          icon: require("@/assets/images/Icon-Linkedin.svg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
