import { ref, computed, watch } from 'vue';
import type { Product } from '../types';
import { useToast } from './useToast';

const wishlist = ref<Product[]>([]);

// Initialize wishlist from localStorage
const storedWishlist = localStorage.getItem('ecommerce_wishlist');
if (storedWishlist) {
  try {
    wishlist.value = JSON.parse(storedWishlist);
  } catch (e) {
    console.error('Failed to parse wishlist from localStorage', e);
  }
}

// Watch wishlist and update localStorage
watch(
  wishlist,
  (newWishlist) => {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(newWishlist));
  },
  { deep: true }
);

export function useWishlist() {
  const addToWishlist = (product: Product) => {
    const { addToast } = useToast();
    const existing = wishlist.value.find((item) => item.id === product.id);
    if (!existing) {
      wishlist.value.push(product);
      addToast('Added to wishlist', 'success');
    }
  };

  const removeFromWishlist = (productId: number) => {
    const { addToast } = useToast();
    wishlist.value = wishlist.value.filter((item) => item.id !== productId);
    addToast('Removed from wishlist', 'info');
  };

  const toggleWishlist = (product: Product) => {
    const existing = wishlist.value.find((item) => item.id === product.id);
    if (existing) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.value.some((item) => item.id === productId);
  };

  const totalWishlistItems = computed(() => {
    return wishlist.value.length;
  });

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    totalWishlistItems,
  };
}
