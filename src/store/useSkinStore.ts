import { create } from "zustand";

interface SkinStore {
  currentSkin: string;
  setSkin: (s: string) => void;
}

const useSkinStore = create<SkinStore>((set) => ({
  currentSkin: "Kevin",

  setSkin: (skin) => {
    set({ currentSkin: skin });
  },
}));

export default useSkinStore;
