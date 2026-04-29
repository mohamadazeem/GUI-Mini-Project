<template>
  <div class="flex flex-wrap gap-3 w-full items-center justify-center">
    <button
      @click="$emit('update:modelValue', '')"
      class="px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 border"
      :class="modelValue === '' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/80 dark:hover:border-slate-600'"
    >
      All Categories
    </button>
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('update:modelValue', category)"
      class="px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 border capitalize"
      :class="modelValue === category ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/80 dark:hover:border-slate-600'"
    >
      {{ formatCategory(category) }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[];
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const formatCategory = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>
