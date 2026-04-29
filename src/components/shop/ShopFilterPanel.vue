<template>
  <div class="filter-panel bg-white dark:bg-[#0B0E14] h-full flex flex-col p-6 border-r border-slate-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
    
    <!-- SEARCH BAR -->
    <div class="mb-10 relative">
      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <SearchIcon class="w-4 h-4" />
      </div>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        placeholder="Search products..."
        class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-sky-400 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all"
        :style="{ color: 'var(--text-color)' }"
      />
    </div>

    <!-- CATEGORY DROPDOWN -->
    <div class="mb-10 relative">
      <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Category</p>
      <div class="relative">
        <button 
          @click="isCategoriesOpen = !isCategoriesOpen"
          class="w-full flex items-center justify-between px-5 py-3 rounded-2xl border-2 border-sky-400/30 dark:border-sky-400/20 bg-white dark:bg-white/5 text-sm font-bold transition-all hover:border-sky-400"
          :style="{ color: 'var(--text-color)' }"
        >
          <span class="capitalize">{{ selectedType === '' ? 'All Categories' : formatCategory(selectedType) }}</span>
          <ChevronDownIcon 
            class="w-4 h-4 transition-transform duration-300 opacity-60"
            :class="{ 'rotate-180': isCategoriesOpen }"
          />
        </button>

        <!-- Dropdown Menu -->
        <transition name="fade">
          <div v-if="isCategoriesOpen" 
               class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#161B22] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
            <button 
              @click="selectAndClose('')"
              class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              :class="selectedType === '' ? 'bg-slate-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            >
              All Categories
            </button>
            <button 
              v-for="cat in types" :key="cat"
              @click="selectAndClose(cat)"
              class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize"
              :class="selectedType === cat ? 'bg-slate-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            >
              {{ formatCategory(cat) }}
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- FILTERS & BUDGET (Scrollable area) -->
    <div class="space-y-10 flex-1 overflow-y-auto hide-scrollbar pb-10">
      <!-- AVAILABILITY -->
      <div>
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Availability</p>
        <div class="space-y-3">
          <label v-for="status in ['In Stock', 'On Sale']" :key="status" class="flex items-center gap-3 group cursor-pointer">
            <div class="w-5 h-5 rounded-lg border-2 border-slate-200 dark:border-white/10 flex items-center justify-center transition-all group-hover:border-[var(--accent-color)]">
              <div class="w-2 h-2 bg-[var(--accent-color)] rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-[var(--accent-color)] transition-colors">{{ status }}</span>
          </label>
        </div>
      </div>

      <!-- PRICE RANGE -->
      <div>
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-1">Budget</p>
        <div class="px-2 space-y-6">
          <input type="range" min="0" max="300000" class="w-full accent-[var(--accent-color)] h-1 bg-slate-100 dark:bg-white/5 rounded-full appearance-none cursor-pointer" />
          <div class="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>LKR 0</span>
            <span>LKR 300K+</span>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM INFO (Outside scrollable area) -->
    <div class="pt-8 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0B0E14] z-10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azeem" class="w-6 h-6" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-black uppercase tracking-widest" :style="{ color: 'var(--text-color)' }">Azeem Stores</span>
          <span class="text-[9px] font-bold text-slate-400">Premium Dashboard</span>
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
} from 'lucide-vue-next';

const props = defineProps<{
  totalItems: number;
  types: string[];
  selectedType: string;
  searchQuery: string;
}>();

const emit = defineEmits(['selectType', 'reset', 'close', 'update:searchQuery']);

const isCategoriesOpen = ref(false);

const formatCategory = (cat: string) =>
  cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const selectAndClose = (cat: string) => {
  emit('selectType', cat);
  isCategoriesOpen.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
