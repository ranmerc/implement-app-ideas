import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface PassphraseParameters {
  numberOfWords: number;
  wordSeparator: string;
  includeNumbers: boolean;
  capitalize: boolean;
  setNumberOfWords: (value: number) => void;
  setWordSeparator: (value: string) => void;
  toggleIncludeNumbers: () => void;
  toggleCapitalize: () => void;
}

const usePassphraseParametersStore = create<PassphraseParameters>()(
  devtools(
    persist((set) => ({
      numberOfWords: 5,
      wordSeparator: "-",
      includeNumbers: false,
      capitalize: false,
      setNumberOfWords: (value: number) =>
        set((state) => ({
          ...state,
          numberOfWords: value,
        })),
      setWordSeparator: (value: string) =>
        set((state) => ({
          ...state,
          wordSeparator: value,
        })),
      toggleIncludeNumbers: () =>
        set((state) => ({
          ...state,
          includeNumbers: !state.includeNumbers,
        })),
      toggleCapitalize: () =>
        set((state) => ({
          ...state,
          capitalize: !state.capitalize,
        })),
    }))
  )
);

export default usePassphraseParametersStore;
