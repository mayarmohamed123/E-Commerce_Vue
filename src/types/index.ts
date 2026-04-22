/**
 * Root Type Definitions Index
 * Re-exports all feature-based types for centralized imports
 * @module types
 */

// ============================================================================
// Cart Feature Types
// ============================================================================
export type {
  Cart,
  CartItem,
  CartState,
  CartsResponse,
  SingleCartResponse,
} from "./cart";

// ============================================================================
// Product Feature Types
// ============================================================================
export type {
  Product,
  Review,
  Category,
  ProductsResponse,
  CategoriesResponse,
  CategoryProductsResponse,
  ProductsState,
  HomeState,
} from "./products";

// ============================================================================
// Shims for Vue/Asset files (kept in separate file)
// ============================================================================
import "./shims-vue";
