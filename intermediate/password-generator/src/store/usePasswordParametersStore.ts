import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface PasswordParameters {
  length: number;
  capital: boolean;
  small: boolean;
  numbers: boolean;
  symbols: boolean;
  setLength: (value: number) => void;
  toggleCapital: () => void;
  toggleSmall: () => void;
  toggleNumbers: () => void;
  toggleSymbols: () => void;
}

const usePasswordParametersStore = create<PasswordParameters>()(
  devtools(
    persist((set) => ({
      length: 10,
      capital: false,
      small: true,
      numbers: false,
      symbols: false,
      setLength: (value: number) =>
        set((state) => ({
          ...state,
          length: value,
        })),
      toggleCapital: () =>
        set((state) => ({
          ...state,
          capital: !state.capital,
        })),
      toggleSmall: () =>
        set((state) => ({
          ...state,
          small: !state.small,
        })),
      toggleNumbers: () =>
        set((state) => ({
          ...state,
          numbers: !state.numbers,
        })),
      toggleSymbols: () =>
        set((state) => ({
          ...state,
          symbols: !state.symbols,
        })),
    }))
  )
);

export default usePasswordParametersStore;
