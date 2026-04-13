import productService from "@/services/productService";

export default {
  namespaced: true,
  state: {
    flashSales: [],
    categories: [],
    exploreProducts: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    SET_FLASH_SALES(state, products) {
      state.flashSales = products;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_EXPLORE_PRODUCTS(state, products) {
      state.exploreProducts = products;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchHomeData({ commit }) {
      commit("SET_LOADING", true);
      try {
        // Fetch 4 products for Flash Sales
        const flashSalesData = await productService.getProductsPaginated(4, 0);
        commit("SET_FLASH_SALES", flashSalesData.products);

        // Fetch categories
        const categoriesData = await productService.getProductCategories();
        commit("SET_CATEGORIES", categoriesData.slice(0, 5)); // Take top 10 categories mapping to visual squares

        // Fetch 8 products for Explore Products
        const exploreData = await productService.getProductsPaginated(8, 20); // skip 20 to get different products
        commit("SET_EXPLORE_PRODUCTS", exploreData.products);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    flashSales: (state) => state.flashSales,
    categories: (state) => state.categories,
    exploreProducts: (state) => state.exploreProducts,
    isLoading: (state) => state.isLoading,
  },
};
