<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-slate-700 dark:text-slate-300 transition-colors mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Section: Brand & Links -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        
        <!-- Brand & About (Col span 4) -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBagIcon class="w-5 h-5 text-white" />
            </div>
            <span class="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              Azeem <span class="text-indigo-600 dark:text-indigo-400">Stores</span>
            </span>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            Your premium destination for the finest products. We offer high-quality items, exclusive deals, and an exceptional shopping experience right at your fingertips.
          </p>
          <div class="flex items-center gap-3">
            <a href="#" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700">
              <FacebookIcon class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700">
              <InstagramIcon class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700">
              <TwitterIcon class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700">
              <YoutubeIcon class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Links Columns (Col span 8) -->
        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          
          <!-- Column 1 -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Shop</h3>
            <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Best Sellers</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">On Sale</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">All Products</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h3>
            <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Store Locator</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Press & Media</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Affiliates</a></li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Support</h3>
            <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shipping Returns</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Size Guide</a></li>
            </ul>
          </div>


        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="border-t border-b border-slate-200 dark:border-slate-800 py-10 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/30 px-6 rounded-3xl">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center shrink-0">
            <MailIcon class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white text-lg">Subscribe to our newsletter</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Get the latest updates on new products and upcoming sales.</p>
          </div>
        </div>
        <form @submit.prevent="" class="flex w-full lg:w-auto max-w-md gap-2">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            class="w-full px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all shadow-sm"
            required
          />
          <button type="submit" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Subscribe
          </button>
        </form>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-2">
        <p class="font-medium">
          &copy; {{ new Date().getFullYear() }} Azeem Stores. All rights reserved.
        </p>
        
        <!-- Policy Links -->
        <div class="flex gap-6 font-medium">
          <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
        </div>

        <!-- Payment Methods (SVG placeholders) -->
        <div class="flex items-center gap-2">
          <div class="w-11 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">VISA</div>
          <div class="w-11 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">MC</div>
          <div class="w-11 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">AMEX</div>
          <div class="w-11 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">PAYPAL</div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { 
  ShoppingBagIcon, 
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  MailIcon
} from 'lucide-vue-next';
</script>
