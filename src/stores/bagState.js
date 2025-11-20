import { create } from "zustand";

export const useBagState = create((set) => ({
  closeBag: false,

  setCloseBag: (value) => set({ closeBag: value }),

  toggleBag: () => set((state) => ({ closeBag: !state.closeBag })),
}));
