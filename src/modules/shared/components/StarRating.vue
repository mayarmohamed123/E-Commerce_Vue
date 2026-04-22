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
    <span v-if="props.reviews !== undefined" class="star-rating__count">
      ({{ props.reviews }})
    </span>
  </div>
</template>
<script setup lang="ts">
import vectorIcon from "@/assets/images/Vector.svg";
import starHalfIcon from "@/assets/images/star-half-filled.svg";
import emptyStarIcon from "@/assets/images/Empty_Star.svg";

/**
 * Props interface for StarRating component
 */
interface Props {
  /** Numeric rating value (0-5) */
  rating: number;
  /** Optional number of reviews */
  reviews?: number;
}

/**
 * StarRating Component
 * Displays a 5-star rating visual based on numeric rating
 */
const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  reviews: undefined,
});


/**
 * Get the appropriate star icon for a given star position
 * @param star - Star position (1-5)
 * @returns Path to star icon image
 */
const getStarIcon = (star: number): string => {
  if (props.rating >= star) {
    return vectorIcon;
  } else if (props.rating >= star - 0.5) {
    return starHalfIcon;
  } else {
    return emptyStarIcon;
  }
};
</script>
