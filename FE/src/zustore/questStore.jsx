import { create } from "zustand";

const currentQuest = create((set) => ({
  isQuestActive: false,
  exp_gathered: 0,
  hitPoints: 3,
  monstersEncountered: [],
  resetQuest: () =>
    set({
      isQuestActive: false,
      exp_gathered: 0,
      hitPoints: 3,
      monstersEncountered: [],
    }),
  updateQuest: (amount, damage, monster) =>
    set((state) => ({
      exp_gathered: state.exp_gathered + amount,
      hitPoints: damage,
      monstersEncountered: [...state.monstersEncountered, monster],
    })),
}));

export default currentQuest;
