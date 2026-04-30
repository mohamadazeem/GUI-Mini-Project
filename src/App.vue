<template>
  <div class="h-screen flex flex-col font-sans antialiased transition-colors duration-300 overflow-hidden">
    <NavBar class="flex-shrink-0" />
    
    <main class="flex-grow overflow-y-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      
      <Footer v-if="!hideFooter" />
    </main>
    
    <CartSidebar />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import CartSidebar from './components/CartSidebar.vue';
import ToastContainer from './components/ToastContainer.vue';
import { useDarkMode } from './composables/useDarkMode';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const { initDarkMode } = useDarkMode();
const route = useRoute();

const hideFooter = computed(() => ['/shop', '/login', '/register'].includes(route.path));

onMounted(() => {
  initDarkMode();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
