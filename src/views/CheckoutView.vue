<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Checkout</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Complete your order
          </p>
        </div>
        <router-link
          to="/cart"
          class="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-1" />
          Back to Cart
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Details -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <UserIcon class="w-5 h-5 text-indigo-500" />
              Customer Details
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1 md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  :class="{'border-red-500': showErrors && !form.name}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  :class="{'border-red-500': showErrors && (!form.email || !isValidEmail(form.email))}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="john@example.com"
                />
                <span v-if="showErrors && form.email && !isValidEmail(form.email)" class="text-xs text-red-500">Invalid email format</span>
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number *</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  :class="{'border-red-500': showErrors && !form.phone}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <MapPinIcon class="w-5 h-5 text-indigo-500" />
              Shipping Address
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1 md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Street Address *</label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  :class="{'border-red-500': showErrors && !form.address}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="123 Main St"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">City *</label>
                <input
                  v-model="form.city"
                  type="text"
                  required
                  :class="{'border-red-500': showErrors && !form.city}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="New York"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">ZIP / Postal Code *</label>
                <input
                  v-model="form.zip"
                  type="text"
                  required
                  :class="{'border-red-500': showErrors && !form.zip}"
                  class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <CreditCardIcon class="w-5 h-5 text-indigo-500" />
              Payment Method
            </h2>
            <div class="space-y-4">
              <!-- Card Payment Option -->
              <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors"
                     :class="paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'">
                <div class="flex items-center h-5">
                  <input v-model="paymentMethod" type="radio" value="card" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                </div>
                <div class="flex-1">
                  <span class="block text-sm font-medium text-slate-900 dark:text-white">Credit / Debit Card</span>
                  <span class="block text-sm text-slate-500 dark:text-slate-400 mt-1">Pay securely with your bank card</span>
                  
                  <!-- Card Fields (Dummy) -->
                  <div v-if="paymentMethod === 'card'" class="mt-4 grid grid-cols-2 gap-4" @click.stop>
                    <div class="col-span-2 space-y-1">
                      <label class="block text-xs font-medium text-slate-700 dark:text-slate-300">Card Number *</label>
                      <input
                        v-model="form.cardNumber"
                        type="text"
                        :class="{'border-red-500': showErrors && paymentMethod === 'card' && !form.cardNumber}"
                        class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                      />
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-medium text-slate-700 dark:text-slate-300">Expiry (MM/YY) *</label>
                      <input
                        v-model="form.cardExpiry"
                        type="text"
                        :class="{'border-red-500': showErrors && paymentMethod === 'card' && !form.cardExpiry}"
                        class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        placeholder="MM/YY"
                        maxlength="5"
                      />
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-medium text-slate-700 dark:text-slate-300">CVC *</label>
                      <input
                        v-model="form.cardCvc"
                        type="text"
                        :class="{'border-red-500': showErrors && paymentMethod === 'card' && !form.cardCvc}"
                        class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        placeholder="123"
                        maxlength="4"
                      />
                    </div>
                  </div>
                </div>
              </label>

              <!-- Cash on Delivery Option -->
              <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors"
                     :class="paymentMethod === 'cod' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'">
                <div class="flex items-center h-5">
                  <input v-model="paymentMethod" type="radio" value="cod" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                </div>
                <div>
                  <span class="block text-sm font-medium text-slate-900 dark:text-white">Cash on Delivery</span>
                  <span class="block text-sm text-slate-500 dark:text-slate-400 mt-1">Pay when your order arrives</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sticky top-24">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-5">Order Summary</h2>

            <!-- Items -->
            <div class="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cart" :key="item.product.id" class="flex gap-4">
                <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <img :src="item.product.thumbnail" :alt="item.product.title" class="h-full w-full object-cover object-center" />
                </div>
                <div class="flex flex-1 flex-col justify-center">
                  <h3 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{{ item.product.title }}</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Qty: {{ item.quantity }}</p>
                  <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    Rs. {{ (item.product.price * item.quantity * 300).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-3 text-sm pb-4 border-b border-slate-200 dark:border-slate-700">
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>Rs. {{ (totalPrice * 300).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span class="text-green-500 font-medium">Free</span>
              </div>
              <div class="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax (8%)</span>
                <span>Rs. {{ (tax * 300).toLocaleString() }}</span>
              </div>
            </div>

            <div class="mt-4 flex justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span class="text-indigo-600 dark:text-indigo-400 text-xl">Rs. {{ (finalTotal * 300).toLocaleString() }}</span>
            </div>

            <button 
              @click="handlePlaceOrder"
              :disabled="cart.length === 0 || isProcessing"
              class="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <template v-if="isProcessing">
                <Loader2Icon class="w-5 h-5 animate-spin" />
                Processing...
              </template>
              <template v-else>
                <CheckCircleIcon class="w-5 h-5" />
                Place Order
              </template>
            </button>

            <div v-if="showErrors && !isFormValid" class="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-start gap-2">
              <AlertCircleIcon class="w-5 h-5 shrink-0" />
              <span>Please fill in all required fields correctly.</span>
            </div>
            
            <div class="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <ShieldCheckIcon class="w-4 h-4" />
              <span>Secure & encrypted connection</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { useToast } from '../composables/useToast';
import {
  ArrowLeftIcon,
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  Loader2Icon,
  AlertCircleIcon
} from 'lucide-vue-next';

const router = useRouter();
const { cart, totalItems, totalPrice, clearCart } = useCart();
const { addToast } = useToast();

// Redirect to cart if empty
onMounted(() => {
  if (cart.value.length === 0) {
    router.replace('/cart');
  }
});

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: ''
});

const paymentMethod = ref<'card' | 'cod'>('card');
const showErrors = ref(false);
const isProcessing = ref(false);

const tax = computed(() => totalPrice.value * 0.08);
const finalTotal = computed(() => totalPrice.value + tax.value);

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isFormValid = computed(() => {
  const isBasicValid = 
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    isValidEmail(form.value.email) &&
    form.value.phone.trim() !== '' &&
    form.value.address.trim() !== '' &&
    form.value.city.trim() !== '' &&
    form.value.zip.trim() !== '';

  if (!isBasicValid) return false;

  if (paymentMethod.value === 'card') {
    return (
      form.value.cardNumber.trim() !== '' &&
      form.value.cardExpiry.trim() !== '' &&
      form.value.cardCvc.trim() !== ''
    );
  }

  return true;
});

const handlePlaceOrder = async () => {
  showErrors.value = true;
  
  if (!isFormValid.value) {
    return;
  }

  isProcessing.value = true;

  // Simulate API call for order processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Save order to history
  const order = {
    id: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    date: new Date().toISOString(),
    total: finalTotal.value,
    items: [...cart.value]
  };
  
  const existingOrders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
  existingOrders.unshift(order);
  localStorage.setItem('ecommerce_orders', JSON.stringify(existingOrders));

  // Clear the cart
  clearCart();
  
  isProcessing.value = false;
  addToast('Order placed successfully!', 'success');

  // Navigate to success page
  router.push('/order-success');
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
</style>
