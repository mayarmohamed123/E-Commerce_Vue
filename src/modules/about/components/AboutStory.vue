<template>
  <div class="about-story conatiner">
    <div class="about-story__content">
      <h2 class="about-story__title">Our Story</h2>
      <p class="about-story__subtitle">
        Launced in 2015, Exclusive is South Asia’s premier online shopping
        makterplace with an active presense in Bangladesh. Supported by wide
        range of tailored marketing, data and service solutions, Exclusive has
        10,500 sallers and 300 brands and serves 3 millioons customers across
        the region.
      </p>
      <p bout-story__subtitle>
        Exclusive has more than 1 Million products to offer, growing at a very
        fast. Exclusive offers a diverse assotment in categories ranging from
        consumer.
      </p>
    </div>

    <div class="about-story__images">
      <img :src="storyImage" alt="story image" class="about-story__image" />
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutStory",
  storyImage: require("@/assets/images/Side Image.webp"),
};
</script>
