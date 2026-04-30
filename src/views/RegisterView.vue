<template>
  <div class="h-full flex w-full bg-white dark:bg-[#0B0E14] font-sans overflow-hidden">
    
    <!-- LEFT SIDE: IMAGE & GREETING -->
    <div class="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
      <img 
        src="/new_login_image.png" 
        alt="Azeem Stores Member" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/90 via-[#1E40AF]/40 to-transparent"></div>

      <div class="relative z-10 flex flex-col justify-center items-start px-20 w-full h-full">
        <div class="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-2xl animate-fade-in-up">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
            <UserPlusIcon class="w-7 h-7 text-white" />
          </div>
          <h1 class="text-5xl font-black text-white tracking-tighter leading-none mb-4">Join Us.</h1>
          <p class="text-white/80 text-lg font-bold tracking-tight max-w-sm leading-relaxed">
            Create your account and unlock the full potential of <span class="text-sky-300 font-black">Azeem Stores</span>.
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: COMPACT REGISTER FORM -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div class="w-full max-w-[420px] flex flex-col items-center animate-fade-in scale-90 sm:scale-95">
        
        <!-- Logo Header -->
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShoppingBagIcon class="w-4 h-4 text-white" />
          </div>
          <h1 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Azeem Stores</h1>
        </div>

        <!-- Welcome Text -->
        <div class="w-full mb-5 text-left px-2">
          <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-0.5 leading-tight">Create Account</h2>
          <p class="text-slate-400 dark:text-slate-500 font-medium text-sm">Fill in your details to get started.</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="w-full space-y-3 px-2">
          <!-- Full Name -->
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1">Full Name</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
              placeholder="e.g. John Doe"
            />
          </div>

          <!-- Username -->
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1">Username</label>
            <input
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
              placeholder="Choose a username"
            />
          </div>

          <!-- Password -->
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
              placeholder="Min. 8 characters"
            />
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="isLoading || !username || !password || !name"
            class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-base mt-2"
          >
            <Loader2Icon v-if="isLoading" class="w-5 h-5 animate-spin mr-2" />
            <span>{{ isLoading ? 'Creating...' : 'Register Now' }}</span>
          </button>
        </form>

        <p class="mt-4 text-center text-[9px] font-bold text-slate-400 leading-relaxed max-w-xs mx-auto">
          By registering, you agree to our <span class="text-blue-500 cursor-pointer">Terms</span> and <span class="text-blue-500 cursor-pointer">Privacy Policy</span>.
        </p>

        <!-- Footer -->
        <div class="w-full pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex justify-center">
          <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            Already a member? 
            <router-link to="/login" class="text-blue-600 font-black hover:underline uppercase tracking-widest text-[9px] ml-1">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { 
  ShoppingBagIcon, 
  UserPlusIcon,
  Loader2Icon,
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
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

