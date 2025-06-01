import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useTheme() {
  const authStore = useAuthStore();
  const isDark = ref(false);

  const initializeTheme = () => {
    // Check user preference first
    if (authStore.currentUser?.settings.darkMode !== undefined) {
      isDark.value = authStore.currentUser.settings.darkMode;
    } else {
      // Fall back to system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    applyTheme();
  };

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const toggleTheme = async () => {
    isDark.value = !isDark.value;
    applyTheme();
    
    // Save to user settings if authenticated
    if (authStore.isAuthenticated) {
      await authStore.updateUserSettings({ darkMode: isDark.value });
    }
  };

  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (authStore.currentUser?.settings.darkMode === undefined) {
      isDark.value = e.matches;
      applyTheme();
    }
  };

  mediaQuery.addEventListener('change', handleSystemThemeChange);

  // Watch for auth state changes
  watch(() => authStore.currentUser, (user) => {
    if (user?.settings.darkMode !== undefined) {
      isDark.value = user.settings.darkMode;
      applyTheme();
    }
  });

  return {
    isDark,
    toggleTheme,
    initializeTheme
  };
} 