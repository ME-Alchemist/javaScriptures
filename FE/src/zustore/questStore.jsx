import { create } from "zustand";

const currentQuest = create((set) => ({
  isQuestActive: false,
  exp_gathered: 0,
  resetQuest: () =>
    set({
      isQuestActive: false,
      exp_gathered: 0,
    }),
  addExp: (amount) =>
    set((state) => ({ exp_gathered: state.exp_gathered + amount })),
}));

export default currentQuest;
