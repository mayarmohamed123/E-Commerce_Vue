import apiClient from './http';

export const cartService = {

  async getCartByUserId(userId) {
    try {
      const response = await apiClient.get(`/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cart for user ${userId}:`, error);
      throw error;
    }
  },

  async getCartById(cartId) {
    try {
      const response = await apiClient.get(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cart ${cartId}:`, error);
      throw error;
    }
  },

  async addCart(userId, products) {
    try {
      const response = await apiClient.post('/carts/add', {
        userId,
        products,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding cart:', error);
      throw error;
    }
  },

  async updateCart(cartId, products) {
    try {
      const response = await apiClient.put(`/carts/${cartId}`, {
        merge: false,
        products,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating cart ${cartId}:`, error);
      throw error;
    }
  },

  async deleteCart(cartId) {
    try {
      const response = await apiClient.delete(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting cart ${cartId}:`, error);
      throw error;
    }
  },
};

export default cartService;
