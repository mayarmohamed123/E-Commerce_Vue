<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb__item"
        :class="{ 'breadcrumb__item--active': isLast(index) }"
      >
        <router-link
          v-if="item.to && !isLast(index)"
          :to="item.to"
          class="breadcrumb__link"
        >
          {{ item.label }}
        </router-link>
        <span
          v-else
          class="breadcrumb__current"
          :aria-current="isLast(index) ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
/**
 * AppBreadcrumb Component
 * Navigation aid that shows the user's location in the application hierarchy.
 */

/** Breadcrumb item interface */
interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  label: string;
  /** Link target for the breadcrumb (optional) */
  to?: string | object;
}

/** Props interface for AppBreadcrumb */
interface Props {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
}

const props = defineProps<Props>();

/**
 * Check if the given index is the last item in the breadcrumb list
 * @param index - Item index to check
 * @returns True if it's the last item
 */
const isLast = (index: number): boolean => {
  return index === props.items.length - 1;
};
</script>
