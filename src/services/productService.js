import apiClient from './http';

export const productService = {

  async getAllProducts() {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  async getProductsPaginated(limit = 10, skip = 10) {
    try {
      const response = await apiClient.get('/products', {
        params: {
          limit,
          skip,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paginated products:', error);
      throw error;
    }
  },

  async getProductCategories() {
    try {
      const response = await apiClient.get('/products/category-list');
      return response.data;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      throw error;
    }
  }
};

export default productService;
