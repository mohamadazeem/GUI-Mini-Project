<template>
  <div class="filter-panel bg-white dark:bg-[#0B0E14] h-full flex flex-col border-r border-slate-200/60 dark:border-white/5 transition-all duration-500 overflow-hidden">
    
    <!-- HEADER -->
    <div class="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-[#0B0E14]/50 backdrop-blur-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <FilterIcon class="w-4 h-4 text-white" />
        </div>
        <h2 class="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">Filters</h2>
      </div>
      <button 
        @click="$emit('reset')"
        class="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
      >
        <RotateCcwIcon class="w-3 h-3 group-hover:-rotate-180 transition-transform duration-500" />
        Reset
      </button>
    </div>

    <!-- SEARCH -->
    <div class="p-3.5 border-b border-slate-100 dark:border-white/5">
      <div class="relative group">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          placeholder="Search products..."
          class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-transparent focus:border-indigo-400 focus:bg-white dark:focus:bg-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs outline-none transition-all placeholder:text-slate-400 font-bold text-slate-700 dark:text-white"
        />
      </div>
    </div>

    <!-- CONTENT -->
    <div class="flex-1 overflow-y-auto hide-scrollbar scroll-smooth">
      
      <!-- CATEGORIES -->
      <div class="p-3.5 border-b border-slate-50 dark:border-white/5 relative">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</span>
          <button @click="$emit('selectType', '')" class="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Clear</button>
        </div>
        <div class="relative">
          <button @click="toggleDropdown('categories')" class="w-full flex items-center justify-between px-5 py-3 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-medium transition-all hover:border-indigo-400/50 group">
            <span class="capitalize text-slate-700 dark:text-slate-300">{{ selectedType === '' ? 'All Categories' : formatCategory(selectedType) }}</span>
            <ChevronDownIcon class="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:text-indigo-500" :class="{ 'rotate-180': isCategoriesOpen }" />
          </button>
          <transition name="dropdown">
            <div v-if="isCategoriesOpen" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto hide-scrollbar p-2">
              <button v-for="cat in types" :key="cat" @click="selectAndClose(cat)" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all capitalize" :class="selectedType === cat ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-500'">{{ formatCategory(cat) }}</button>
            </div>
          </transition>
        </div>
      </div>

      <!-- BRANDS -->
      <div class="p-3.5 border-b border-slate-50 dark:border-white/5 relative">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand</span>
          <button @click="$emit('update:selectedBrand', '')" class="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Clear</button>
        </div>
        <div class="relative">
          <button @click="toggleDropdown('brands')" class="w-full flex items-center justify-between px-5 py-3 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-medium transition-all hover:border-indigo-400/50 group">
            <span class="capitalize text-slate-700 dark:text-slate-300">{{ selectedBrand === '' ? 'All Brands' : selectedBrand }}</span>
            <ChevronDownIcon class="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:text-indigo-500" :class="{ 'rotate-180': isBrandsOpen }" />
          </button>
          <transition name="dropdown">
            <div v-if="isBrandsOpen" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto hide-scrollbar p-2">
              <button v-for="brand in brands" :key="brand" @click="selectBrandAndClose(brand)" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all" :class="selectedBrand === brand ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-500'">{{ brand }}</button>
            </div>
          </transition>
        </div>
      </div>

      <!-- PRICE RANGE (Compact) -->
      <div class="p-3.5 border-b border-slate-50 dark:border-white/5">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <DollarSignIcon class="w-3.5 h-3.5 text-indigo-500" />
            <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Price Range</span>
          </div>
          <span class="text-[10px] font-black text-indigo-500">LKR {{ maxPrice.toLocaleString() }}</span>
        </div>
        <div class="px-1 py-2">
          <div class="h-1 bg-slate-100 dark:bg-white/10 rounded-full relative">
            <div class="absolute left-0 h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" :style="{ width: `${(maxPrice / maxPriceLimit) * 100}%` }"></div>
            <input type="range" min="0" :max="maxPriceLimit" :value="maxPrice" @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))" class="absolute top-0 -mt-1.5 w-full h-4 opacity-0 cursor-pointer z-10" />
            <div class="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full shadow-md pointer-events-none" :style="{ left: `calc(${(maxPrice / maxPriceLimit) * 100}% - 7px)` }"></div>
          </div>
        </div>
      </div>

      <!-- STATUS / AVAILABILITY -->
      <div class="p-3.5 border-b border-slate-50 dark:border-white/5 space-y-2">
        <div class="flex items-center gap-2 mb-0.5">
          <ZapIcon class="w-3.5 h-3.5 text-indigo-500" />
          <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Quick Status</span>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <div class="flex gap-2">
            <button @click="$emit('update:inStock', !inStock)" class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all" :class="inStock ? 'bg-green-500/10 border-green-500/50 text-green-600 shadow-sm shadow-green-500/5' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500'">
              <div class="w-1.5 h-1.5 rounded-full" :class="inStock ? 'bg-green-500 animate-pulse' : 'bg-slate-300'"></div>
              <span class="text-[10px] font-black uppercase tracking-tighter">In Stock</span>
            </button>
            <button @click="$emit('update:onSale', !onSale)" class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all" :class="onSale ? 'bg-red-500/10 border-red-500/50 text-red-600 shadow-sm shadow-red-500/5' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500'">
              <div class="w-1.5 h-1.5 rounded-full" :class="onSale ? 'bg-red-500 animate-pulse' : 'bg-slate-300'"></div>
              <span class="text-[10px] font-black uppercase tracking-tighter">Flash Sale</span>
            </button>
          </div>
          <button @click="$emit('update:topRated', !topRated)" class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all" :class="topRated ? 'bg-amber-500/10 border-amber-500/50 text-amber-600 shadow-sm shadow-amber-500/5' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500'">
            <StarIcon class="w-3 h-3" :class="topRated ? 'fill-current' : ''" />
            <span class="text-[10px] font-black uppercase tracking-tighter">Top Rated Products</span>
          </button>
        </div>
      </div>

      <!-- PRIMARY ACTIONS -->
      <div class="p-4 space-y-2.5">
        <button @click="$emit('close')" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95 group">
          <span class="flex items-center justify-center gap-2">Apply Filters <ChevronRightIcon class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
        </button>
        <button @click="$emit('reset')" class="w-full py-1 text-[10px] font-bold text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest text-center block">Clear All Filters</button>
      </div>

    </div>


  </div>
