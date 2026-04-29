<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Your Profile</h1>
          <p class="text-slate-500 dark:text-slate-400">Welcome back, {{ user?.firstName || 'User' }}</p>
        </div>
        <div class="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {{ user?.firstName?.charAt(0) || 'U' }}
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Order History</h2>
        
        <div v-if="orders.length === 0" class="text-center py-10 text-slate-500 dark:text-slate-400">
          You haven't placed any orders yet.
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="order in orders" :key="order.id" class="border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
            <div class="space-y-1 mb-4 md:mb-0">
              <p class="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{{ order.id }}</p>
              <p class="text-sm border-b pb-2 mb-2 text-slate-500 max-w-[200px]">{{ new Date(order.date).toLocaleDateString() }}</p>
              <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ order.items.length }} items</p>
            </div>
            
            <div class="flex flex-col items-start md:items-end justify-between">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                Processing
              </span>
              <p class="text-lg font-bold text-slate-900 dark:text-white">${{ order.total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';

const { user } = useAuth();
const orders = ref<any[]>([]);

onMounted(() => {
  const savedOrders = localStorage.getItem('ecommerce_orders');
  if (savedOrders) {
    try {
      orders.value = JSON.parse(savedOrders);
    } catch (e) {
      console.error(e);
    }
  }
});
</script>
