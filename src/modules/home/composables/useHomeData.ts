import { ref, onMounted } from "vue";
import productService from "@/services/productService";
import type { Product } from "@/types";

/**
 * Composable for managing Home page data.
 * This is used instead of a global store since the data is local to the Home view.
 */
export function useHomeData() {
  /** Products showcased in the Flash Sales section */
  const flashSales = ref<Product[]>([]);
  /** Top categories displayed on the landing page */
  const categories = ref<string[]>([]);
  /** Products displayed in the Explore section */
  const exploreProducts = ref<Product[]>([]);
  /** Loading indicator for parallel data fetching */
  const isLoading = ref(false);
  /** Error message if loading fails */
  const error = ref<string | null>(null);

  /**
   * Fetch all homepage data in parallel
   */
  async function fetchHomeData(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      // Fetch data in parallel for better performance
      const [flashSalesData, categoriesData, exploreData] = await Promise.all([
        productService.getProductsPaginated(4, 0),
        productService.getProductCategories(),
        productService.getProductsPaginated(8, 20),
      ]);

      flashSales.value = flashSalesData.products;
      categories.value = categoriesData.slice(0, 5);
      exploreProducts.value = exploreData.products;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      console.error("Error fetching home data:", err);
    } finally {
      isLoading.value = false;
    }
  }

  // Fetch data immediately when the component using this composable is mounted
  onMounted(() => {
    fetchHomeData();
  });

  return {
    flashSales,
    categories,
    exploreProducts,
    isLoading,
    error,
    fetchHomeData,
  };
}
