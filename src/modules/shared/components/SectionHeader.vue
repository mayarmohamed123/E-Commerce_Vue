<template>
  <div class="section-header">
    <div class="section-header__top">
      <div class="section-header__indicator"></div>
      <span class="section-header__subtitle">{{ props.subtitle }}</span>
    </div>
    <div class="section-header__bottom">
      <h2 class="section-header__title">{{ props.title }}</h2>
      <div v-if="props.showArrows" class="section-header__arrows">
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

<script setup lang="ts">
import arrowLeftIcon from "@/assets/images/icons_arrow-left.svg";
import arrowRightIcon from "@/assets/images/icons arrow-right.svg";

/** Props interface */
interface Props {
  subtitle: string;
  title: string;
  showArrows?: boolean;
}

/** Component Props */
const props = withDefaults(defineProps<Props>(), {
  showArrows: false,
});

/** Define emits */
defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>
