<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/auth/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="register-container">
        <div class="logo-section">
          <ion-icon :icon="car" size="large" color="primary"></ion-icon>
          <h1>Create Account</h1>
          <p>Start tracking your EV charging today</p>
        </div>

        <form @submit.prevent="handleSignUp">
          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="floating">Full Name</ion-label>
            <ion-input
              v-model="displayName"
              type="text"
              required
              :disabled="authStore.isLoading"
            ></ion-input>
          </ion-item>

          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="floating">Email</ion-label>
            <ion-input
              v-model="email"
              type="email"
              required
              :disabled="authStore.isLoading"
            ></ion-input>
          </ion-item>

          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="floating">Password</ion-label>
            <ion-input
              v-model="password"
              type="password"
              required
              :disabled="authStore.isLoading"
            ></ion-input>
          </ion-item>

          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="floating">Confirm Password</ion-label>
            <ion-input
              v-model="confirmPassword"
              type="password"
              required
              :disabled="authStore.isLoading"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block"
            type="submit"
            class="ion-margin-top"
            :disabled="authStore.isLoading || !isFormValid"
          >
            <ion-spinner v-if="authStore.isLoading" name="crescent"></ion-spinner>
            <span v-else>Create Account</span>
          </ion-button>
        </form>

        <div class="auth-links">
          <ion-button
            fill="clear"
            @click="$router.push('/auth/login')"
          >
            Already have an account? Sign in
          </ion-button>
        </div>

        <ion-alert
          :is-open="!!authStore.error"
          :message="authStore.error || ''"
          :buttons="['OK']"
          @didDismiss="authStore.clearError()"
        ></ion-alert>

        <ion-alert
          :is-open="!!validationError"
          :message="validationError || ''"
          :buttons="['OK']"
          @didDismiss="validationError = null"
        ></ion-alert>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAlert,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { car } from 'ionicons/icons';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const validationError = ref<string | null>(null);

const isFormValid = computed(() => {
  return displayName.value.trim() && 
         email.value.trim() && 
         password.value && 
         confirmPassword.value &&
         password.value === confirmPassword.value &&
         password.value.length >= 6;
});

const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    validationError.value = 'Passwords do not match';
    return;
  }

  if (password.value.length < 6) {
    validationError.value = 'Password must be at least 6 characters';
    return;
  }

  try {
    await authStore.signUp(email.value, password.value, displayName.value);
    router.replace('/tabs/charge-events');
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 0;
}

.logo-section {
  text-align: center;
  margin-bottom: 3rem;
}

.logo-section h1 {
  margin: 1rem 0 0.5rem;
  color: var(--ion-color-primary);
}

.logo-section p {
  color: var(--ion-color-medium);
  margin: 0;
}

.auth-links {
  text-align: center;
  margin-top: 2rem;
}
</style> 