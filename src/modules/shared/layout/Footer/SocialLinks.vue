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

<script setup lang="ts">
import { ref } from "vue";
import facebookIcon from "@/assets/images/Icon-Facebook.svg";
import twitterIcon from "@/assets/images/Icon-Twitter.svg";
import instagramIcon from "@/assets/images/icon-instagram.svg";
import linkedinIcon from "@/assets/images/Icon-Linkedin.svg";

/** Social link interface */
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

/** Social media links */
const socials = ref<SocialLink[]>([
  {
    name: "Facebook",
    url: "#",
    icon: facebookIcon,
  },
  {
    name: "Twitter",
    url: "#",
    icon: twitterIcon,
  },
  {
    name: "Instagram",
    url: "#",
    icon: instagramIcon,
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: linkedinIcon,
  },
]);
</script>

<style lang="scss"></style>
