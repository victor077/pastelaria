import { create } from "zustand";

interface ViewState {
  view: "customer" | "kitchen";
  setView: (view: "customer" | "kitchen") => void;
}

export const useViewClient = create<ViewState>((set) => ({
  view: "customer",
  setView(view) {
    set({ view });
  },
}));
