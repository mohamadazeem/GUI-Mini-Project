<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="min-w-[300px] p-4 rounded-xl shadow-lg border backdrop-blur-md flex items-center justify-between"
        :class="{
          'bg-green-100/90 dark:bg-green-900/80 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100': toast.type === 'success',
          'bg-red-100/90 dark:bg-red-900/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100': toast.type === 'error',
          'bg-blue-100/90 dark:bg-blue-900/80 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-100': toast.type === 'info',
        }"
      >
        <div class="flex items-center gap-2">
          <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5 flex-shrink-0" />
          <AlertCircleIcon v-else-if="toast.type === 'error'" class="w-5 h-5 flex-shrink-0" />
          <InfoIcon v-else class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ toast.message }}</span>
        </div>
        <button @click="removeToast(toast.id)" class="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon } from 'lucide-vue-next';

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
