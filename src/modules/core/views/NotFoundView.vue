<template>
  <div class="not-found-page container">
    <div class="not-found-page__breadcrumb">
      <router-link to="/" class="not-found-page__breadcrumb-home">Home</router-link>
      <span class="not-found-page__breadcrumb-separator">/</span>
      <span>404 Error</span>
    </div>

    <div class="not-found-page__content">
      <h1 class="not-found-page__title">404 Not Found</h1>
      <p class="not-found-page__description">Your visited page not found. You may go home page.</p>
      <PrimaryButton @click="$router.push('/')" class="not-found-page__button">
        Back to home page
      </PrimaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/modules/shared/components/PrimaryButton.vue";

export default {
  name: "NotFoundView",
  components: {
    PrimaryButton,
  },
};
</script>

<style lang="scss"></style>