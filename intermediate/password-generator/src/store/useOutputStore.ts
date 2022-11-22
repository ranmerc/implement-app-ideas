import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface OutputState {
  outputValue: string;
  setOutputValue: (value: string) => void;
}

const useOutputStore = create<OutputState>()(
  devtools((set) => ({
    outputValue: '',
    setOutputValue: (value) => set(() => ({ outputValue: value })),
  }))
);

export default useOutputStore;
