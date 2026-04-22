<template>
  <div class="not-found-page container">
    <AppBreadcrumb :items="breadcrumbItems" />

    <div class="not-found-page__content">
      <h1 class="not-found-page__title">404 Not Found</h1>
      <p class="not-found-page__description">Your visited page not found. You may go home page.</p>
      <PrimaryButton @click="$router.push('/')" class="not-found-page__button">
        Back to home page
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/modules/shared/components/PrimaryButton.vue";
import AppBreadcrumb from "@/modules/shared/components/AppBreadcrumb.vue";

/**
 * NotFoundView Component
 * Standard 404 error page displayed when a route is not matched.
 */

/** Breadcrumb navigation items for the 404 page */
const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "404 Error" },
];
</script>

<style lang="scss"></style>