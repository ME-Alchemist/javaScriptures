import { create } from "zustand";

const UserDetails = create((set) => ({
  user_id: 0,
  level_id: 0,
  exp: 0,
  vocation_id: 0,
  username: "",
  email: "",
  setDetails: (user_id, level_id, exp, vocation_id, username, email) =>
    set({
      user_id: user_id,
      level_id: level_id,
      exp: exp,
      vocation_id: vocation_id,
      username: username,
      email: email,
    }),
}));

export default UserDetails;
