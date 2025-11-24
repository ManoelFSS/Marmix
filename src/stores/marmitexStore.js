import { create } from "zustand";

export const useMarmitexStore = create((set) => ({
  items: [],

  setItems: (newItems) => set({ items: newItems }),
}));
