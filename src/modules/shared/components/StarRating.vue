<template>
  <div class="star-rating">
    <div class="star-rating__stars">
      <img
        v-for="star in 5"
        :key="star"
        :src="getStarIcon(star)"
        alt="star"
        class="star-rating__star" />
    </div>
    <span></span>
  </div>
</template>
<script>
export default {
  name: "StarRating",
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
    },
  },
  methods: {
    getStarIcon(star) {
      if (this.rating >= star) {
        return require("@/assets/images/Vector.svg");
      } else if (this.rating >= star - 0.5) {
        return require("@/assets/images/star-half-filled.svg");
      } else {
        return require("@/assets/images/Empty_Star.svg");
      }
    },
  },
};
</script>
