<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="bg-gray-50 dark:bg-gray-900">
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <ion-icon :icon="car" class="h-10 w-10 text-primary-600 dark:text-primary-400"></ion-icon>
            </div>
            <h1 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">EV Charge Tracker</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Track your charging costs and efficiency</p>
          </div>

          <form @submit.prevent="handleSignIn" class="mt-8 space-y-6">
            <div class="space-y-4">
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  :disabled="authStore.isLoading"
                  class="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  :disabled="authStore.isLoading"
                  class="form-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="authStore.isLoading || !email || !password"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ion-spinner v-if="authStore.isLoading" name="crescent" class="h-5 w-5"></ion-spinner>
              <span v-else>Sign In</span>
            </button>
          </form>

          <div class="text-center">
            <button
              @click="$router.push('/auth/register')"
              class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>

          <ion-alert
            :is-open="!!authStore.error"
            :message="authStore.error || ''"
            :buttons="['OK']"
            @didDismiss="authStore.clearError()"
          ></ion-alert>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonSpinner,
  IonAlert
} from '@ionic/vue';
import { car } from 'ionicons/icons';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleSignIn = async () => {
  try {
    await authStore.signIn(email.value, password.value);
    router.replace('/tabs/charge-events');
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};
</script> 