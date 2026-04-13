<template>
  <div class="about-story__container">
    <!-- Breadcrumb -->
    <div class="about-story__breadcrumb">
      <span class="about-story__breadcrumb-home">Home</span> 
      <span class="about-story__breadcrumb-separator">/</span> 
      <span>About</span>
    </div>

    <div class="about-story">
      <div class="about-story__content">
        <h2 class="about-story__title">Our Story</h2>
        <p class="about-story__subtitle">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p class="about-story__subtitle">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>

      <div class="about-story__images">
        <img :src="storyImage" alt="story image" class="about-story__image" />
      </div>
    </div>
  </div>
</template>

<script>
import storyImg from "@/assets/images/Side Image.webp";

export default {
  name: "AboutStory",
  data() {
    return {
      storyImage: storyImg
    };
  }
};
</script>
