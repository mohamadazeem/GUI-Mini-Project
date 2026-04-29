<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Wishlist</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ totalWishlistItems }} {{ totalWishlistItems === 1 ? 'item' : 'items' }} saved
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
      <div v-if="wishlist.length === 0" class="flex flex-col items-center justify-center py-28">
        <div class="bg-pink-50 dark:bg-pink-900/30 rounded-full p-8 mb-6">
          <HeartIcon class="w-16 h-16 text-pink-400 dark:text-pink-500" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">Your wishlist is empty</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-sm">
          Save items you love so you don't lose them!
        </p>
        <router-link
          to="/"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Explore Products
        </router-link>
      </div>

      <!-- Wishlist Content -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TransitionGroup name="wishlist-item">
          <div
            v-for="item in wishlist"
            :key="item.id"
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 hover:shadow-md transition-all flex flex-col"
          >
            <!-- Product Image -->
            <div class="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 mb-4 group cursor-pointer" @click="$router.push(`/product/${item.id}`)">
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                @click.stop="removeFromWishlist(item.id)"
                class="absolute top-2 right-2 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-pink-500 hover:text-pink-600 hover:bg-white dark:hover:bg-slate-700 transition"
              >
                <HeartIcon class="w-5 h-5 fill-current" />
              </button>
            </div>

            <!-- Product Details -->
            <div class="flex-1 flex flex-col">
              <h3
                class="font-semibold text-slate-900 dark:text-white text-base line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                @click="$router.push(`/product/${item.id}`)"
              >
                {{ item.title }}
              </h3>
              <p class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mt-1">{{ item.category }}</p>
              
              <div class="mt-auto pt-4 flex items-center justify-between">
                <p class="text-lg font-bold text-slate-900 dark:text-white">
                  ${{ item.price.toFixed(2) }}
                </p>
                <button
                  @click="handleMoveToCart(item)"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <ShoppingCartIcon class="w-4 h-4" />
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HeartIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from 'lucide-vue-next';
import { useWishlist } from '../composables/useWishlist';
import { useCart } from '../composables/useCart';
import type { Product } from '../types';

const { wishlist, totalWishlistItems, removeFromWishlist } = useWishlist();
const { addToCart } = useCart();

const handleMoveToCart = (product: Product) => {
  addToCart(product);
  removeFromWishlist(product.id);
};
</script>

<style scoped>
.wishlist-item-enter-active,
.wishlist-item-leave-active {
  transition: all 0.3s ease;
}
.wishlist-item-enter-from,
.wishlist-item-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.wishlist-item-leave-active {
  position: absolute;
}
</style>