</template>

<script setup lang="ts">
import { 
  SearchIcon, FilterIcon, ChevronDownIcon, ChevronRightIcon, StarIcon, ZapIcon, DollarSignIcon, RotateCcwIcon
} from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
  totalItems: number;
  types: string[];
  selectedType: string;
  brands: string[];
  selectedBrand: string;
  searchQuery: string;
  inStock: boolean;
  onSale: boolean;
  topRated: boolean;
  maxPrice: number;
  maxPriceLimit: number;
}>();

const emit = defineEmits([
  'selectType', 'reset', 'close', 'update:searchQuery', 'update:inStock', 'update:onSale', 'update:topRated', 'update:maxPrice', 'update:selectedBrand'
]);

const isCategoriesOpen = ref(false);
const isBrandsOpen = ref(false);

const toggleDropdown = (type: 'categories' | 'brands') => {
  if (type === 'categories') {
    isCategoriesOpen.value = !isCategoriesOpen.value;
    isBrandsOpen.value = false;
  } else {
    isBrandsOpen.value = !isBrandsOpen.value;
    isCategoriesOpen.value = false;
  }
};

const formatCategory = (cat: string) =>
  cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const selectAndClose = (cat: string) => {
  emit('selectType', cat);
  isCategoriesOpen.value = false;
};

const selectBrandAndClose = (brand: string) => {
  emit('update:selectedBrand', brand);
  isBrandsOpen.value = false;
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border: 2px solid #6366f1;
  border-radius: 50%;
  cursor: pointer;
}
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.3s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
