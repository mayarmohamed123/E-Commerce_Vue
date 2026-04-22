<template>
  <section class="home__section home-categories">
    <SectionHeader
      subtitle="Categories"
      title="Browse By Category"
      :showArrows="true" />
    <div class="category-grid">
      <router-link
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
        :to="{ name: 'Products', query: { category: category } }">
        <span class="category-name">{{ category }}</span>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from "@/modules/shared/components/SectionHeader.vue";

/** Props interface */
interface Props {
  /** Category names to display */
  categories: string[];
}

defineProps<Props>();
</script>
