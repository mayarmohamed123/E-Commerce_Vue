<template>
  <div class="about-team">
    <div class="about-team__grid">
      <div
        class="about-team__member"
        v-for="(member, index) in teamMembers"
        :key="index">
        <div class="about-team__image-wrapper">
          <img
            :src="member.image"
            :alt="member.name"
            class="about-team__image" />
        </div>
        <h3 class="about-team__name">{{ member.name }}</h3>
        <p class="about-team__role">{{ member.role }}</p>
        <div class="about-team__socials">
          <img :src="socialIcons.twitter" alt="Twitter" />
          <img :src="socialIcons.instagram" alt="Instagram" />
          <img :src="socialIcons.linkedin" alt="LinkedIn" />
        </div>
      </div>
    </div>

    <div class="about-team__pagination">
      <div class="about-team__dot"></div>
      <div class="about-team__dot"></div>
      <div class="about-team__dot about-team__dot--active"></div>
      <div class="about-team__dot"></div>
      <div class="about-team__dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import tomCruiseImg from "@/assets/images/Frame_874.webp";
import emmaWatsonImg from "@/assets/images/Frame_875.webp";
import willSmithImg from "@/assets/images/Frame_876.webp";
import twitterIcon from "@/assets/images/Icon-Twitter.svg";
import instagramIcon from "@/assets/images/icon-instagram.svg";
import linkedinIcon from "@/assets/images/Icon-Linkedin.svg";

/**
 * AboutTeam Component
 * Displays team members with their names, roles, and social media handles.
 */

/** Team member interface */
interface TeamMember {
  /** Full name of the member */
  name: string;
  /** Job title/role */
  role: string;
  /** URL to profile image */
  image: string;
}

/** Social icons interface */
interface SocialIcons {
  /** Twitter icon URL */
  twitter: string;
  /** Instagram icon URL */
  instagram: string;
  /** LinkedIn icon URL */
  linkedin: string;
}

/** List of featured team members */
const teamMembers: TeamMember[] = [
  { name: "Tom Cruise", role: "Founder & Chairman", image: tomCruiseImg },
  { name: "Emma Watson", role: "Managing Director", image: emmaWatsonImg },
  { name: "Will Smith", role: "Product Designer", image: willSmithImg },
];

/** Social media navigation icons */
const socialIcons: SocialIcons = {
  twitter: twitterIcon,
  instagram: instagramIcon,
  linkedin: linkedinIcon,
};
</script>
