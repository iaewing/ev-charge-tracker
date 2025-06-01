import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/auth/login'
  },
  {
    path: '/auth/login',
    component: defineAsyncComponent(() => import('@/views/Auth/LoginPage.vue')),
    meta: { requiresGuest: true }
  },
  {
    path: '/auth/register',
    component: defineAsyncComponent(() => import('@/views/Auth/RegisterPage.vue')),
    meta: { requiresGuest: true }
  },
  {
    path: '/tabs',
    component: defineAsyncComponent(() => import('@/views/TabsPage.vue')),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/charge-events'
      },
      {
        path: 'charge-events',
        component: defineAsyncComponent(() => import('@/views/ChargeEvents/ChargeEventsPage.vue'))
      },
      {
        path: 'analytics',
        component: defineAsyncComponent(() => import('@/views/Analytics/AnalyticsPage.vue'))
      },
      {
        path: 'locations',
        component: defineAsyncComponent(() => import('@/views/Locations/LocationsPage.vue'))
      },
      {
        path: 'settings',
        component: defineAsyncComponent(() => import('@/views/Settings/SettingsPage.vue'))
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/auth/login'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  if (authStore.isAuthenticated === undefined) {
    await authStore.initializeAuth();
  }

  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;
  const isAuthenticated = authStore.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/auth/login');
  } else if (requiresGuest && isAuthenticated) {
    next('/tabs/charge-events');
  } else {
    next();
  }
});

export default router;
