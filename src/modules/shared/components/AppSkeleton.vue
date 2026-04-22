<template>
  <div
    class="app-skeleton"
    :class="[
      `app-skeleton--${variant}`,
      { 'app-skeleton--animated': animated }
    ]"
    :style="skeletonStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * AppSkeleton Component
 * Placeholder component for content loading states.
 */

/** Skeleton variant type */
type SkeletonVariant = 'text' | 'rect' | 'circle';

/** Props interface for AppSkeleton */
interface Props {
  /** Width of the skeleton (e.g., '100%', 200, '200px') */
  width?: string | number;
  /** Height of the skeleton (e.g., '20px', 50, '50px') */
  height?: string | number;
  /** Visual shape of the skeleton */
  variant?: SkeletonVariant;
  /** Whether to show pulse animation */
  animated?: boolean;
}

/** Define props with defaults */
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '20px',
  variant: 'text',
  animated: true
});

/** Computed CSS styles for the skeleton */
const skeletonStyle = computed(() => {
  const w = typeof props.width === 'number' ? `${props.width}px` : props.width;
  const h = typeof props.height === 'number' ? `${props.height}px` : props.height;
  return {
    width: w,
    height: h
  };
});
</script>
