import Vue from 'vue';
import Vuex from 'vuex';

import home from '@/modules/home/store';
import products from '@/modules/products/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    products
  }
});
