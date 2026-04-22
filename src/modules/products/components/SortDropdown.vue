<template>
  <div class="products-page__sort">
    <label for="products-sort" class="products-page__sort-label">Sort by</label>
    <select
      id="products-sort"
      :value="modelValue"
      @change="handleSortChange"
      class="products-page__sort-select"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
/**
 * SortDropdown Component
 * A custom select dropdown for sorting products.
 */

/** Props interface for SortDropdown */
interface Props {
  /** Array of sort options to display */
  options: string[];
  /** Current selected value (v-model) */
  modelValue: string;
}

defineProps<Props>();

/** Emits for SortDropdown */
const emit = defineEmits<{
  /** Emitted when selection changes (v-model update) */
  (e: 'update:modelValue', value: string): void;
}>();

/**
 * Handle change event safely for TypeScript
 * @param event - Change event from select element
 */
const handleSortChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};
</script>
