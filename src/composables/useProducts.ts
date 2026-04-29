import { ref } from 'vue';
import type { Product, ProductsResponse } from '../types';

export function useProducts() {
  const products = ref<Product[]>([]);
  const categories = ref<string[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Pagination or current product view state
  const currentProduct = ref<Product | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('https://dummyjson.com/products?limit=200');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data: ProductsResponse = await res.json();
      products.value = data.products;
    } catch (err: any) {
      error.value = err.message || 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      // the api returns array of objects inside arrays or strings depending on version, parsing it correctly:
      let parsedCategories = [];
      if (data.length > 0 && typeof data[0] === 'object') {
        parsedCategories = data.map((c: any) => c.slug || c.name);
      } else {
        parsedCategories = data;
      }
      categories.value = parsedCategories.slice(0, 24);
    } catch (err: any) {
      console.error('Failed fetching categories:', err);
    }
  };

  const fetchProductById = async (id: number | string) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      const data: Product = await res.json();
      currentProduct.value = data;
    } catch (err: any) {
      error.value = err.message || 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    currentProduct,
    fetchProducts,
    fetchCategories,
    fetchProductById,
  };
}
