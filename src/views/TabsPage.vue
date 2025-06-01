<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="charge-events" href="/tabs/charge-events">
          <ion-icon aria-hidden="true" :icon="flash"></ion-icon>
          <ion-label>Charges</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="analytics" href="/tabs/analytics">
          <ion-icon aria-hidden="true" :icon="barChart"></ion-icon>
          <ion-label>Analytics</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="locations" href="/tabs/locations">
          <ion-icon aria-hidden="true" :icon="location"></ion-icon>
          <ion-label>Locations</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settings"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonPage, 
  IonRouterOutlet 
} from '@ionic/vue';
import { flash, barChart, location, settings } from 'ionicons/icons';
</script> 