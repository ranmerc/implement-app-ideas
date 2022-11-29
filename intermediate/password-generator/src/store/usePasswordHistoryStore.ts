import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Password {
  password: string;
  timestamp: string;
}

interface PasswordList {
  list: Password[];
  addPassword: (password: Password) => void;
  clearList: () => void;
}

const usePasswordHistoryStore = create<PasswordList>()(
  devtools(
    persist((set) => ({
      list: [],
      addPassword: (password) =>
        set((state) => ({
          ...state,
          list: [...state.list, password],
        })),
      clearList: () =>
        set((state) => ({
          ...state,
          list: [],
        })),
    }))
  )
);

export default usePasswordHistoryStore;
