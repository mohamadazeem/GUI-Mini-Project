<template>
  <div class="filter-panel bg-white dark:bg-[#0B0E14] h-full flex flex-col p-8 border-r border-slate-200/60 dark:border-white/5 overflow-hidden transition-all duration-500">
    
    <!-- BRANDING / HEADER -->
    <div class="mb-12 flex items-center gap-4">
      <div class="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 rotate-3">
        <ShoppingBagIcon class="w-6 h-6 text-white -rotate-3" />
      </div>
      <div>
        <h2 class="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Filters</h2>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ totalItems }} Premium Items</p>
      </div>
    </div>

    <!-- SEARCH BAR -->
    <div class="mb-10 relative group">
      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
        <SearchIcon class="w-4 h-4" />
      </div>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        placeholder="Find something..."
        class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-transparent focus:border-sky-400 focus:bg-white dark:focus:bg-white/10 rounded-[1.25rem] py-4 pl-12 pr-4 text-sm outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/5 placeholder:text-slate-400 placeholder:font-medium font-bold text-slate-700 dark:text-white"
      />
    </div>

    <!-- CATEGORY DROPDOWN -->
    <div class="mb-12 relative">
      <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Collections</p>
      <div class="relative">
        <button 
          @click="isCategoriesOpen = !isCategoriesOpen"
          class="w-full flex items-center justify-between px-6 py-4 rounded-[1.25rem] border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-sm font-black transition-all hover:border-sky-400 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-white group shadow-sm hover:shadow-md"
        >
          <span class="capitalize tracking-tight">{{ selectedType === '' ? 'All Categories' : formatCategory(selectedType) }}</span>
          <ChevronDownIcon 
            class="w-4 h-4 transition-transform duration-500 text-slate-400 group-hover:text-sky-500"
            :class="{ 'rotate-180': isCategoriesOpen }"
          />
        </button>

        <!-- Dropdown Menu -->
        <transition name="dropdown">
          <div v-if="isCategoriesOpen" 
               class="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-white/10 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 max-h-[350px] overflow-y-auto custom-scrollbar p-3 backdrop-blur-xl">
            <button 
              @click="selectAndClose('')"
              class="w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all mb-1 flex items-center justify-between group"
              :class="selectedType === '' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-sky-500'"
            >
              All Collections
              <div v-if="selectedType === ''" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            </button>
            <button 
              v-for="cat in types" :key="cat"
              @click="selectAndClose(cat)"
              class="w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all mb-1 capitalize flex items-center justify-between group"
              :class="selectedType === cat ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-sky-500'"
            >
              {{ formatCategory(cat) }}
              <div v-if="selectedType === cat" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- FILTERS & BUDGET (Scrollable area) -->
    <div class="space-y-12 flex-1 overflow-y-auto hide-scrollbar pb-10">
      <!-- AVAILABILITY -->
      <div>
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-1">Status</p>
        <div class="grid grid-cols-1 gap-4">
          <label 
            v-for="item in [{ id: 'inStock', label: 'In Stock', active: inStock }, { id: 'onSale', label: 'Flash Sale', active: onSale }]" 
            :key="item.id"
            class="group cursor-pointer"
          >
            <input 
              type="checkbox" 
              :checked="item.active"
              @change="$emit(`update:${item.id}`, ($event.target as HTMLInputElement).checked)"
              class="hidden"
            />
            <div 
              class="flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-300"
              :class="item.active ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-500/5' : 'border-slate-100 dark:border-white/5 hover:border-sky-200 dark:hover:border-sky-500/20 bg-slate-50/30 dark:bg-white/[0.02]'"
            >
              <div 
                class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all"
                :class="item.active ? 'bg-sky-500 border-sky-500' : 'border-slate-300 dark:border-white/10 group-hover:border-sky-400'"
              >
                <CheckIcon v-if="item.active" class="w-4 h-4 text-white" />
              </div>
              <span 
                class="text-xs font-black tracking-tight transition-colors"
                :class="item.active ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
              >{{ item.label }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- PRICE RANGE -->
      <div class="px-1">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 ml-1">Budget Range</p>
        <div class="space-y-8 relative">
          <!-- Custom Track -->
          <div class="h-2 bg-slate-100 dark:bg-white/5 rounded-full relative overflow-hidden">
            <div 
              class="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"
              :style="{ width: `${(maxPrice / 3000) * 100}%` }"
            ></div>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="3000" 
            :value="maxPrice"
            @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
            class="absolute top-0 -mt-2 w-full accent-sky-500 h-2 opacity-0 cursor-pointer z-10" 
          />
          
          <!-- Slider Thumb Placeholder (since input is hidden/transparent) -->
          <div 
            class="absolute top-0 -mt-2.5 w-6 h-6 bg-white border-4 border-sky-500 rounded-full shadow-lg shadow-sky-500/20 pointer-events-none transition-all duration-300 transform -translate-x-1/2"
            :style="{ left: `${(maxPrice / 3000) * 100}%` }"
          ></div>

          <div class="flex justify-between items-center px-1">
            <div class="flex flex-col">
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Min</span>
              <span class="text-xs font-black text-slate-900 dark:text-white">LKR 0</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max</span>
              <span class="text-sm font-black text-sky-500">LKR {{ maxPrice === 3000 ? '3000+' : maxPrice.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CLEAR FILTERS -->
      <div class="pt-4">
        <button 
          @click="$emit('reset')"
          class="w-full py-4 rounded-[1.25rem] border-2 border-dashed border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-red-400/50 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-500/5 transition-all flex items-center justify-center gap-3 group"
        >
          <RotateCcwIcon class="w-3.5 h-3.5 transition-transform group-hover:-rotate-180 duration-500" />
          Clear Everything
        </button>
      </div>
    </div>

    <!-- FOOTER / USER -->
    <div class="mt-auto pt-8 border-t border-slate-100 dark:border-white/5">
      <div class="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-transparent">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-inner overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azeem" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col">
          <span class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Azeem Stores</span>
          <span class="text-[9px] font-bold text-slate-400">Exclusive Shopping</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  SearchIcon, 
  ChevronDownIcon,
  ShoppingBagIcon,
  CheckIcon,
  RotateCcwIcon
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
  'close', 
  'update:searchQuery',
  'update:inStock',
  'update:onSale',
  'update:maxPrice'
]);

const isCategoriesOpen = ref(false);

const formatCategory = (cat: string) =>
  cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const selectAndClose = (cat: string) => {
  emit('selectType', cat);
  isCategoriesOpen.value = false;
};
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 4px solid #0ea5e9;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(14, 165, 233, 0.2);
}
</style>
