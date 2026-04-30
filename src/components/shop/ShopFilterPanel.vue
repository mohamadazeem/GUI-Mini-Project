<template>
  <div class="filter-panel bg-white dark:bg-[#0B0E14] h-full flex flex-col border-r border-slate-200/60 dark:border-white/5 transition-all duration-500 overflow-hidden">
    
    <!-- HEADER -->
    <div class="p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-[#0B0E14]/50 backdrop-blur-md z-10">
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
    <div class="p-4 border-b border-slate-100 dark:border-white/5">
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

    <!-- SCROLLABLE CONTENT (Tight layout to avoid actual scrolling) -->
    <div class="flex-1 overflow-y-auto hide-scrollbar scroll-smooth">
      
      <!-- CATEGORIES (Vertical List) -->
      <div class="p-4 border-b border-slate-50 dark:border-white/5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <LayoutGridIcon class="w-3.5 h-3.5 text-indigo-500" />
            <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Categories</span>
          </div>
          <span class="text-[9px] font-bold text-slate-400">{{ types.length }}</span>
        </div>
        <div class="space-y-1">
          <button 
            @click="$emit('selectType', '')"
            class="w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-between"
            :class="selectedType === '' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'"
          >
            All Collections
            <CheckIcon v-if="selectedType === ''" class="w-3 h-3 text-indigo-500" />
          </button>
          <button 
            v-for="cat in types.slice(0, 10)" :key="cat"
            @click="$emit('selectType', cat)"
            class="w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-between capitalize"
            :class="selectedType === cat ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'"
          >
            {{ formatCategory(cat) }}
            <CheckIcon v-if="selectedType === cat" class="w-3 h-3 text-indigo-500" />
          </button>
        </div>
      </div>

      <!-- BRANDS (Visible by Default) -->
      <div class="p-4 border-b border-slate-50 dark:border-white/5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <TagIcon class="w-3.5 h-3.5 text-indigo-500" />
            <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Top Brands</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="brand in ['Apple', 'Samsung', 'Nike', 'Adidas']" :key="brand"
            class="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-indigo-400 transition-all group"
          >
            <div class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors"></div>
            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:text-slate-100">{{ brand }}</span>
          </button>
        </div>
      </div>

      <!-- PRICE RANGE (Compact) -->
      <div class="p-4 border-b border-slate-50 dark:border-white/5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <DollarSignIcon class="w-3.5 h-3.5 text-indigo-500" />
            <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Price Range</span>
          </div>
          <span class="text-[10px] font-black text-indigo-500">LKR {{ maxPrice.toLocaleString() }}</span>
        </div>
        <div class="px-1 py-2">
          <div class="h-1 bg-slate-100 dark:bg-white/10 rounded-full relative">
            <div 
              class="absolute left-0 h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"
              :style="{ width: `${(maxPrice / 3000) * 100}%` }"
            ></div>
            <input 
              type="range" min="0" max="3000" :value="maxPrice"
              @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
              class="absolute top-0 -mt-1.5 w-full h-4 opacity-0 cursor-pointer z-10" 
            />
            <div 
              class="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full shadow-md pointer-events-none transition-all"
              :style="{ left: `calc(${(maxPrice / 3000) * 100}% - 7px)` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- STATUS / AVAILABILITY (Compact chips) -->
      <div class="p-4">
        <div class="flex gap-2">
          <button 
            @click="$emit('update:inStock', !inStock)"
            class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all"
            :class="inStock ? 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500'"
          >
            <div class="w-1.5 h-1.5 rounded-full" :class="inStock ? 'bg-green-500 animate-pulse' : 'bg-slate-300'"></div>
            <span class="text-[10px] font-black uppercase tracking-tighter">In Stock</span>
          </button>
          <button 
            @click="$emit('update:onSale', !onSale)"
            class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all"
            :class="onSale ? 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500'"
          >
            <div class="w-1.5 h-1.5 rounded-full" :class="onSale ? 'bg-red-500 animate-pulse' : 'bg-slate-300'"></div>
            <span class="text-[10px] font-black uppercase tracking-tighter">On Sale</span>
          </button>
        </div>
      </div>

    </div>

    <!-- FOOTER (Fixed) -->
    <div class="mt-auto p-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-indigo-600/20">AZ</div>
          <div class="flex flex-col">
            <span class="text-[9px] font-black text-slate-900 dark:text-white uppercase leading-none">Azeem Stores</span>
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ totalItems }} Items</span>
          </div>
        </div>
        <button 
          @click="$emit('reset')"
          class="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
          title="Clear all"
        >
          <RotateCcwIcon class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  SearchIcon, 
  LayoutGridIcon,
  FilterIcon,
  RotateCcwIcon,
  DollarSignIcon,
  StarIcon,
  TagIcon,
  CheckIcon
} from 'lucide-vue-next';

const props = defineProps<{
  totalItems: number;
  types: string[];
  selectedType: string;
  searchQuery: string;
  inStock: boolean;
  onSale: boolean;
  maxPrice: number;
}>();

const emit = defineEmits([
  'selectType', 
  'reset', 
  'update:searchQuery',
  'update:inStock',
  'update:onSale',
  'update:maxPrice'
]);

const formatCategory = (cat: string) =>
  cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border: 2px solid #6366f1;
  border-radius: 50%;
  cursor: pointer;
}
</style>
