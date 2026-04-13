import cartService from '@/services/cartService';

export default {
  namespaced: true,
  state: {
    cart: null,
    items: [],
    isCartOpen: false,
    isLoading: false,
    error: null,
  },
  mutations: {
    SET_CART(state, cart) {
      state.cart = cart;
      state.items = cart ? cart.products : [];
    },
    SET_ITEMS(state, items) {
      state.items = items;
    },
    TOGGLE_CART(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    OPEN_CART(state) {
      state.isCartOpen = true;
    },
    CLOSE_CART(state) {
      state.isCartOpen = false;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.items.find(i => i.id === productId);
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
      }
    },
    REMOVE_ITEM(state, productId) {
      state.items = state.items.filter(i => i.id !== productId);
    },
    ADD_ITEM(state, product) {
      const existing = state.items.find(i => i.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
        existing.total = existing.price * existing.quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: product.quantity || 1,
          total: product.price * (product.quantity || 1),
          thumbnail: product.thumbnail || (product.images && product.images[0]),
          discountPercentage: product.discountPercentage || 0,
          discountedTotal: product.price * (product.quantity || 1),
        });
      }
    },
  },
  actions: {
    async fetchCart({ commit }, userId = 6) {
      commit('SET_LOADING', true);
      try {
        const data = await cartService.getCartByUserId(userId);
        if (data.carts && data.carts.length > 0) {
          commit('SET_CART', data.carts[0]);
        }
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    toggleCart({ commit }) {
      commit('TOGGLE_CART');
    },
    openCart({ commit }) {
      commit('OPEN_CART');
    },
    closeCart({ commit }) {
      commit('CLOSE_CART');
    },
    updateQuantity({ commit }, { productId, quantity }) {
      if (quantity < 1) return;
      commit('UPDATE_ITEM_QUANTITY', { productId, quantity });
    },
    removeItem({ commit }, productId) {
      commit('REMOVE_ITEM', productId);
    },
    addToCart({ commit }, product) {
      commit('ADD_ITEM', product);
      commit('OPEN_CART');
    },
  },
  getters: {
    cartItems: state => state.items,
    isCartOpen: state => state.isCartOpen,
    isLoading: state => state.isLoading,
    cartItemCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartSubtotal: state => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    cartTotal: state => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
};
