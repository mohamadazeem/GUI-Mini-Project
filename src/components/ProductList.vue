<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="premium-card animate-pulse flex flex-col h-full">
        <div class="w-full aspect-square bg-slate-200 dark:bg-slate-700"></div>
        <div class="p-4 flex-grow space-y-3">
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div class="flex justify-between items-center pt-4">
            <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            <div class="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="products.length === 0" class="text-center py-16">
      <h3 class="text-xl font-medium text-slate-600 dark:text-slate-400">No products found for this search.</h3>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import type { Product } from '../types';

defineProps<{
  products: Product[];
  loading: boolean;
}>();
</script>
