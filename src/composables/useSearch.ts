import { ref } from 'vue';

const globalSearchQuery = ref('');

export function useSearch() {
  return {
    globalSearchQuery,
  };
}
