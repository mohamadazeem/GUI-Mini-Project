<template>
  <nav class="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-sm dark:shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center gap-2 px-3 py-2 -ml-3 rounded-xl transition-all flex-shrink-0"
          :class="route.path === '/' ? 'bg-indigo-50 dark:bg-white/10 ring-1 ring-indigo-100 dark:ring-white/20' : 'hover:bg-slate-50 dark:hover:bg-white/5'"
        >
          <div class="bg-indigo-600 dark:bg-indigo-500 text-white p-1.5 rounded-lg shadow-sm">
            <ShoppingBagIcon class="w-5 h-5" />
          </div>
          <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden lg:block">
            Azeem <span class="text-indigo-600 dark:text-indigo-400">Stores</span>
          </span>
        </router-link>

        <!-- Search Bar in Center -->
        <div class="flex-1 max-w-xl mx-4 lg:mx-8 hidden sm:block">
          <SearchBar v-model="globalSearchQuery" />
        </div>

        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Home link -->
          <router-link
            to="/"
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            :class="route.path === '/' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-100 dark:ring-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'"
          >
            <HomeIcon class="w-4 h-4" />
            <span class="hidden sm:block">Home</span>
          </router-link>

          <!-- Shop link -->
          <router-link
            to="/shop"
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            :class="route.path === '/shop' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-100 dark:ring-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'"
          >
            <ShoppingBagIcon class="w-4 h-4" />
            <span class="hidden sm:block">Shop</span>
          </router-link>

          <!-- Deals link -->
          <router-link
            to="/deals"
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            :class="route.path === '/deals' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 ring-1 ring-red-100 dark:ring-red-500/30' : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-50 dark:hover:bg-white/10'"
          >
            <span class="hidden sm:block">Deals 🔥</span>
          </router-link>

          <button
            @click="toggleDarkMode"
            class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>

          <router-link
            to="/wishlist"
            class="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Wishlist"
          >
            <HeartIcon class="w-6 h-6" />
            <span
              v-if="totalWishlistItems > 0"
              class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-500 rounded-full border-2 border-white dark:border-slate-900"
            >
              {{ totalWishlistItems > 99 ? '99+' : totalWishlistItems }}
            </span>
          </router-link>

          <router-link
            to="/cart"
            class="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon class="w-6 h-6" />
            <span
              v-if="totalItems > 0"
              class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"
            >
              {{ totalItems > 99 ? '99+' : totalItems }}
            </span>
          </router-link>

          <!-- Logged-in user info -->
          <div v-if="isAuthenticated" class="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
            <router-link to="/profile" class="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition group">
              <img
                :src="user?.image || 'https://via.placeholder.com/150'"
                :alt="user?.firstName"
                class="w-8 h-8 rounded-full ring-2 ring-indigo-500/50 group-hover:ring-indigo-600 dark:group-hover:ring-indigo-400 object-cover transition-all"
              />
              <span class="hidden sm:block text-sm font-medium">{{ user?.firstName }}</span>
            </router-link>
            <button
              @click="handleLogout"
              class="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOutIcon class="w-4 h-4" />
              <span class="hidden sm:block">Logout</span>
            </button>
          </div>

          <!-- Login button -->
          <router-link
            v-else
            to="/login"
            class="flex items-center space-x-1.5 text-sm font-medium px-5 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all ml-2"
          >
            <UserCircleIcon class="w-4 h-4" />
            <span>Login</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ShoppingCartIcon, ShoppingBagIcon, SunIcon, MoonIcon, UserCircleIcon, LogOutIcon, HomeIcon, HeartIcon } from 'lucide-vue-next';
import SearchBar from './SearchBar.vue';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/useWishlist';
import { useDarkMode } from '../composables/useDarkMode';
import { useAuth } from '../composables/useAuth';
import { useSearch } from '../composables/useSearch';

const router = useRouter();
const route = useRoute();
const { totalItems } = useCart();
const { totalWishlistItems } = useWishlist();
const { isDark, initDarkMode, toggleDarkMode } = useDarkMode();
const { isAuthenticated, user, logout } = useAuth();
const { globalSearchQuery } = useSearch();

const handleLogout = () => {
  logout();
  router.push('/login');
};

onMounted(() => {
  initDarkMode();
});
</script>
