import apiClient from "./http";
import type {
  Product,
  ProductsResponse,
  CategoriesResponse,
  CategoryProductsResponse,
} from "@/types";

/**
 * Product Service - Handles all product-related API operations
 */
export const productService = {
  /**
   * Get all products
   * @returns Promise with all products
   */
  async getAllProducts(): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Promise with product
   */
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get paginated products
   * @param limit - Number of products to fetch
   * @param skip - Number of products to skip
   * @returns Promise with paginated products
   */
  async getProductsPaginated(
    limit: number = 10,
    skip: number = 10,
  ): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>("/products", {
        params: {
          limit,
          skip,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching paginated products:", error);
      throw error;
    }
  },

  /**
   * Get product categories list
   * @returns Promise with category names
   */
  async getProductCategories(): Promise<CategoriesResponse> {
    try {
      const response = await apiClient.get<CategoriesResponse>(
        "/products/category-list",
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product categories:", error);
      throw error;
    }
  },

  /**
   * Get products by category
   * @param category - Category name
   * @param limit - Number of products to fetch
   * @returns Promise with category products
   */
  async getProductsByCategory(
    category: string,
    limit: number = 4,
  ): Promise<CategoryProductsResponse> {
    try {
      const response = await apiClient.get<CategoryProductsResponse>(
        `/products/category/${category}`,
        {
          params: { limit },
        },
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },
};

export default productService;
