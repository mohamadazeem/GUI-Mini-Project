<template>
  <div class="relative w-full group">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <SearchIcon class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
    </div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700/50 rounded-full leading-5 bg-slate-50 dark:bg-slate-800/50 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-base transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:font-light"
      placeholder="Search for amazing products..."
    />
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
