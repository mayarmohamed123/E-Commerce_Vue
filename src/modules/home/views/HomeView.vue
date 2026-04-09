<template>
  <div class="home">
    <div class="container">
      <FlashSales :products="flashSales" />
      <HomeCategories :categories="categories" />
      <ExploreProducts :products="exploreProducts" />
      <HomeFeatures />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FlashSales from '../components/FlashSales.vue';
import HomeCategories from '../components/HomeCategories.vue';
import ExploreProducts from '../components/ExploreProducts.vue';
import HomeFeatures from '../components/HomeFeatures.vue';

export default {
  name: "HomeView",
  components: {
    FlashSales,
    HomeCategories,
    ExploreProducts,
    HomeFeatures
  },
  computed: {
    ...mapState('home', ['flashSales', 'categories', 'exploreProducts', 'isLoading'])
  },
  created() {
    this.fetchHomeData();
  },
  methods: {
    ...mapActions('home', ['fetchHomeData'])
  }
};
</script>
