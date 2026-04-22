import { defineStore } from "pinia";
import cartService from "@/services/cartService";
import type { CartItem, Product, Cart } from "@/types";

/**
 * Cart Store - Manages shopping cart state and operations
 * USES OPTIONS STORE SYNTAX for clear structure and standardization.
 */
export const useCartStore = defineStore("cart", {
  state: () => ({
    /** Raw cart data from API */
    cart: null as Cart | null,
    /** List of flattened cart items */
    items: [] as CartItem[],
    /** UI state: whether sliding cart panel is open */
    isCartOpen: false,
    /** Loading indicator for async actions */
    isLoading: false,
    /** Error message if any operation fails */
    error: null as string | null,
    /** Internal timer for debounced API updates */
    _debounceTimer: null as ReturnType<typeof setTimeout> | null,
  }),

  getters: {
    /** Total number of items in cart */
    cartItemCount: (state): number =>
      state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),

    /** Cart subtotal before discounts */
    cartSubtotal: (state): number =>
      state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0,
      ),

    /** 
     * Cart total 
     * Currently identical to subtotal, but separate for future logic (taxes, shipping, etc.)
     */
    cartTotal: (state): number =>
      state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0,
      ),
  },

  actions: {
    /**
     * Fetch cart for a specific user
     * @param userId - User ID (default: 6)
     */
    async fetchCart(userId: number = 6): Promise<void> {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await cartService.getCartByUserId(userId);
        if (data.carts && data.carts.length > 0) {
          this.cart = data.carts[0];
          this.items = data.carts[0].products || [];
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    /** Toggle cart open/closed state */
    toggleCart(): void {
      this.isCartOpen = !this.isCartOpen;
    },

    /** Open the cart */
    openCart(): void {
      this.isCartOpen = true;
    },

    /** Close the cart */
    closeCart(): void {
      this.isCartOpen = false;
    },

    /**
     * Sync current cart state to backend
     * Sends the current list of products and quantities to the dummyjson API.
     */
    async syncCartToBackend(): Promise<void> {
      if (!this.cart || !this.cart.id) return;

      const productsPayload = this.items.map((item: CartItem) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      try {
        const updatedCart = await cartService.updateCart(
          this.cart.id,
          productsPayload,
        );
        this.cart = updatedCart;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
      }
    },

    /**
     * Debounced cart sync to backend
     * Prevents excessive API calls during rapid quantity adjustments.
     */
    debouncedSyncCart(): void {
      if (this._debounceTimer) {
        clearTimeout(this._debounceTimer);
      }
      this._debounceTimer = setTimeout(() => {
        this.syncCartToBackend();
      }, 500); // 500ms debounce
    },

    /**
     * Update item quantity in cart
     * Calculates new totals and triggers a debounced sync to backend.
     * @param {number} productId - Unique ID of the product to update
     * @param {number} quantity - New target quantity (must be >= 1)
     */
    updateQuantity(productId: number, quantity: number): void {
      if (quantity < 1) return;
      const item = this.items.find((i: CartItem) => i.id === productId);
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
      }
      this.debouncedSyncCart();
    },

    /**
     * Remove item from cart
     * Filters the items array to exclude the specified product ID.
     * @param {number} productId - ID of the item to purge from cart
     */
    removeItem(productId: number): void {
      this.items = this.items.filter((i: CartItem) => i.id !== productId);
    },

    /**
     * Add product to cart
     * If product exists, increments quantity. Otherwise, creates a new CartItem.
     * Automatically opens the cart drawer upon addition.
     * @param {Product} product - Product object to add to cart
     */
    addToCart(product: Product): void {
      const existing = this.items.find((i: CartItem) => i.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
        existing.total = existing.price * existing.quantity;
      } else {
        const newItem: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: product.quantity || 1,
          total: product.price * (product.quantity || 1),
          thumbnail: product.thumbnail || (product.images && product.images[0]),
          discountPercentage: product.discountPercentage || 0,
          discountedTotal: product.price * (product.quantity || 1),
        };
        this.items.push(newItem);
      }
      this.openCart();
    },
  },
});
