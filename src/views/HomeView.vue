<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">

    <!-- ─── AMBIENT BLOBS ─── -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

    <!-- ═══════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════ -->
    <section class="relative w-full min-h-[88vh] flex items-center overflow-hidden">
      <!-- BG Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="file:///C:/Users/ASUS/.gemini/antigravity/brain/9179dab7-39c0-46fc-812e-0691164317db/hero_fashion_bg_v2_1777364746900.png"
          alt="Hero Background"
          class="w-full h-full object-cover filter blur-[2px] scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-indigo-950/75 to-transparent"></div>
        <!-- Animated grid lines -->
        <div class="absolute inset-0 opacity-10"
          style="background-image:linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);background-size:60px 60px">
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row items-center gap-12 py-24">
        <!-- Left: Text -->
        <div class="w-full md:w-3/5 text-left hero-fade-left">
          <span class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 backdrop-blur">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            New Season Arrivals
          </span>
          <h1 class="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none mb-6 drop-shadow-2xl">
            AZEEM <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">STORES</span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-200 mb-4 max-w-xl leading-relaxed">
            Premium fashion, electronics & lifestyle — curated just for you.
          </p>
          <p class="text-lg font-bold text-slate-100 mb-10">
            Flat <span class="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-lg text-white">35–70% Off</span> on 1000+ products
          </p>

          <div class="flex gap-4 flex-wrap">
            <router-link to="/shop"
              class="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm">
              Shop Now →
            </router-link>
            <router-link to="/deals"
              class="px-10 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-black rounded-xl hover:bg-white hover:text-indigo-900 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm">
              🔥 View Deals
            </router-link>
          </div>
        </div>

        <!-- Right: Floating Badges -->
        <div class="w-full md:w-2/5 flex flex-col gap-5 hero-fade-right">
          <div
            v-for="(badge, idx) in heroBadges" :key="badge.label"
            class="flex items-center gap-5 bg-white/8 dark:bg-slate-800/20 backdrop-blur-md border border-white/15 dark:border-slate-700/30 rounded-2xl p-5 shadow-2xl hover:scale-105 hover:bg-white/12 transition-all duration-500 cursor-default group"
            :style="{ transitionDelay: (idx * 120) + 'ms' }"
          >
            <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-3xl group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
              {{ badge.icon }}
            </div>
            <div>
              <p class="font-black text-white text-lg tracking-tight">{{ badge.label }}</p>
              <p class="text-sm text-slate-300 font-medium">{{ badge.sub }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span class="text-xs text-white/50 font-medium tracking-widest uppercase">Scroll</span>
        <div class="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FEATURES STRIP
    ═══════════════════════════════════════════ -->
    <section class="py-14 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="feature in features" :key="feature.title"
          class="flex flex-col items-center text-center p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#020617,-8px_-8px_16px_#1e293b] hover:shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff] dark:hover:shadow-[inset_4px_4px_8px_#020617,inset_-4px_-4px_8px_#1e293b] transition-all duration-500 group"
        >
          <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <component :is="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="font-black text-slate-800 dark:text-white text-sm mb-2 uppercase tracking-tight">{{ feature.title }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         STATS BANNER
    ═══════════════════════════════════════════ -->
    <section class="relative z-10 py-16 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-1 shadow-2xl shadow-indigo-500/20">
          <div class="rounded-[2.3rem] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 px-8 py-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div v-for="stat in stats" :key="stat.label" class="group">
                <p class="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">{{ stat.value }}</p>
                <p class="text-sm text-white/70 font-semibold uppercase tracking-widest">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FEATURED PRODUCTS
    ═══════════════════════════════════════════ -->
    <section id="products-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div class="text-left">
          <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2">Featured Products</h2>
          <div class="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div class="inline-flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-2xl backdrop-blur">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              class="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              :class="activeTab === tab.key
                ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'">
              {{ tab.label }}
            </button>
          </div>
          <router-link to="/shop"
            class="px-5 py-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600/30 rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all">
            View All →
          </router-link>
        </div>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="i in 10" :key="i" class="animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800 h-80"></div>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="product in paginatedProducts" :key="product.id"
          class="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-900/30 transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
          @click="goToProduct(product.id)"
        >
          <div class="relative aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 overflow-hidden mb-4 p-4 flex items-center justify-center">
            <img :src="product.thumbnail" :alt="product.title"
              class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase" v-if="product.discountPercentage">
              -{{ Math.round(product.discountPercentage) }}%
            </div>
            <button @click.stop="toggleWishlist(product)"
              class="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-sm text-slate-400 hover:text-pink-500 transition-colors z-10">
              <HeartIcon class="w-4 h-4" :class="{'fill-pink-500 text-pink-500': isInWishlist(product.id)}" />
            </button>
          </div>

          <div class="px-2">
            <p class="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1 line-clamp-1">{{ product.category }}</p>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-3 group-hover:text-indigo-600 transition-colors">{{ product.title }}</h3>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-lg font-black text-slate-900 dark:text-white">Rs. {{ (product.price * 300).toLocaleString() }}</span>
              <button @click.stop="addToCart(product)"
                class="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all group-hover:shadow-lg">
                <ShoppingCartIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && paginatedProducts.length === 0" class="text-center py-24">
        <div class="text-7xl mb-6">🔍</div>
        <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">No Products Found</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Try a different search term.</p>
      </div>

      <!-- View More -->
      <div class="text-center mt-16" v-if="!showAllProducts && filteredProducts.length > 10">
        <router-link to="/shop"
          class="inline-block px-12 py-4 border-2 border-indigo-600 text-indigo-600 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest text-xs shadow-xl hover:shadow-indigo-500/30">
          Explore All Products →
        </router-link>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         CREATIVE PROMO BANNERS
    ═══════════════════════════════════════════ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Promo 1 (Fashion) -->
        <div class="group relative aspect-[16/9] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-1000">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
               class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
          <div class="relative h-full p-8 md:p-12 flex flex-col justify-center">
            <span class="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Seasonal Reveal</span>
            <h3 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none">HAUTE<br/>COUTURE</h3>
            <p class="text-slate-300 text-xs md:text-sm mb-8 max-w-xs font-medium">Elevate your presence with our most exclusive fashion curation yet.</p>
            <div>
               <router-link to="/shop?category=womens-dresses"
                class="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Explore Styles <ChevronRightIcon class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- Promo 2 (Watches) -->
        <div class="group relative aspect-[16/9] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-1000">
          <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop" 
               class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
          <div class="relative h-full p-8 md:p-12 flex flex-col justify-center">
            <span class="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Precision Craft</span>
            <h3 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none">MASTER<br/>PIECES</h3>
            <p class="text-slate-300 text-xs md:text-sm mb-8 max-w-xs font-medium">Timeless engineering meets contemporary aesthetic in our watch lab.</p>
            <div>
               <router-link to="/shop?category=mens-watches"
                class="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                View Collection <ChevronRightIcon class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useSearch } from '../composables/useSearch';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/useWishlist';
import {
  TruckIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  HeadphonesIcon,
  ShoppingCartIcon,
  HeartIcon,
  ChevronRightIcon
} from 'lucide-vue-next';

const router = useRouter();
const { products, loading, fetchProducts, fetchCategories } = useProducts();
const { globalSearchQuery } = useSearch();
const { addToCart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

const activeTab = ref('new');
const showAllProducts = ref(false);

watch([activeTab], () => { showAllProducts.value = false; });

// ── Static data ──────────────────────────
const heroBadges = [
  { icon: '🌟', label: 'New Arrivals',  sub: 'Fresh seasonal collection' },
  { icon: '⚡', label: 'Flash Deals',   sub: 'Limited time 70% off' },
  { icon: '🏆', label: 'Top Rated',     sub: 'Best sellers worldwide' },
];

const features = [
  { icon: TruckIcon,       title: 'Free Shipping',  desc: 'On orders over Rs. 15,000' },
  { icon: ShieldCheckIcon, title: 'Secure Payment', desc: '100% encrypted checkout' },
  { icon: RefreshCwIcon,   title: 'Money Back',     desc: '30 day easy return policy' },
  { icon: HeadphonesIcon,  title: 'Online Support', desc: 'Dedicated 24/7 assistance' },
];

const stats = [
  { value: '50K+',  label: 'Happy Customers' },
  { value: '1200+', label: 'Products' },
  { value: '120+',  label: 'Brands' },
  { value: '4.9★',  label: 'Avg. Rating' },
];

const tabs = [
  { key: 'new',        label: 'New Arrival' },
  { key: 'bestseller', label: 'Best Selling' },
  { key: 'toprated',   label: 'Top Rated' },
];

onMounted(() => {
  fetchProducts();
  fetchCategories();
});

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const q = globalSearchQuery.value.toLowerCase();
    return !q || p.title.toLowerCase().includes(q);
  });
});

const paginatedProducts = computed(() => {
  let list = [...filteredProducts.value];
  if (activeTab.value === 'toprated')   list = list.sort((a, b) => b.rating - a.rating);
  if (activeTab.value === 'bestseller') list = list.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
  return list.slice(0, 10);
});

const goToProduct = (id: number) => router.push(`/product/${id}`);
</script>

<style scoped>
.hero-fade-left {
  animation: fadeInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-fade-right {
  animation: fadeInRight 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
