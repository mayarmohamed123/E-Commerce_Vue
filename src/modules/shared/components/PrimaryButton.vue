<template>
  <button class="primary-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
};
</script>

