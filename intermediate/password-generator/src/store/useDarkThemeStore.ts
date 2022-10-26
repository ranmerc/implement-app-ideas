import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleDark: () => void;
}

const useThemeStore = create<ThemeState>()(
  devtools(
    persist((set) => ({
      isDark: false,
      toggleDark: () => set((state) => ({ isDark: !state.isDark })),
    }))
  )
);

export default useThemeStore;
