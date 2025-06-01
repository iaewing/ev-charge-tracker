<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Charge Events</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">
            <ion-icon :icon="logOut" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="welcome-section">
        <h2>Welcome, {{ authStore.currentUser?.displayName || 'User' }}!</h2>
        <p>Start tracking your EV charging sessions</p>
      </div>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Recent Charges</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>No charge events yet. Add your first charge to get started!</p>
        </ion-card-content>
      </ion-card>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addCharge">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { add, logOut } from 'ionicons/icons';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  router.replace('/auth/login');
};

const addCharge = () => {
  console.log('Add charge functionality - to be implemented in Phase 2');
};
</script>

<style scoped>
.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-section h2 {
  color: var(--ion-color-primary);
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: var(--ion-color-medium);
}
</style> 