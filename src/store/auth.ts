import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();
// Clear auth state from previous session on new session start
if (!cookies.get('session_started')) {
  cookies.set('session_started', true);
  localStorage.removeItem('auth-storage-sync');
}

interface AuthState {
  isLoggedIn: boolean;
  loggedInUserId: number;
  login: (userId: number) => void;
  logout: () => void;
  _setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      loggedInUserId: 0,
      login: (userId: number) => {
        set({ isLoggedIn: true, loggedInUserId: userId });
        localStorage.setItem('auth-storage-sync', JSON.stringify({ isLoggedIn: true, ts: Date.now() }));
      },
      logout: () => {
        set({ isLoggedIn: false, loggedInUserId: 0 });
        localStorage.setItem('auth-storage-sync', JSON.stringify({ isLoggedIn: false, ts: Date.now() }));
      },
      _setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Sync state across tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'auth-storage-sync' && e.newValue) {
    try {
      const { isLoggedIn } = JSON.parse(e.newValue);
      const currentState = useAuthStore.getState().isLoggedIn;
      if (currentState !== isLoggedIn) {
        useAuthStore.getState()._setIsLoggedIn(isLoggedIn);
      }
    } catch (error) {
      console.error("Error parsing auth-storage-sync", error);
    }
  }
});

// Initial sync when a new tab opens
const initialSync = () => {
  try {
    const storedState = localStorage.getItem('auth-storage-sync');
    if (storedState) {
      const { isLoggedIn } = JSON.parse(storedState);
      const currentState = useAuthStore.getState().isLoggedIn;
      if (currentState !== isLoggedIn) {
        useAuthStore.getState()._setIsLoggedIn(isLoggedIn);
      }
    }
  } catch (error) {
    console.error("Error during initial auth sync", error);
  }
};

initialSync();

export default useAuthStore;
