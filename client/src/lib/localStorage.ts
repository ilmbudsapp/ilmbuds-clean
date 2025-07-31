// Local storage utility for ILMBUDS app
export const localStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },

  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },

  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },

  clear: (): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  }
};

export default localStorage;