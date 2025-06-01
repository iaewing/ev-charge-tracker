import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/auth/login'
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        component: () => import('@/views/Auth/LoginPage.vue'),
        meta: { requiresGuest: true }
      },
      {
        path: 'register',
        component: () => import('@/views/Auth/RegisterPage.vue'),
        meta: { requiresGuest: true }
      }
    ]
  },
  {
    path: '/tabs',
    component: () => import('@/views/TabsPage.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/charge-events'
      },
      {
        path: 'charge-events',
        component: () => import('@/views/ChargeEvents/ChargeEventsPage.vue')
      },
      {
        path: 'analytics',
        component: () => import('@/views/Analytics/AnalyticsPage.vue')
      },
      {
        path: 'locations',
        component: () => import('@/views/Locations/LocationsPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings/SettingsPage.vue')
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
