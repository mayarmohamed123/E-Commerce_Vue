<template>
  <div class="footer-column">
    <h3 class="footer-column__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FooterColumn',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.footer-column {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px 0;
    color: $primary-white;
    font-family: $font-family-poppins;
  }
}
</style>
