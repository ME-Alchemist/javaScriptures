import { create } from "zustand";

const useStore = create((set) => ({
  title: "Welcome Traveler",
  setTitle: (pageTitle) =>
    set({
      title: pageTitle,
    }),
}));

export default useStore;
