import { useTg } from "../hooks/useTg";
import { create } from "zustand";

interface SkinStore {
  currentSkin: string;
  setSkin: (s: string) => void;
}

const useSkinStore = create<SkinStore>((set) => {
  const { cloudStorage } = useTg();

  const fetchCurrentSkin = async (): Promise<string> => {
    return new Promise((resolve) => {
      cloudStorage.getItem("skin", (skin: any) => {
        console.log("Get Item");
        resolve(skin || "Kevin");
      });
    });
  };

  const initializeSkin = async () => {
    const skin = await fetchCurrentSkin();
    set({ currentSkin: skin });
  };

  initializeSkin();

  return {
    currentSkin: "Kevin",
    setSkin: (skin) => {
      set({ currentSkin: skin });
      cloudStorage.setItem("skin", skin);
    },
  };
});

export default useSkinStore;
