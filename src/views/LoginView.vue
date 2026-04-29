<template>
  <div class="min-h-[calc(100vh-4rem)] flex w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <!-- Left Side: Split screen gradient background (Hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 overflow-hidden items-center justify-center p-12">
      <!-- Abstract shapes -->
      <div class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <!-- Rings -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[500px] h-[500px] border-2 border-white/20 rounded-full animate-pulse-slow"></div>
        <div class="absolute w-[300px] h-[300px] border border-white/20 rounded-full animate-pulse-slow animation-delay-1000"></div>
      </div>
      
      <div class="relative z-10 text-white max-w-lg">
        <div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/30 shadow-sm">
           <span class="w-2 h-2 rounded-full bg-green-400 animate-ping-slow"></span>
           <span class="text-sm font-semibold tracking-wider uppercase">Trusted by 50,000+ shoppers</span>
        </div>
        <h1 class="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 drop-shadow-sm">
          Your shopping<br/>journey starts here.
        </h1>
        <p class="text-lg text-blue-50/90 leading-relaxed font-light mb-8">
          Create an account to unlock exclusive deals, personalized recommendations, and a seamless checkout experience.
        </p>
        
        <div class="flex gap-3 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            Exclusive Discounts
          </span>
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            Fast & Secure Checkout
          </span>
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <!-- Mobile decorative background -->
      <div class="lg:hidden absolute top-[-20%] right-[-10%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      
      <div class="w-full max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700/50 relative z-10">
        
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <LockIcon class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Azeem Stores</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Welcome back 👋</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">Sign in to continue shopping</p>
        </div>

        <!-- Error message -->
        <div v-if="error" class="mb-6 bg-red-50/80 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm flex items-start border border-red-100 dark:border-red-800/50">
          <AlertCircleIcon class="h-5 w-5 mr-2 shrink-0" />
          <span>{{ error }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username / Email -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <UserIcon class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                v-model="username"
                type="text"
                required
                class="w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                placeholder="e.g. emilys"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <KeyIcon class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-11 pr-12 py-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                placeholder="••••••••"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-indigo-500 transition-colors">
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeOffIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between mt-6">
            <label class="flex items-center cursor-pointer group">
              <div class="relative flex items-center justify-center w-5 h-5 mr-3">
                <input type="checkbox" class="peer sr-only" />
                <div class="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded flex items-center justify-center peer-checked:bg-gradient-to-br peer-checked:from-indigo-500 peer-checked:to-blue-500 peer-checked:border-transparent transition-all">
                  <svg class="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Reset Password
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !username || !password"
            class="relative w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold tracking-wide bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(99,102,241,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-2"
          >
            <Loader2Icon v-if="isLoading" class="h-5 w-5 mr-2 animate-spin" />
            <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
          </button>
        </form>

        <!-- Social Logins -->
        <div class="mt-8">
          <div class="relative flex items-center mb-6">
            <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span class="flex-shrink-0 mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">or continue with</span>
            <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <button type="button" class="flex justify-center items-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" class="flex justify-center items-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <svg class="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button type="button" class="flex justify-center items-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors text-slate-900 dark:text-white">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
            </button>
          </div>

          <p class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account? 
            <router-link to="/register" class="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Create Account
            </router-link>
          </p>

          <div class="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-center text-slate-500 font-mono">
            <p class="font-semibold mb-1 text-slate-600 dark:text-slate-400">Demo Credentials</p>
            <div class="flex justify-center space-x-4">
              <span>emilys / emilyspass</span>
              <span>|</span>
              <span>kminchelle / 0lelplR</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { 
  LockIcon, 
  UserIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeOffIcon, 
  Loader2Icon,
  AlertCircleIcon
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const { login, isLoading, error } = useAuth();

const username = ref('');
const password = ref('');
const showPassword = ref(false);

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
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-1000 {
  animation-delay: 1s;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-ping-slow {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
