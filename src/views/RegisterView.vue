<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      
      <div class="relative z-10">
        <div>
          <div class="mx-auto h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4 inner-shadow">
            <UserPlusIcon class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 class="text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create an account
          </h2>
        </div>
        
        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="name"
                  type="text"
                  required
                  v-model="name"
                  class="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label for="username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="username"
                  type="text"
                  required
                  v-model="username"
                  class="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="johndoe123"
                />
              </div>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  v-model="password"
                  class="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !username || !password || !name"
              class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all shadow-md"
            >
               Sign up
            </button>
          </div>
        </form>

        <div class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
           Already have an account? 
           <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
             Sign in
           </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { UserPlusIcon } from 'lucide-vue-next';

const router = useRouter();
const { login } = useAuth(); // Reusing mock logic

const name = ref('');
const username = ref('');
const password = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  if (!username.value || !password.value || !name.value) return;
  isLoading.value = true;
  
  // Simulate network request
  await new Promise(res => setTimeout(res, 1000));
  
  // Mock login with "dummy credentials" to simulate success (using existing auth)
  await login('emilys', 'emilyspass');
  
  router.push('/');
  isLoading.value = false;
};
</script>
