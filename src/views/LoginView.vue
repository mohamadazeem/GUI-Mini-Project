<template>
  <div class="min-h-screen flex w-full bg-[#F8FAFC] dark:bg-[#0B0E14] font-sans transition-colors duration-500 overflow-hidden">
    
    <!-- LEFT SIDE: IMAGE & GREETING -->
    <div class="hidden lg:flex lg:w-1/2 relative h-screen overflow-hidden">
      <!-- Background Image -->
      <img 
        src="/new_login_image.png" 
        alt="Azeem Stores Premium" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/90 via-[#1E3A8A]/40 to-transparent"></div>

      <!-- Glassmorphism Greeting Card -->
      <div class="relative z-10 flex flex-col justify-center items-start px-20 w-full h-full">
        <div class="bg-white/10 backdrop-blur-xl p-12 rounded-[3rem] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-fade-in-up">
          <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-inner">
            <ShoppingBagIcon class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-6xl font-black text-white tracking-tighter leading-none mb-4">Hello!</h1>
          <p class="text-white/80 text-xl font-bold tracking-tight max-w-sm leading-relaxed">
            Welcome to <span class="text-sky-300 font-black">Azeem Stores</span>. Experience shopping at its finest.
          </p>
          
          <div class="mt-12 flex items-center gap-4 text-white/60 text-xs font-black uppercase tracking-[0.2em]">
            <div class="w-12 h-px bg-white/20"></div>
            <span>Trusted by 50K+ Shoppers</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: LOGIN FORM -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 relative">
      
      <!-- Mobile Greeting -->
      <div class="lg:hidden absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex flex-col justify-center px-10 rounded-b-[3rem]">
        <h1 class="text-4xl font-black text-white tracking-tighter mb-1">Hello!</h1>
        <p class="text-white/80 text-sm font-bold tracking-tight">Welcome to Azeem Stores</p>
      </div>

      <div class="w-full max-w-[460px] bg-white dark:bg-[#161B22] p-10 sm:p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-white/5 relative z-10 lg:mt-0 mt-32">
        
        <div class="mb-12">
          <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Login</h2>
          <div class="h-1.5 w-12 bg-sky-500 rounded-full mt-4"></div>
        </div>

        <!-- Error message -->
        <transition name="fade">
          <div v-if="error" class="mb-8 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-2xl text-[11px] font-black uppercase tracking-wider flex items-center border border-rose-200 dark:border-rose-900/30 shadow-sm">
            <AlertCircleIcon class="h-4 w-4 mr-3" />
            <span>{{ error }}</span>
          </div>
        </transition>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username -->
          <div class="group">
            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2.5 block">Account Username</label>
            <div class="relative flex items-center">
              <div class="absolute left-6 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <UserIcon class="w-5 h-5" />
              </div>
              <input
                v-model="username"
                type="text"
                required
                class="w-full pl-16 pr-6 py-7 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent group-focus-within:border-sky-500 group-focus-within:bg-white dark:group-focus-within:bg-white/10 rounded-[1.5rem] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold text-base shadow-sm"
                placeholder="e.g. emilys"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="group">
            <div class="flex justify-between items-center ml-1 mb-2.5">
              <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Security Password</label>
              <a href="#" class="text-[10px] font-black text-sky-500 hover:text-sky-600 uppercase tracking-[0.15em] transition-colors">Forgot?</a>
            </div>
            <div class="relative flex items-center">
              <div class="absolute left-6 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <LockIcon class="w-5 h-5" />
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-16 pr-16 py-7 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent group-focus-within:border-sky-500 group-focus-within:bg-white dark:group-focus-within:bg-white/10 rounded-[1.5rem] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold text-base shadow-sm"
                placeholder="••••••••"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-5 text-slate-400 hover:text-sky-500 transition-colors">
                <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading || !username || !password"
            class="w-full py-5 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white font-black rounded-[1.25rem] transition-all shadow-xl shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group overflow-hidden relative"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Loader2Icon v-if="isLoading" class="w-5 h-5 animate-spin relative z-10" />
            <span class="tracking-[0.2em] uppercase text-xs relative z-10">{{ isLoading ? 'Verifying...' : 'Access Dashboard' }}</span>
            <ArrowRightIcon v-if="!isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
          </button>
        </form>

        <!-- Social Login -->
        <div class="mt-14">
          <div class="relative w-full flex items-center justify-center mb-10">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-white/5"></div></div>
            <span class="relative px-6 bg-white dark:bg-[#161B22] text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Instant Connect</span>
          </div>

          <div class="flex gap-4">
            <button v-for="social in socialButtons" :key="social.name" class="flex-1 h-16 rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center hover:scale-105 active:scale-95 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md group">
              <component :is="social.icon" class="w-5 h-5 transition-transform group-hover:scale-110" :style="{ color: social.color }" />
            </button>
          </div>
        </div>

        <p class="mt-14 text-center text-[11px] font-bold text-slate-500 dark:text-slate-400">
          Not a member yet? 
          <router-link to="/register" class="text-sky-500 font-black hover:underline uppercase tracking-widest ml-1 transition-colors">Join Azeem Stores</router-link>
        </p>

        <!-- Demo Help -->
        <div class="mt-10 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.15em] leading-relaxed">
          Demo: emilys / emilyspass
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
  EyeIcon, 
  EyeOffIcon, 
  Loader2Icon,
  AlertCircleIcon,
  ShoppingBagIcon,
  FacebookIcon,
  GithubIcon,
  TwitterIcon,
  ArrowRightIcon
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const { login, isLoading, error } = useAuth();

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const socialButtons = [
  { name: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
  { name: 'Google', icon: GithubIcon, color: '#333' },
  { name: 'Apple', icon: TwitterIcon, color: '#000' }
];

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
