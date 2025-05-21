import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuestStore = create(
  // "persist" is similar to localStorage/sessionStorage, will help keep track even after page reload
  persist(
    (set) => ({
      questCompleted: false,
      setQuestCompleted: (val) => set({ questCompleted: val }),
      resetQuestCompleted: () => set({ questCompleted: false }),
    }),
    {
      name: "quest-storage", // Keyname in localStorage
      getStorage: () => sessionStorage, // <-- change to localStorage if you prefer
    }
  )
);

export default useQuestStore;
