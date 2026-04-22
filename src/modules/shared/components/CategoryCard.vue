<template>
  <div
    class="category-card"
    :class="{ 'category-card--active': props.isActive }"
    @click="emit('click')">
    <div class="category-card__icon-wrapper">
      <img
        :src="getImageUrl(iconName)"
        :alt="props.category"
        class="category-card__icon" />
    </div>
    <span class="category-card__name">{{ props.category }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Props interface for CategoryCard
 */
interface Props {
  /** Category name display */
  category: string;
  /** Icon identifier */
  icon: string;
  /** Whether this category is active/selected */
  isActive?: boolean;
}

/** Component Props */
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

/** Define emits */
const emit = defineEmits<{
  (e: "click"): void;
}>();

/**
 * Icon mapping from identifier to filename
 */
const iconMap: Record<string, string> = {
  phone: "Category-CellPhone.svg",
  computer: "Category-Computer.svg",
  smartwatch: "Category-SmartWatch.svg",
  camera: "Category-Camera.svg",
  headphone: "Category-Headphone.svg",
  gaming: "Category-Gamepad.svg",
};

/** Computed icon filename */
const iconName = computed((): string => iconMap[props.icon] || props.icon);

/**
 * Get image URL for the icon
 * @param name - Icon filename
 */
const getImageUrl = (name: string): string => {
  return new URL(`../../../assets/images/${name}`, import.meta.url).href;
};
</script>
