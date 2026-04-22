import apiClient from "./http";
import type { CartsResponse, SingleCartResponse } from "@/types";

/**
 * Cart product payload for API operations
 */
interface CartProductPayload {
  id: number;
  quantity: number;
}

/**
 * Cart Service - Handles all cart-related API operations
 */
export const cartService = {
  /**
   * Get cart by user ID
   * @param userId - User ID
   * @returns Promise with carts response
   */
  async getCartByUserId(userId: number): Promise<CartsResponse> {
    try {
      const response = await apiClient.get<CartsResponse>(
        `/carts/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching cart for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Get cart by cart ID
   * @param cartId - Cart ID
   * @returns Promise with single cart
   */
  async getCartById(cartId: number): Promise<SingleCartResponse> {
    try {
      const response = await apiClient.get<SingleCartResponse>(
        `/carts/${cartId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching cart ${cartId}:`, error);
      throw error;
    }
  },

  /**
   * Add a new cart
   * @param userId - User ID
   * @param products - Products to add
   * @returns Promise with created cart
   */
  async addCart(
    userId: number,
    products: CartProductPayload[],
  ): Promise<SingleCartResponse> {
    try {
      const response = await apiClient.post<SingleCartResponse>("/carts/add", {
        userId,
        products,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding cart:", error);
      throw error;
    }
  },

  /**
   * Update an existing cart
   * @param cartId - Cart ID
   * @param products - Updated products
   * @returns Promise with updated cart
   */
  async updateCart(
    cartId: number,
    products: CartProductPayload[],
  ): Promise<SingleCartResponse> {
    try {
      const response = await apiClient.put<SingleCartResponse>(
        `/carts/${cartId}`,
        {
          merge: false,
          products,
        },
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating cart ${cartId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a cart
   * @param cartId - Cart ID
   * @returns Promise with deletion result
   */
  async deleteCart(cartId: number): Promise<SingleCartResponse> {
    try {
      const response = await apiClient.delete<SingleCartResponse>(
        `/carts/${cartId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting cart ${cartId}:`, error);
      throw error;
    }
  },
};

export default cartService;
