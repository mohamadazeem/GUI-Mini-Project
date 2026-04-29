<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center py-10 px-4">
    <div class="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 text-center transform transition-all">
      <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckIcon class="w-10 h-10 text-green-500 dark:text-green-400" />
      </div>

      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Order Confirmed!</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-6">
        Thank you for your purchase. We have received your order and will begin processing it right away.
      </p>

      <div class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-8">
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Order Number</p>
        <p class="text-lg font-bold text-slate-900 dark:text-white font-mono tracking-wider">{{ orderNumber }}</p>
      </div>

      <router-link
        to="/"
        class="block w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CheckIcon } from 'lucide-vue-next';

const orderNumber = ref('');

onMounted(() => {
  // Generate a random order number for simulation
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  orderNumber.value = `ORD-${randomStr}-${randomNum}`;
});
</script>
