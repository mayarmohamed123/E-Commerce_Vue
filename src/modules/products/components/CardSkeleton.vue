<template>
  <div class="product-skeleton">
    <div class="product-skeleton__image-wrapper">
      <app-skeleton variant="rect" height="250px" />
    </div>
    <div class="product-skeleton__content">
      <app-skeleton variant="text" width="80%" height="20px" />
      <app-skeleton variant="text" width="60%" height="16px" />
      <div class="product-skeleton__footer">
        <app-skeleton variant="text" width="40%" height="24px" />
        <app-skeleton variant="rect" width="32px" height="32px" />
      </div>
    </div>
  </div>
</template>

<script>
import AppSkeleton from '@/modules/shared/components/AppSkeleton.vue';

export default {
  name: 'CardSkeleton',
  components: {
    AppSkeleton
  }
};
</script>
