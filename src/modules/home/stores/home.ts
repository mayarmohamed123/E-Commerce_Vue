import { defineStore } from "pinia";
import productService from "@/services/productService";
import type { Product, HomeState } from "@/types";

/**
 * Home Store - Manages homepage data (flash sales, categories, explore section)
 */
export const useHomeStore = defineStore("home", {
  /**
   * Home Store State
   * @returns {HomeState} initial state
   */
  state: (): HomeState => ({
    /** Products showcased in the Flash Sales section */
    flashSales: [],
    /** Top categories displayed on the landing page */
    categories: [],
    /** Products displayed in the Explore section */
    exploreProducts: [],
    /** Loading indicator for parallel data fetching */
    isLoading: false,
    /** Error message if loading fails */
    error: null,
  }),

  getters: {
    /** Flash sale products */
    flashSalesProducts: (state): Product[] => state.flashSales,

    /** Product categories for display */
    productCategories: (state): string[] => state.categories,

    /** Products for explore section */
    exploreSectionProducts: (state): Product[] => state.exploreProducts,

    /** Loading state */
    loading: (state): boolean => state.isLoading,
  },

  actions: {
    /**
     * Fetch all homepage data in parallel
     * - Flash sales (4 products)
     * - Categories (top 5)
     * - Explore products (8 products, offset by 20)
     */
    async fetchHomeData(): Promise<void> {
      this.isLoading = true;
      this.error = null;
      try {
        // Fetch 4 products for Flash Sales
        const flashSalesData = await productService.getProductsPaginated(4, 0);
        this.flashSales = flashSalesData.products;

        // Fetch categories
        const categoriesData = await productService.getProductCategories();
        this.categories = categoriesData.slice(0, 5);

        // Fetch 8 products for Explore Products (skip 20 for variety)
        const exploreData = await productService.getProductsPaginated(8, 20);
        this.exploreProducts = exploreData.products;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
