<template>
  <div class="h-full flex overflow-hidden font-sans bg-[#F0F9FF] dark:bg-[#0B0E14] text-slate-900 dark:text-white">
    
    <!-- FIXED SIDEBAR -->
    <aside class="w-80 flex-shrink-0 h-full z-50">
      <ShopFilterPanel 
        :totalItems="filteredProducts.length"
        :types="categories"
        :selectedType="selectedCategory"
        v-model:searchQuery="localSearch"
        v-model:inStock="filterInStock"
        v-model:onSale="filterOnSale"
        v-model:maxPrice="filterMaxPrice"
        @selectType="selectCategory"
        @reset="clearFilters"
      />
    </aside>

    <!-- MAIN SCROLLABLE AREA -->
    <div class="flex-1 flex flex-col min-w-0 h-full relative">
      
      <!-- PRODUCT GALLERY -->
      <main class="flex-1 overflow-y-auto custom-scrollbar p-10 scroll-smooth">
        
        <!-- Loading state -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div v-for="i in 12" :key="i" class="animate-pulse bg-black/5 dark:bg-white/5 border border-transparent rounded-[2.5rem] h-[450px]"></div>
        </div>

        <!-- Product Grid (4 Columns) -->
        <div v-else-if="paginatedProducts.length > 0" 
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-max"
             id="products-grid">
          
          <ShopProductCard 
            v-for="(product, index) in paginatedProducts" 
            :key="product.id"
            :product="product"
            :tag="getProductTag(index)"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${(index % 12) * 40}ms` }"
            @quick-view="goToProduct(product.id)"
            @add-to-cart="addToCart(product)"
          />
          
        </div>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center justify-center py-40 text-center">
          <div class="w-24 h-24 mb-8 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5">
            <GhostIcon class="w-10 h-10 text-[var(--accent-color)] opacity-40" />
          </div>
          <h3 class="text-3xl font-black mb-3 uppercase tracking-tighter">No items found</h3>
          <p class="opacity-40 mb-10 max-w-xs text-sm font-bold uppercase tracking-widest leading-loose">Adjust your criteria to reveal more premium products.</p>
          <button @click="clearFilters" class="px-10 py-4 bg-[var(--accent-color)] text-white font-black rounded-2xl hover:scale-105 transition-all uppercase text-[10px] tracking-widest shadow-xl shadow-[var(--accent-color)]/20">
            Clear Selection
          </button>
        </div>

        <!-- Infinite scroll bottom padding -->
        <div class="h-32"></div>
      </main>

      <!-- Back to Top (Minimalist) -->
      <button @click="scrollToTop" 
        class="fixed bottom-10 right-10 w-14 h-14 bg-black/80 dark:bg-white/10 hover:bg-[var(--accent-color)] text-white rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:-translate-y-2 z-50 group"
        :class="showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'">
        <ArrowUpIcon class="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';
import ShopHeaderBar from '../components/shop/ShopHeaderBar.vue';
import ShopFilterPanel from '../components/shop/ShopFilterPanel.vue';
import ShopProductCard from '../components/shop/ShopProductCard.vue';
import { GhostIcon, ArrowUpIcon } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const { products, categories, loading, fetchProducts, fetchCategories } = useProducts();
const { addToCart } = useCart();

const localSearch = ref('');
const selectedCategory = ref('');
const filterInStock = ref(false);
const filterOnSale = ref(false);
const filterMaxPrice = ref(3000);
const showBackToTop = ref(false);

const tags = ['Hot', 'Trending', 'Limited', 'New Arrival', 'Best Seller'];
const getProductTag = (index: number) => {
  if (index % 5 === 0) return tags[0];
  if (index % 7 === 0) return tags[1];
  if (index % 11 === 0) return tags[2];
  if (index % 3 === 0) return tags[3];
  return undefined;
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  showBackToTop.value = target.scrollTop > 500;
};

const scrollToTop = () => {
  const main = document.querySelector('main');
  if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchProducts();
  fetchCategories();
  if (route.query.category) {
    selectedCategory.value = String(route.query.category);
  }
  const main = document.querySelector('main');
  if (main) main.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  const main = document.querySelector('main');
  if (main) main.removeEventListener('scroll', handleScroll);
});

const selectCategory = (cat: string) => {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat;
};

const clearFilters = () => {
  selectedCategory.value = '';
  localSearch.value = '';
  filterInStock.value = false;
  filterOnSale.value = false;
  filterMaxPrice.value = 3000;
};

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = localSearch.value === '' ||
      p.title.toLowerCase().includes(localSearch.value.toLowerCase()) ||
      p.category.toLowerCase().includes(localSearch.value.toLowerCase());
    const matchesCat = selectedCategory.value === '' ||
      p.category.trim().toLowerCase() === selectedCategory.value.trim().toLowerCase();
    
    // In Stock filter
    const matchesStock = !filterInStock.value || p.stock > 0;
    
    // On Sale filter
    const matchesSale = !filterOnSale.value || (p.discountPercentage && p.discountPercentage > 10); // Items with > 10% discount
    
    // Price filter
    const matchesPrice = p.price <= filterMaxPrice.value;

    return matchesSearch && matchesCat && matchesStock && matchesSale && matchesPrice;
  });
});

const paginatedProducts = computed(() => {
  return [...filteredProducts.value];
});

const goToProduct = (id: number) => router.push(`/product/${id}`);
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}
</style>
