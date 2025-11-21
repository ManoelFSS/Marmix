import { create } from "zustand";

export const useBagStore = create((set) => ({
  bag: [],

  addToBag: (callback) =>
    set((state) => ({
      bag: typeof callback === "function" ? callback(state.bag) : callback,
    })),

  removeFromBag: (id) =>
    set((state) => ({
      bag: state.bag.filter((item) => item.id !== id),
    })),
}));


