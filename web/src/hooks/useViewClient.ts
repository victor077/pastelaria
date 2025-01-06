import { create } from "zustand";

interface ViewState {
  view: "customer" | "kitchen" | "history";
  setView: (view: "customer" | "kitchen" | "history") => void;
}

export const useViewClient = create<ViewState>((set) => ({
  view: "customer",
  setView(view) {
    set({ view });
  },
}));
