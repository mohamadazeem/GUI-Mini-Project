<template>
  <div class="min-h-screen flex w-full bg-[#F8FAFC] dark:bg-[#0B0E14] font-sans transition-colors duration-500 overflow-hidden">
    
    <!-- LEFT SIDE: IMAGE & GREETING -->
    <div class="hidden lg:flex lg:w-1/2 relative h-screen overflow-hidden">
      <img 
        src="/new_login_image.png" 
        alt="Azeem Stores Member" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/90 via-[#1E3A8A]/40 to-transparent"></div>

      <!-- Glassmorphism Greeting Card -->
      <div class="relative z-10 flex flex-col justify-center items-start px-20 w-full h-full">
        <div class="bg-white/10 backdrop-blur-xl p-12 rounded-[3rem] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-fade-in-up">
          <button @click="$router.push('/login')" class="flex items-center gap-3 text-white/80 hover:text-white mb-10 transition-all group font-black uppercase tracking-[0.2em] text-[10px]">
            <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronLeftIcon class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span>Back to Login</span>
          </button>
          
          <h1 class="text-6xl font-black text-white tracking-tighter leading-none mb-4">Join Us.</h1>
          <p class="text-white/80 text-xl font-bold tracking-tight max-w-sm leading-relaxed">
            Create your account and unlock the full potential of <span class="text-sky-300 font-black">Azeem Stores</span>.
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: REGISTER FORM -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 relative">
      
      <!-- Mobile Greeting -->
      <div class="lg:hidden absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex flex-col justify-center px-10 rounded-b-[3rem]">
        <h1 class="text-3xl font-black text-white tracking-tighter mb-1">Join Azeem Stores</h1>
        <p class="text-white/80 text-[10px] font-black uppercase tracking-widest">Exclusive Membership</p>
      </div>

      <div class="w-full max-w-[500px] bg-white dark:bg-[#161B22] p-10 sm:p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-white/5 relative z-10 lg:mt-0 mt-20">
        
        <div class="mb-12">
          <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sign Up</h2>
          <div class="h-1.5 w-12 bg-sky-500 rounded-full mt-4"></div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5 pt-2">
          <!-- Full Name -->
          <div class="group">
            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2.5 block">Full Name</label>
            <div class="relative flex items-center">
              <div class="absolute left-6 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <UserIcon class="w-5 h-5" />
              </div>
              <input
                v-model="name"
                type="text"
                required
                class="w-full pl-16 pr-6 py-7 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent group-focus-within:border-sky-500 group-focus-within:bg-white dark:group-focus-within:bg-white/10 rounded-[1.5rem] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold text-base shadow-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <!-- Username -->
          <div class="group">
            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2.5 block">Username</label>
            <div class="relative flex items-center">
              <div class="absolute left-6 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <MailIcon class="w-5 h-5" />
              </div>
              <input
                v-model="username"
                type="text"
                required
                class="w-full pl-16 pr-6 py-7 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent group-focus-within:border-sky-500 group-focus-within:bg-white dark:group-focus-within:bg-white/10 rounded-[1.5rem] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold text-base shadow-sm"
                placeholder="Choose unique username"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="group">
            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2.5 block">Security Key</label>
            <div class="relative flex items-center">
              <div class="absolute left-6 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <LockIcon class="w-5 h-5" />
              </div>
              <input
                v-model="password"
                type="password"
                required
                class="w-full pl-16 pr-6 py-7 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent group-focus-within:border-sky-500 group-focus-within:bg-white dark:group-focus-within:bg-white/10 rounded-[1.5rem] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold text-base shadow-sm"
                placeholder="Min 8 characters"
              />
            </div>
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="isLoading || !username || !password || !name"
            class="w-full py-5 mt-6 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white font-black rounded-[1.25rem] transition-all shadow-xl shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group overflow-hidden relative"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Loader2Icon v-if="isLoading" class="w-5 h-5 animate-spin relative z-10" />
            <span class="tracking-[0.2em] uppercase text-xs relative z-10">{{ isLoading ? 'Processing...' : 'Register Account' }}</span>
            <ArrowRightIcon v-if="!isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
          </button>
        </form>

        <p class="mt-12 text-center text-[10px] font-bold text-slate-400 leading-relaxed max-w-xs mx-auto">
          By registering, you confirm your agreement with our <span class="text-sky-500 cursor-pointer">Terms of Service</span> and <span class="text-sky-500 cursor-pointer">Privacy Guidelines</span>.
        </p>

        <p class="mt-10 text-center text-[11px] font-bold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-10">
          Existing member? 
          <router-link to="/login" class="text-sky-500 font-black hover:underline uppercase tracking-widest ml-1 transition-colors">Sign In Here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { 
  UserIcon,
  LockIcon, 
  MailIcon,
  Loader2Icon,
  ChevronLeftIcon,
  ArrowRightIcon
} from 'lucide-vue-next';

const router = useRouter();
const { login } = useAuth();

const name = ref('');
const username = ref('');
const password = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  if (!username.value || !password.value || !name.value) return;
  isLoading.value = true;
  await new Promise(res => setTimeout(res, 1500));
  await login('emilys', 'emilyspass');
  router.push('/');
  isLoading.value = false;
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
</style>
