import { defineStore } from "pinia";
import { ref, computed } from "vue";
import cartService from "@/services/cartService";
import type { CartItem, Product, Cart } from "@/types";

/**
 * Cart Store - Manages shopping cart state and operations
 * USES SETUP STORE SYNTAX for better encapsulation of private state (like timers).
 */
export const useCartStore = defineStore("cart", () => {
  // --- CONFIGURATION ---
  const CART_UPDATE_DEBOUNCE_MS = 500;

  // --- STATE ---
  /** Raw cart data from API */
  const cart = ref<Cart | null>(null);
  /** List of flattened cart items */
  const items = ref<CartItem[]>([]);
  /** UI state: whether sliding cart panel is open */
  const isCartOpen = ref(false);
  /** Loading indicator for async actions */
  const isLoading = ref(false);
  /** Error message if any operation fails */
  const error = ref<string | null>(null);

  /** Internal timer for debounced API updates - properly encapsulated in setup closure */
  let _debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // --- GETTERS ---
  /** Cart items array */
  const cartItems = computed(() => items.value);
  /** Whether cart drawer is open */
  const cartOpen = computed(() => isCartOpen.value);
  /** Whether cart is loading */
  const loading = computed(() => isLoading.value);
  /** Total number of items in cart */
  const cartItemCount = computed(() =>
    items.value.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
  );
  /** Cart subtotal before discounts */
  const cartSubtotal = computed(() =>
    items.value.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0,
    ),
  );
  /** Cart total */
  const cartTotal = computed(() =>
    items.value.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0,
    ),
  );

  // --- ACTIONS ---

  /**
   * Fetch cart for a specific user
   * @param userId - User ID (default: 6)
   */
  async function fetchCart(userId: number = 6): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await cartService.getCartByUserId(userId);
      if (data.carts && data.carts.length > 0) {
        cart.value = data.carts[0];
        items.value = data.carts[0].products || [];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  }

  /** Toggle cart open/closed state */
  function toggleCart(): void {
    isCartOpen.value = !isCartOpen.value;
  }

  /** Open the cart */
  function openCart(): void {
    isCartOpen.value = true;
  }

  /** Close the cart */
  function closeCart(): void {
    isCartOpen.value = false;
  }

  /**
   * Sync current cart state to backend
   * Sends the current list of products and quantities to the dummyjson API.
   */
  async function syncCartToBackend(): Promise<void> {
    if (!cart.value || !cart.value.id) return;

    const productsPayload = items.value.map((item: CartItem) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      const updatedCart = await cartService.updateCart(
        cart.value.id,
        productsPayload,
      );
      cart.value = updatedCart;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    }
  }

  /**
   * Debounced cart sync to backend
   * Prevents excessive API calls during rapid quantity adjustments.
   */
  function debouncedSyncCart(): void {
    if (_debounceTimer) {
      clearTimeout(_debounceTimer);
    }
    _debounceTimer = setTimeout(() => {
      syncCartToBackend();
    }, CART_UPDATE_DEBOUNCE_MS);
  }

  /**
   * Update item quantity in cart
   * Calculates new totals and triggers a debounced sync to backend.
   * @param {number} productId - Unique ID of the product to update
   * @param {number} quantity - New target quantity (must be >= 1)
   */
  function updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) return;
    const item = items.value.find((i: CartItem) => i.id === productId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
    }
    debouncedSyncCart();
  }

  /**
   * Remove item from cart
   * Filters the items array to exclude the specified product ID.
   * @param {number} productId - ID of the item to purge from cart
   */
  function removeItem(productId: number): void {
    items.value = items.value.filter((i: CartItem) => i.id !== productId);
  }

  /**
   * Add product to cart
   * If product exists, increments quantity. Otherwise, creates a new CartItem.
   * Automatically opens the cart drawer upon addition.
   * @param {Product} product - Product object to add to cart
   */
  function addToCart(product: Product): void {
    const existing = items.value.find((i: CartItem) => i.id === product.id);
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
      items.value.push(newItem);
    }
    openCart();
  }

  return {
    // State
    cart,
    items,
    isCartOpen,
    isLoading,
    error,
    // Getters
    cartItems,
    cartOpen,
    loading,
    cartItemCount,
    cartSubtotal,
    cartTotal,
    // Actions
    fetchCart,
    toggleCart,
    openCart,
    closeCart,
    updateQuantity,
    debouncedSyncCart,
    syncCartToBackend,
    removeItem,
    addToCart,
  };
});
