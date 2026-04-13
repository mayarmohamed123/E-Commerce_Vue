import productService from '@/services/productService';

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: null,
    relatedProducts: [],
    total: 0,
    skip: 0,
    limit: 12,
    isLoading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product;
    },
    SET_RELATED_PRODUCTS(state, products) {
      state.relatedProducts = products;
    },
    APPEND_PRODUCTS(state, products) {
      state.products = [...state.products, ...products];
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
    SET_SKIP(state, skip) {
      state.skip = skip;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchInitialProducts({ commit, state }) {
      commit('SET_LOADING', true);
      commit('SET_SKIP', 0);
      try {
        const data = await productService.getProductsPaginated(state.limit, 0);
        commit('SET_PRODUCTS', data.products);
        commit('SET_TOTAL', data.total);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async loadMoreProducts({ commit, state }) {
      if (state.products.length >= state.total) return; // All loaded
      
      const newSkip = state.skip + state.limit;
      commit('SET_LOADING', true);
      try {
        const data = await productService.getProductsPaginated(state.limit, newSkip);
        commit('APPEND_PRODUCTS', data.products);
        commit('SET_SKIP', newSkip);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchProductById({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        const data = await productService.getProductById(id);
        commit('SET_CURRENT_PRODUCT', data);
        return data;
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchRelatedProducts({ commit }, category) {
      try {
        const data = await productService.getProductsByCategory(category, 4);
        commit('SET_RELATED_PRODUCTS', data.products);
      } catch (error) {
        console.error('Error in fetchRelatedProducts:', error);
      }
    }
  },
  getters: {
    allProducts: state => state.products,
    currentProduct: state => state.currentProduct,
    relatedProducts: state => state.relatedProducts,
    isLoading: state => state.isLoading,
    hasMore: state => state.products.length < state.total
  }
};
