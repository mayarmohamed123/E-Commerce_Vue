/**
 * Product Feature Types
 * @module types/products
 */

// ============================================================================
// Domain Models
// ============================================================================

/**
 * Product review
 */
export interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

/**
 * Product with all properties
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  images?: string[];
  description?: string;
  rating?: number;
  reviews?: Review[];
  discountPercentage?: number;
  originalPrice?: number;
  isNew?: boolean;
  category?: string;
  brand?: string;
  stock?: number;
  /** Optional quantity when adding to cart */
  quantity?: number;
  /** Optional total price for cart calculations */
  total?: number;
}

/**
 * Product category
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Paginated product response
 */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Category list response
 */
export type CategoriesResponse = string[];

/**
 * Products by category response
 */
export interface CategoryProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// ============================================================================
// Store State
// ============================================================================

/**
 * Products store state interface
 */
export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  relatedProducts: Product[];
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  activeCategory: string | null;
}

/**
 * Home store state interface
 */
export interface HomeState {
  flashSales: Product[];
  categories: string[];
  exploreProducts: Product[];
  isLoading: boolean;
  error: string | null;
}
