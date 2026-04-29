import { ref, computed, watch } from 'vue';
import type { CartItem, Product } from '../types';
import { useToast } from './useToast';

const cart = ref<CartItem[]>([]);

// Initialize cart from localStorage
const storedCart = localStorage.getItem('ecommerce_cart');
if (storedCart) {
  try {
    cart.value = JSON.parse(storedCart);
  } catch (e) {
    console.error('Failed to parse cart from localStorage');
  }
}

// Watch cart and update localStorage
watch(
  cart,
  (newCart) => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(newCart));
  },
  { deep: true }
);


export function useCart() {
  const isCartOpen = ref(false);

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const addToCart = (product: Product) => {
    const { addToast } = useToast();
    const existing = cart.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.value.push({ product, quantity: 1 });
    }
    addToast('Added to cart', 'success');
  };

  const removeFromCart = (productId: number) => {
    const { addToast } = useToast();
    cart.value = cart.value.filter((item) => item.product.id !== productId);
    addToast('Removed from cart', 'info');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cart.value.find((item) => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  return {
    cart,
    isCartOpen,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}
