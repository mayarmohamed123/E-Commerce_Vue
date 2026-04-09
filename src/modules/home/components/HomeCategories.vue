<template>
  <section class="home__section home-categories">
    <SectionHeader subtitle="Categories" title="Browse By Category" :showArrows="true" />
    <div class="category-grid">
      <div class="category-card" v-for="(category, index) in categories" :key="index">
        <span class="category-name">{{ category }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/modules/shared/components/SectionHeader.vue';

export default {
  name: "HomeCategories",
  components: {
    SectionHeader
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>
