<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Saved Locations</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">
      <h2>Saved Charging Locations</h2>
      <p>Save your frequently used charging locations coming in Phase 2!</p>
      
      <ion-card>
        <ion-card-header>
          <ion-card-title>Your Locations</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Location management features will be implemented in Phase 2</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';
</script> 