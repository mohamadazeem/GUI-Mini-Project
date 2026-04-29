<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
    
    <div class="mb-10 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 mb-4 inline-block">
        🔥 Exclusive Deals
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Don't miss out on these limited-time offers. Get your favorite products at unbelievable prices!
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
      <AlertCircleIcon class="h-10 w-10 mb-3" />
      <p class="text-lg font-medium">Unable to load deals right now.</p>
      <p class="text-sm mt-1 opacity-80">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="deals.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
      <div class="bg-slate-100 dark:bg-slate-800 rounded-full p-6 mb-4">
        <TagIcon class="h-12 w-12 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Deals Available</h3>
      <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        We currently don't have any discounted products. Check back later for amazing offers!
      </p>
      <router-link to="/" class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">
        Continue Shopping
      </router-link>
    </div>

    <!-- Deals Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in deals" 
        :key="product.id"
        class="group flex flex-col h-full cursor-pointer relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        @click="$router.push(`/product/${product.id}`)"
      >
        <!-- Top Badges -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <div class="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 backdrop-blur-sm bg-red-500/90">
            <span>🔥 Sale</span>
          </div>
          <div class="bg-slate-900/80 dark:bg-white/90 dark:text-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-sm">
            -{{ Math.round(product.discountPercentage) }}%
          </div>
        </div>

        <button 
          @click.stop="toggleWishlist(product)"
          class="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full text-slate-400 hover:text-pink-500 transition shadow-sm z-10"
          title="Add to Wishlist ❤️"
        >
          <HeartIcon class="w-5 h-5 transition-colors" :class="{'fill-pink-500 text-pink-500': isInWishlist(product.id)}" />
        </button>

        <div class="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-700 overflow-hidden flex items-center justify-center p-4">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div class="p-5 flex flex-col flex-grow">
          <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {{ product.category }}
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 text-lg leading-tight" :title="product.title">
            {{ product.title }}
          </h3>
          
          <div class="mt-auto pt-4 flex items-end justify-between border-t border-slate-100 dark:border-slate-700/50">
            <div>
              <p class="text-sm text-slate-400 dark:text-slate-500 line-through decoration-red-400 decoration-1 mb-0.5">
                Rs. {{ ((product.price / (1 - (product.discountPercentage / 100))) * 300).toLocaleString() }}
              </p>
              <span class="text-2xl font-black text-red-600 dark:text-red-400">
                Rs. {{ (product.price * 300).toLocaleString() }}
              </span>
            </div>
            
            <button
              @click.stop="addToCart(product)"
              class="flex items-center justify-center p-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors duration-300 shadow-sm"
              title="Add to Cart"
            >
              <ShoppingCartIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/useWishlist';
import { AlertCircleIcon, TagIcon, HeartIcon, ShoppingCartIcon } from 'lucide-vue-next';

const { products, loading, error, fetchProducts } = useProducts();
const { addToCart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

onMounted(() => {
  if (products.value.length === 0) {
    fetchProducts();
  }
});

const deals = computed(() => {
  // Filter products that have a discount >= 10% to represent "deals" clearly
  return products.value.filter(p => p.discountPercentage >= 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
