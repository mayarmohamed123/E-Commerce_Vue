<template>
  <div class="home">
    <div class="container">
      <HomeSilder />
      <FlashSales :products="flashSales" :isLoading="isLoading" />
      <HomeCategories :categories="categories" />
      <ExploreProducts :products="exploreProducts" :isLoading="isLoading" />
      <AppServices />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FlashSales from '../components/FlashSales.vue';
import HomeCategories from '../components/HomeCategories.vue';
import ExploreProducts from '../components/ExploreProducts.vue';
import AppServices from '../../shared/components/AppServices.vue';
import HomeSilder from '../components/HomeSilder.vue';

export default {
  name: "HomeView",
  components: {
    HomeSilder,
    FlashSales,
    HomeCategories,
    ExploreProducts,
    AppServices
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
