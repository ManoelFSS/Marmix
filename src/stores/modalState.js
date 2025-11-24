import { create } from "zustand";

export const useOpenStore = create((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));
