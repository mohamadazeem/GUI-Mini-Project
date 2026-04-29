<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-10 px-4">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Shopping Cart</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }} in your cart
          </p>
        </div>
        <router-link
          to="/"
          class="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-1" />
          Continue Shopping
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="cart.length === 0" class="flex flex-col items-center justify-center py-28">
        <div class="bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-8 mb-6">
          <ShoppingCartIcon class="w-16 h-16 text-indigo-400 dark:text-indigo-500" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">Your cart is empty</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-sm">
          Looks like you haven't added anything yet. Explore our products and find something you love!
        </p>
        <router-link
          to="/"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Start Shopping
        </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup name="cart-item" tag="div" class="space-y-4">
            <div
              v-for="item in cart"
              :key="item.product.id"
              class="flex gap-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
            >
              <!-- Product Image -->
              <div class="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                <img
                  :src="item.product.thumbnail"
                  :alt="item.product.title"
                  class="h-full w-full object-cover object-center"
                />
              </div>

              <!-- Product Details -->
              <div class="flex flex-1 flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div>
                    <h3
                      class="font-semibold text-slate-900 dark:text-white text-base line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.title }}
                    </h3>
                    <p class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mt-1">{{ item.product.category }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Rs. {{ (item.product.price * 300).toLocaleString() }} each</p>
                  </div>
                  <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400 ml-4 whitespace-nowrap">
                    Rs. {{ (item.product.price * item.quantity * 300).toLocaleString() }}
                  </p>
                </div>

                <!-- Quantity + Remove -->
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                    <button
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                      class="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <MinusIcon class="w-3.5 h-3.5" />
                    </button>
                    <span class="px-4 py-1.5 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 text-sm">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <PlusIcon class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    @click="removeFromCart(item.product.id)"
                    class="flex items-center text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors gap-1"
                  >
                    <Trash2Icon class="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Clear Cart -->
          <div class="flex justify-end pt-2">
            <button
              @click="clearCart"
              class="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
            >
              <Trash2Icon class="w-4 h-4" />
              Clear all items
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sticky top-24">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-5">Order Summary</h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>Rs. {{ (totalPrice * 300).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span class="text-green-500 font-medium">Free</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax (8%)</span>
                <span>Rs. {{ (totalPrice * 0.08 * 300).toLocaleString() }}</span>
              </div>
            </div>

            <div class="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span class="text-indigo-600 dark:text-indigo-400 text-lg">Rs. {{ (totalPrice * 1.08 * 300).toLocaleString() }}</span>
            </div>

            <!-- Promo Code -->
            <div class="mt-5">
              <div class="flex gap-2">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Promo code"
                  class="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <button 
              @click="$router.push('/checkout')"
              :disabled="cart.length === 0"
              class="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCardIcon class="w-5 h-5" />
              Proceed to Checkout
            </button>

            <div class="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <ShieldCheckIcon class="w-4 h-4" />
              <span>Secure & encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ShoppingCartIcon,
  ArrowLeftIcon,
  Trash2Icon,
  PlusIcon,
  MinusIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from 'lucide-vue-next';
import { useCart } from '../composables/useCart';

const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
const promoCode = ref('');
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
