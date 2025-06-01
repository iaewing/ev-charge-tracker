import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import type { User, UserSettings } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null);
  const isAuthenticated = computed(() => !!currentUser.value);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const initializeAuth = () => {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          await loadUserData(firebaseUser);
        } else {
          currentUser.value = null;
        }
        resolve();
      });
    });
  };

  const loadUserData = async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        currentUser.value = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || userData.displayName || '',
          createdAt: userData.createdAt?.toDate() || new Date(),
          settings: userData.settings || getDefaultSettings()
        };
      } else {
        await createUserDocument(firebaseUser);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      error.value = 'Failed to load user data';
    }
  };

  const createUserDocument = async (firebaseUser: FirebaseUser) => {
    const defaultSettings = getDefaultSettings();
    const newUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      createdAt: new Date(),
      settings: defaultSettings
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      email: newUser.email,
      displayName: newUser.displayName,
      createdAt: newUser.createdAt,
      settings: newUser.settings
    });

    currentUser.value = newUser;
  };

  const getDefaultSettings = (): UserSettings => ({
    defaultCurrency: 'CAD',
    displayCurrency: 'CAD',
    distanceUnit: 'km',
    darkMode: false
  });

  const signIn = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      error.value = err.message || 'Failed to sign in';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(user, { displayName });
      await createUserDocument(user);
    } catch (err: any) {
      error.value = err.message || 'Failed to create account';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      currentUser.value = null;
    } catch (err: any) {
      error.value = err.message || 'Failed to sign out';
      throw err;
    }
  };

  const updateUserSettings = async (settings: Partial<UserSettings>) => {
    if (!currentUser.value) return;

    try {
      const updatedSettings = { ...currentUser.value.settings, ...settings };
      
      await setDoc(doc(db, 'users', currentUser.value.id), {
        settings: updatedSettings
      }, { merge: true });

      currentUser.value.settings = updatedSettings;
    } catch (err: any) {
      error.value = err.message || 'Failed to update settings';
      throw err;
    }
  };

  const toggleDarkMode = async () => {
    if (!currentUser.value) return;
    
    const newDarkMode = !currentUser.value.settings.darkMode;
    await updateUserSettings({ darkMode: newDarkMode });
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const initializeDarkMode = () => {
    if (currentUser.value?.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    initializeAuth,
    signIn,
    signUp,
    logout,
    updateUserSettings,
    toggleDarkMode,
    initializeDarkMode,
    clearError
  };
}); 