<template>
  <div class="about-page">
    <AboutStory />
    <AboutStats />
    <AboutTeam />
    <AppServices />
  </div>
</template>

<script>
import AboutStory from "../components/AboutStory.vue";
import AboutStats from "../components/AboutStats.vue";
import AboutTeam from "../components/AboutTeam.vue";
import AppServices from "../../shared/components/AppServices.vue";

export default {
  name: "AboutView",
  components: {
    AboutStory,
    AboutStats,
    AboutTeam,
    AppServices
  },
};
</script>
