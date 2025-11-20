import { create } from "zustand";

export const useBagStore = create((set) => ({
  bag: [],
  addToBag: (items) => set({ bag: items }),
}));
