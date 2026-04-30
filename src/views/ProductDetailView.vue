<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-slate-900 dark:text-slate-100 min-h-screen">
    
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 aspect-square bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
        <div class="w-full md:w-1/2 space-y-4 py-4">
          <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div class="h-10 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mt-6"></div>
          <div class="space-y-2 mt-8">
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-20">
      <div class="text-red-500 mb-4 bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
        <AlertCircleIcon class="w-12 h-12" />
      </div>
      <h2 class="text-2xl font-bold mb-2">Product Not Found</h2>
      <p class="text-slate-500 mb-6">{{ error }}</p>
      <button @click="$router.push('/')" class="btn-primary">
        Return to Home
      </button>
    </div>

    <!-- Content -->
    <div v-else-if="product" class="animate-fade-in flex flex-col md:flex-row gap-8 lg:gap-12">
      <!-- Image Gallery (Professional Horizontal Layout) -->
      <div class="w-full md:w-1/2 flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
        <!-- Main Product Image (Left) -->
        <div class="w-full md:flex-1 aspect-square bg-white dark:bg-slate-800 rounded-[3rem] p-8 flex items-center justify-center border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden group relative">
          <transition name="fade" mode="out-in">
            <img 
              :key="selectedImage || product.thumbnail"
              :src="selectedImage || product.thumbnail" 
              :alt="product.title"
              class="max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
          </transition>
        </div>
        
        <!-- Vertical Thumbnails (Right) -->
        <div v-if="displayImages.length > 0" class="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center">
          <button 
            v-for="(img, idx) in displayImages" 
            :key="idx" 
            @click="selectedImage = img"
            class="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl border-2 overflow-hidden transition-all duration-300 relative group"
            :class="selectedImage === img || (!selectedImage && idx === 0) ? 'border-sky-500 ring-4 ring-sky-500/20' : 'border-slate-100 dark:border-slate-700 hover:border-sky-300 opacity-80 hover:opacity-100'"
          >
            <img :src="img" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div 
              v-if="selectedImage === img || (!selectedImage && idx === 0)"
              class="absolute inset-0 bg-sky-500/5 pointer-events-none"
            ></div>
          </button>
        </div>
      </div>

      <!-- Details -->
      <div class="w-full md:w-1/2 flex flex-col py-2 md:py-6">
        <div class="mb-6">
          <div class="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mb-2">
            <span>{{ product.category }}</span>
            <span>&bull;</span>
            <span>{{ product.brand }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {{ product.title }}
          </h1>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
              <StarIcon class="w-5 h-5 text-yellow-500 fill-current mr-1" />
              <span class="font-bold text-yellow-700 dark:text-yellow-500">{{ product.rating.toFixed(1) }}</span>
            </div>
            <span class="text-slate-500 dark:text-slate-400">|</span>
            <span class="text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800/50">
              In Stock ({{ product.stock }})
            </span>
          </div>
        </div>

        <div class="mb-8">
          <div class="flex items-baseline space-x-4 mb-2">
            <span class="text-4xl font-black text-slate-900 dark:text-white">Rs. {{ (product.price * 300).toLocaleString() }}</span>
            <span v-if="product.discountPercentage > 0" class="text-xl text-slate-400 line-through">
              Rs. {{ ((product.price / (1 - product.discountPercentage / 100)) * 300).toLocaleString() }}
            </span>
          </div>
          <p v-if="product.discountPercentage > 0" class="text-sm font-bold text-red-500">
            Save {{ product.discountPercentage.toFixed(0) }}% today!
          </p>
        </div>

        <div class="prose prose-slate dark:prose-invert mb-8 text-slate-600 dark:text-slate-300">
          <p class="leading-relaxed text-lg">{{ product.description }}</p>
        </div>

        <div class="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="onAddToCart"
              class="flex-1 btn-primary py-4 px-8 text-lg font-bold flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40"
            >
              <ShoppingCartIcon class="w-6 h-6 mr-3" />
              Add to Cart
            </button>
            <button
              @click="onBuyNow"
              class="flex-1 py-4 px-8 text-lg font-bold flex items-center justify-center rounded-xl border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all shadow-sm hover:shadow-md"
            >
              <ZapIcon class="w-6 h-6 mr-3" />
              Buy Now
            </button>
            <button
              @click="onToggleWishlist"
              class="w-full sm:w-auto py-4 px-4 flex items-center justify-center rounded-xl border-2 transition-all shadow-sm hover:shadow-md"
              :class="isInWishlist(product.id) ? 'border-pink-500 text-pink-500 bg-pink-50 dark:bg-pink-900/30' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-pink-300 hover:text-pink-500'"
              title="Add to Wishlist ❤️"
            >
              <HeartIcon class="w-6 h-6 transition-colors" :class="{'fill-pink-500 text-pink-500': isInWishlist(product.id)}" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StarIcon, ShoppingCartIcon, AlertCircleIcon, ZapIcon, HeartIcon } from 'lucide-vue-next';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/useWishlist';

const route = useRoute();
const router = useRouter();
const { currentProduct: product, loading, error, fetchProductById } = useProducts();
const { addToCart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

const selectedImage = ref<string | null>(null);

// Ensure at least 2 thumbnails by combining images and thumbnail
const displayImages = computed(() => {
  if (!product.value) return [];
  
  const allImages = [product.value.thumbnail, ...(product.value.images || [])];
  const uniqueImages = [...new Set(allImages)].filter(img => img);
  
  // If still only 1 image, duplicate it to satisfy the "at least 2" requirement
  if (uniqueImages.length === 1) {
    return [uniqueImages[0], uniqueImages[0]];
  }
  
  return uniqueImages.slice(0, 3);
});

onMounted(() => {
  fetchProductById(route.params.id as string);
});

watch(product, (newVal) => {
  if (newVal) {
    selectedImage.value = displayImages.value[0];
  }
});

const onAddToCart = () => {
  if (product.value) {
    addToCart(product.value);
  }
};

const onBuyNow = () => {
  if (product.value) {
    addToCart(product.value);
    router.push('/cart');
  }
};

const onToggleWishlist = () => {
  if (product.value) {
    toggleWishlist(product.value);
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Image Switch Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
