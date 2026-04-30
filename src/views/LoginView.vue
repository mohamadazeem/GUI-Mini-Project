<template>
  <div class="h-full flex w-full bg-white dark:bg-[#0B0E14] font-sans overflow-hidden">
    
    <!-- LEFT SIDE: IMAGE & GREETING -->
    <div class="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
      <img 
        src="/new_login_image.png" 
        alt="Azeem Stores Premium" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/90 via-[#1E40AF]/40 to-transparent"></div>

      <div class="relative z-10 flex flex-col justify-center items-start px-20 w-full h-full">
        <div class="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-2xl animate-fade-in-up">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
            <ShoppingBagIcon class="w-7 h-7 text-white" />
          </div>
          <h1 class="text-5xl font-black text-white tracking-tighter leading-none mb-4">Hello!</h1>
          <p class="text-white/80 text-lg font-bold tracking-tight max-w-sm leading-relaxed">
            Welcome back to <span class="text-sky-300 font-black">Azeem Stores</span>.
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: COMPACT FORM -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div class="w-full max-w-[420px] flex flex-col items-center animate-fade-in scale-90 sm:scale-100">
        
        <!-- Logo Header -->
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShoppingBagIcon class="w-4 h-4 text-white" />
          </div>
          <h1 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Azeem Stores</h1>
        </div>

        <!-- Welcome Text -->
        <div class="w-full mb-5 text-left px-2">
          <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-0.5 leading-tight">Nice to see you again</h2>
          <p class="text-slate-400 dark:text-slate-500 font-medium text-sm">Please enter your details to continue.</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="w-full space-y-3 px-2">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1">Username</label>
            <input
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1">Password</label>
            <div class="relative flex items-center">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
                placeholder="Enter password"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-4 text-slate-400 hover:text-blue-500 transition-colors">
                <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Options Row -->
          <div class="flex items-center justify-between px-1">
            <label class="flex items-center cursor-pointer group">
              <div class="relative">
                <input type="checkbox" class="sr-only" v-model="rememberMe" />
                <div class="w-8 h-4.5 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors" :class="{'bg-blue-600': rememberMe}"></div>
                <div class="absolute left-0.5 top-0.5 bg-white w-3.5 h-3.5 rounded-full transition-transform shadow-sm" :class="{'translate-x-3': rememberMe}"></div>
              </div>
              <span class="ml-2 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" class="text-xs font-black text-blue-600 hover:underline">Forgot?</a>
          </div>

          <!-- Test Credentials Box -->
          <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-2.5 rounded-r-xl flex items-start gap-2.5">
            <div class="mt-0.5"><div class="w-3 h-3 rounded-full border border-blue-500 flex items-center justify-center"><span class="text-[8px] font-black text-blue-500">i</span></div></div>
            <div>
              <h4 class="text-[11px] font-black text-blue-600 mb-0.5 uppercase tracking-wider">Demo Access</h4>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <span class="bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-blue-600">emilys</span>
                <span class="text-slate-300">/</span>
                <span class="bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-blue-600">emilyspass</span>
              </div>
            </div>
          </div>

          <!-- Sign In Button -->
          <button
            type="submit"
            :disabled="isLoading || !username || !password"
            class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-base"
          >
            <Loader2Icon v-if="isLoading" class="w-5 h-5 animate-spin mr-2" />
            <span>{{ isLoading ? 'Verifying...' : 'Sign in' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="w-full flex items-center gap-3 my-4 px-2">
          <div class="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          <span class="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Social Connect</span>
          <div class="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>

        <!-- Google Button -->
        <button class="w-full max-w-[400px] py-3 bg-[#262626] hover:bg-[#1a1a1a] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md text-xs">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <!-- Footer -->
        <p class="mt-5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          New here? 
          <router-link to="/register" class="text-blue-600 font-black hover:underline uppercase tracking-widest text-[9px] ml-1">Create Account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { 
  ShoppingBagIcon, 
  EyeIcon, 
  EyeOffIcon, 
  Loader2Icon,
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const { login, isLoading, error } = useAuth();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) return;
  const success = await login(username.value, password.value);
  if (success) {
    const redirectPath = route.query.redirect as string || '/';
    router.push(redirectPath);
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}
.animate-fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-slow-zoom {
  animation: slowZoom 30s linear infinite alternate;
}
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
