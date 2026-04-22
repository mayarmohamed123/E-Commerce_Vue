import { defineStore } from "pinia";
import productService from "@/services/productService";
import type { Product, ProductsState } from "@/types";

/**
 * Products Store - Manages product catalog and related operations
 */
export const useProductsStore = defineStore("products", {
  /**
   * Initial Store State
   * @returns {ProductsState} initial state
   */
  state: (): ProductsState => ({
    /** List of products currently loaded in the catalog */
    products: [],
    /** Details of the product being currently viewed */
    currentProduct: null,
    /** Related products for the current selection */
    relatedProducts: [],
    /** Total number of products available on the server */
    total: 0,
    /** Number of products to skip (offset) for pagination */
    skip: 0,
    /** Number of products to fetch per request */
    limit: 12,
    /** Overall loading state for product operations */
    isLoading: false,
    /** Error message if an operation fails */
    error: null,
    /** Currently active category for filtering */
    activeCategory: null,
  }),

  getters: {
    /** Whether more products can be loaded */
    hasMore: (state): boolean =>
      !state.activeCategory && state.products.length < state.total,
  },

  actions: {
    /**
     * Fetch initial products for catalog
     */
    async fetchInitialProducts(): Promise<void> {
      this.isLoading = true;
      this.error = null;
      this.skip = 0;
      this.activeCategory = null;
      try {
        const data = await productService.getProductsPaginated(this.limit, 0);
        this.products = data.products;
        this.total = data.total;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Fetch products by category
     * Filters the catalog to show only products from the specified category.
     * @param {string} category - Category slug to filter by
     */
    async fetchProductsByCategory(category: string): Promise<void> {
      this.isLoading = true;
      this.error = null;
      this.skip = 0;
      this.activeCategory = category;
      try {
        const data = await productService.getProductsByCategory(category, 200);
        this.products = data.products;
        this.total = data.total;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Load more products (pagination)
     * Increments skip and appends new products to the existing list.
     */
    async loadMoreProducts(): Promise<void> {
      if (this.products.length >= this.total) return;

      const newSkip = this.skip + this.limit;
      this.isLoading = true;
      try {
        const data = await productService.getProductsPaginated(
          this.limit,
          newSkip,
        );
        this.products = [...this.products, ...data.products];
        this.skip = newSkip;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Fetch single product by ID
     * Sets the currentProduct state and returns the product data.
     * @param {number} id - Numeric ID of the product to fetch
     * @returns {Promise<Product | undefined>} The fetched product or undefined on failure
     */
    async fetchProductById(id: number): Promise<Product | undefined> {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await productService.getProductById(id);
        this.currentProduct = data;
        return data;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Fetch related products for a category
     * Fetches a small set of products from the same category for recommendation.
     * @param {string} category - Category slug
     */
    async fetchRelatedProducts(category: string): Promise<void> {
      try {
        const data = await productService.getProductsByCategory(category, 4);
        this.relatedProducts = data.products;
      } catch (error) {
        console.error("Error in fetchRelatedProducts:", error);
      }
    },
  },
});
