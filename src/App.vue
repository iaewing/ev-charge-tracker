<template>
  <ion-app class="theme-transition">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useTheme } from '@/composables/useTheme';

const authStore = useAuthStore();
const { initializeTheme } = useTheme();

onMounted(async () => {
  await authStore.initializeAuth();
  initializeTheme();
});
</script>

<style scoped>
/* Add your styles here */
</style>
