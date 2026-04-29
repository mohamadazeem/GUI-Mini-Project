<template>
  <div>
    <!-- Backdrop overlay -->
    <div 
      v-if="isCartOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
      @click="toggleCart"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header -->
      <div class="px-4 py-6 sm:px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <ShoppingCartIcon class="w-6 h-6 mr-2" />
          Shopping Cart
        </h2>
        <button
          @click="toggleCart"
          class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
        >
          <span class="sr-only">Close panel</span>
          <XIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        <div v-if="cart.length === 0" class="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
          <ShoppingCartIcon class="w-16 h-16 mb-4 opacity-50" />
          <p class="text-lg font-medium">Your cart is empty</p>
          <p class="text-sm mt-1">Looks like you haven't added anything yet.</p>
          <button @click="toggleCart" class="mt-6 btn-primary">
            Start Shopping
          </button>
        </div>
        
        <ul v-else class="space-y-6">
          <li v-for="item in cart" :key="item.product.id" class="flex py-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <img
                :src="item.product.thumbnail"
                :alt="item.product.title"
                class="h-full w-full object-cover object-center"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-slate-900 dark:text-white">
                  <h3 class="line-clamp-2 pr-4">
                    {{ item.product.title }}
                  </h3>
                  <p class="ml-4">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                </div>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 uppercase text-xs">{{ item.product.category }}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <div class="flex items-center border border-slate-300 dark:border-slate-600 rounded-md">
                  <button @click="updateQuantity(item.product.id, item.quantity - 1)" class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-md transition-colors">
                    <MinusIcon class="w-3 h-3" />
                  </button>
                  <span class="px-3 py-1 font-medium text-slate-900 dark:text-white">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.product.id, item.quantity + 1)" class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-md transition-colors">
                    <PlusIcon class="w-3 h-3" />
                  </button>
                </div>

                <div class="flex">
                  <button
                    type="button"
                    @click="removeFromCart(item.product.id)"
                    class="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 flex items-center transition-colors"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div v-if="cart.length > 0" class="border-t border-slate-200 dark:border-slate-700 px-4 py-6 sm:px-6 bg-slate-50 dark:bg-slate-800/50">
        <div class="flex justify-between text-lg font-medium text-slate-900 dark:text-white mb-4">
          <p>Subtotal</p>
          <p class="text-indigo-600 dark:text-indigo-400 font-bold">${{ totalPrice.toFixed(2) }}</p>
        </div>
        <div class="mt-6">
          <button
            class="w-full btn-primary py-3 text-lg font-semibold flex justify-center items-center"
          >
            Checkout
          </button>
        </div>
        <div class="mt-4 flex justify-center text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            or
            <button
              type="button"
              class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              @click="toggleCart"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon, XIcon, PlusIcon, MinusIcon, Trash2Icon } from 'lucide-vue-next';
import { useCart } from '../composables/useCart';

const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, totalPrice } = useCart();
</script>
