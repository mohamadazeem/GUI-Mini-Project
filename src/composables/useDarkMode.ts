import { ref, watchEffect } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  const initDarkMode = () => {
    // Check localStorage or system preference
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      isDark.value = true;
    } else {
      isDark.value = false;
    }
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
  };

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });

  return {
    isDark,
    initDarkMode,
    toggleDarkMode,
  };
}
