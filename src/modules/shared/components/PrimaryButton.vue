<template>
  <button class="primary-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
/**
 * PrimaryButton Component
 * Reusable stylized button for main call-to-actions.
 */
defineEmits<{
  /** Emitted when button is clicked */
  (e: "click"): void;
}>();
</script>

