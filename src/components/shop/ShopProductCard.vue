<template>
  <div 
    class="group bg-white dark:bg-[#161B22] rounded-[2rem] p-4 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full border border-slate-100 dark:border-white/5 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/20"
    @click="$emit('quick-view', product)"
  >
    <!-- IMAGE CONTAINER -->
    <div class="relative aspect-square rounded-[1.5rem] bg-slate-50 dark:bg-white/5 overflow-hidden mb-5 p-6 flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-colors duration-500">
      <img :src="product.thumbnail" :alt="product.title"
        class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700" />
      
      <!-- DISCOUNT TAG -->
      <div v-if="product.discountPercentage" 
           class="absolute top-3 left-3 bg-indigo-600 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg shadow-indigo-600/20">
        -{{ Math.round(product.discountPercentage) }}%
      </div>

      <!-- WISHLIST BUTTON -->
      <button @click.stop="toggleWishlist(product)"
        class="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-xl text-slate-300 hover:text-indigo-600 transition-colors z-10 border border-white/10">
        <HeartIcon class="w-4 h-4" :class="{'fill-indigo-600 text-indigo-600': isInWishlist(product.id)}" />
      </button>

      <!-- ADD TO CART BUTTON (Minimalist) -->
      <button @click.stop="$emit('add-to-cart', product)"
        class="absolute bottom-3 right-3 p-3.5 bg-slate-800 dark:bg-indigo-600 text-white rounded-2xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-indigo-700">
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- CONTENT -->
    <div class="px-1 flex flex-col flex-1">
      <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{{ product.category }}</p>
      <h3 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-4 group-hover:text-indigo-600 transition-colors tracking-tight">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-between mt-auto">
        <span class="text-lg font-black text-slate-900 dark:text-white">LKR {{ (product.price * 300).toLocaleString() }}</span>
        <div class="flex items-center gap-1">
          <StarIcon class="w-3 h-3 fill-amber-400 text-amber-400" />
          <span class="text-[10px] font-bold text-slate-400">{{ product.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, HeartIcon, StarIcon } from 'lucide-vue-next';
import type { Product } from '../../types';
import { useWishlist } from '../../composables/useWishlist';

const { toggleWishlist, isInWishlist } = useWishlist();

defineProps<{
  product: Product;
  tag?: string;
}>();

defineEmits(['quick-view', 'add-to-cart']);
</script>

<style scoped>
</style>
