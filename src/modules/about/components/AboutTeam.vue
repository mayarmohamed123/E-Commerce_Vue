<template>
  <div class="about-team">
    
    <div class="about-team__grid">
      <div class="about-team__member" v-for="(member, index) in teamMembers" :key="index">
        <div class="about-team__image-wrapper">
          <img :src="member.image" :alt="member.name" class="about-team__image" />
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

<script>
import tomCruiseImg from "@/assets/images/Frame 874.webp";
import emmaWatsonImg from "@/assets/images/Frame 875.webp";
import willSmithImg from "@/assets/images/Frame 876.webp";
import twitterIcon from "@/assets/images/Icon-Twitter.svg";
import instagramIcon from "@/assets/images/icon-instagram.svg";
import linkedinIcon from "@/assets/images/Icon-Linkedin.svg";

export default {
  name: "AboutTeam",
  data() {
    return {
      teamMembers: [
        { name: "Tom Cruise", role: "Founder & Chairman", image: tomCruiseImg },
        { name: "Emma Watson", role: "Managing Director", image: emmaWatsonImg },
        { name: "Will Smith", role: "Product Designer", image: willSmithImg }
      ],
      socialIcons: {
        twitter: twitterIcon,
        instagram: instagramIcon,
        linkedin: linkedinIcon
      }
    };
  }
};
</script>
