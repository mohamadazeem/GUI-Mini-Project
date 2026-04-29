<template>
  <div class="group flex flex-col h-full cursor-pointer relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1" @click="goToDetail">
    
    <div class="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-700/50 overflow-hidden flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-700/50">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Discount Badge top-left -->
      <div
        v-if="product.discountPercentage"
        class="absolute top-0 left-0 z-10 bg-red-500 text-white font-extrabold text-sm px-3 py-1.5 rounded-br-2xl shadow-lg tracking-wide"
      >
        -{{ product.discountPercentage.toFixed(0) }}%
      </div>

      <!-- Wishlist Action -->
      <button 
        @click.stop="toggleWishlist(product)"
        class="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full text-slate-400 hover:text-pink-500 hover:scale-110 transition shadow-sm z-10"
        title="Add to Wishlist ❤️"
      >
        <HeartIcon class="w-5 h-5 transition-colors" :class="{'fill-pink-500 text-pink-500': isInWishlist(product.id)}" />
      </button>

      <!-- Rating Badge -->
      <div class="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-100 dark:border-slate-700">
        <StarIcon class="w-3.5 h-3.5 text-yellow-400 fill-current" />
        <span>{{ product.rating.toFixed(1) }}</span>
      </div>
    </div>
    
    <div class="p-5 flex flex-col flex-grow">
      <p class="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1.5">
        {{ product.category }}
      </p>
      
      <h3 class="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors min-h-[3.5rem]" :title="product.title">
        {{ product.title }}
      </h3>
      
      <div v-if="product.brand" class="flex flex-wrap items-center gap-2 text-xs mb-5">
        <span class="font-medium bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
          {{ product.brand }}
        </span>
      </div>
      
      <div class="flex justify-between items-end mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <div class="flex flex-col">
          <span class="text-xs text-slate-400 dark:text-slate-500 font-medium mb-0.5">Price</span>
          <span class="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Rs. {{ (product.price * 300).toLocaleString() }}
            </span>
        </div>
        
        <button
          @click.stop="onAddToCart"
          class="flex items-center justify-center p-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:shadow-md"
          title="Add to Cart"
        >
          <ShoppingCartIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ShoppingCartIcon, StarIcon, HeartIcon } from 'lucide-vue-next';
import type { Product } from '../types';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/useWishlist';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const { addToCart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

const goToDetail = () => {
  router.push(`/product/${props.product.id}`);
};

const onAddToCart = () => {
  addToCart(props.product);
};
</script>
