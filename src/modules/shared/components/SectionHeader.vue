<template>
  <div class="section-header">
    <div class="section-header__top">
      <div class="section-header__indicator"></div>
      <span class="section-header__subtitle">{{ subtitle }}</span>
    </div>
    <div class="section-header__bottom">
      <h2 class="section-header__title">{{ title }}</h2>
      <div v-if="showArrows" class="section-header__arrows">
        <button class="icon-button" @click="$emit('prev')">
          <img :src="arrowLeftIcon" alt="prev" class="icon-button__icon" />
        </button>
        <button class="icon-button" @click="$emit('next')">
          <img :src="arrowRightIcon" alt="next" class="icon-button__icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showArrows: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      arrowLeftIcon: require("@/assets/images/icons_arrow-left.svg"),
      arrowRightIcon: require("@/assets/images/icons arrow-right.svg"),
    };
  },
};
</script>
