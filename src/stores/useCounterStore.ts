// src/stores/useCounterStore.ts — Zustand store
import { create } from 'zustand';

interface CounterState {
  value: number;
  increment: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((s) => ({ value: s.value + 1 })),
  reset: () => set({ value: 0 }),
}));
