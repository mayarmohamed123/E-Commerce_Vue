<template>
  <div class="footer-column">
    <h3 class="footer-column__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FooterColumn",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">

</style>
