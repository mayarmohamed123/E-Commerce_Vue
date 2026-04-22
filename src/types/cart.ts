/**
 * Cart Feature Types
 * @module types/cart
 */

// ============================================================================
// Domain Models
// ============================================================================

/**
 * Cart item representing a product in the shopping cart
 */
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail?: string;
  discountPercentage?: number;
  discountedTotal?: number;
}

/**
 * Shopping cart containing items and metadata
 */
export interface Cart {
  id: number;
  userId: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response from fetching carts by user
 */
export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Response from single cart operations
 */
export interface SingleCartResponse {
  id: number;
  userId: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

// ============================================================================
// Store State
// ============================================================================

/**
 * Cart store state interface
 */
export interface CartState {
  cart: Cart | null;
  items: CartItem[];
  isCartOpen: boolean;
  isLoading: boolean;
  error: string | null;
}
