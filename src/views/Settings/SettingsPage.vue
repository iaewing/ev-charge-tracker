<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="bg-gray-50 dark:bg-gray-900">
      <div class="max-w-2xl mx-auto p-4 space-y-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        
        <!-- Currency Settings -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Currency Preferences</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Default Currency (for new charges)</label>
              <select 
                v-model="defaultCurrency" 
                @change="updateSettings"
                class="form-input"
              >
                <option v-for="currency in supportedCurrencies" :key="currency.code" :value="currency.code">
                  {{ currency.symbol }} {{ currency.name }} ({{ currency.code }})
                </option>
              </select>
            </div>

            <div>
              <label class="form-label">Display Currency (for analytics)</label>
              <select 
                v-model="displayCurrency" 
                @change="updateSettings"
                class="form-input"
              >
                <option v-for="currency in supportedCurrencies" :key="currency.code" :value="currency.code">
                  {{ currency.symbol }} {{ currency.name }} ({{ currency.code }})
                </option>
              </select>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                All costs will be converted to this currency for analytics
              </p>
            </div>
          </div>
        </div>

        <!-- Distance Settings -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distance Unit</h3>
          
          <select 
            v-model="distanceUnit" 
            @change="updateSettings"
            class="form-input"
          >
            <option value="km">Kilometers</option>
            <option value="miles">Miles</option>
          </select>
        </div>

        <!-- Appearance Settings -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</label>
              <p class="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark themes</p>
            </div>
            <button
              @click="toggleTheme"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                isDark ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isDark ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
          
          <div class="space-y-4">
            <div>
              <label class="form-label">Email</label>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ authStore.currentUser?.email }}
              </div>
            </div>
            
            <div>
              <label class="form-label">Display Name</label>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ authStore.currentUser?.displayName }}
              </div>
            </div>
            
            <button
              @click="logout"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-danger-600 hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500 transition-colors"
            >
              <ion-icon :icon="logOut" class="mr-2"></ion-icon>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/vue';
import { logOut } from 'ionicons/icons';
import { useAuthStore } from '@/stores/auth';
import { useTheme } from '@/composables/useTheme';
import { CurrencyService } from '@/services/currency';

const router = useRouter();
const authStore = useAuthStore();
const { isDark, toggleTheme } = useTheme();

const defaultCurrency = ref('CAD');
const displayCurrency = ref('CAD');
const distanceUnit = ref('km');
const supportedCurrencies = CurrencyService.getSupportedCurrencies();

onMounted(() => {
  if (authStore.currentUser?.settings) {
    defaultCurrency.value = authStore.currentUser.settings.defaultCurrency;
    displayCurrency.value = authStore.currentUser.settings.displayCurrency;
    distanceUnit.value = authStore.currentUser.settings.distanceUnit;
  }
});

const updateSettings = async () => {
  try {
    await authStore.updateUserSettings({
      defaultCurrency: defaultCurrency.value,
      displayCurrency: displayCurrency.value,
      distanceUnit: distanceUnit.value
    });
  } catch (error) {
    console.error('Failed to update settings:', error);
  }
};

const logout = async () => {
  await authStore.logout();
  router.replace('/auth/login');
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: var(--ion-color-primary);
  margin-bottom: 1rem;
}
</style> 