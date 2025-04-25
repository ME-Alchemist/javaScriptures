import { create } from "zustand";

const questDetails = create((set) => ({
  quest_id: 0,
  quest_name: "",
  level_id: 0,
  exp: 0,
  vocation_id: 0,
  quest_desc: "",
  quest_diff: 0,
  quest_type: "",
  setDetails: (
    quest_id,
    quest_name,
    level_id,
    exp,
    vocation_id,
    quest_desc,
    quest_diff,
    quest_type
  ) =>
    set({
      quest_id: quest_id,
      quest_name: quest_name,
      level_id: level_id,
      exp: exp,
      vocation_id: vocation_id,
      quest_desc: quest_desc,
      quest_diff: quest_diff,
      quest_type: quest_type,
    }),
}));

export default questDetails;
