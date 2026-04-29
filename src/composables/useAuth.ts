import { ref, computed } from 'vue';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const user = ref<User | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Initialize from local storage on load
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try {
    user.value = JSON.parse(storedUser);
  } catch (e) {
    console.error('Failed to parse stored user', e);
    localStorage.removeItem('user');
  }
}

export function useAuth() {
  const login = async (username: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // optional
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const userData: User = await response.json();
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated,
  };
}
