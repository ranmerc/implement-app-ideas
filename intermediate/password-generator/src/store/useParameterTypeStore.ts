import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TypeOfPassword = 'password' | 'passphrase';

interface ParameterState {
  type: TypeOfPassword;
  setType: (value: TypeOfPassword) => void;
}

const useParameterStore = create<ParameterState>()(
  devtools(
    persist((set) => ({
      type: 'password',
      setType: (value) => set((state) => ({ ...state, type: value })),
    }))
  )
);

export default useParameterStore;
