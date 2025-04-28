import { create } from "zustand";

const UserDetails = create((set) => ({
  user_id: 0,
  level: 0,
  exp: 0,
  vocation: "",
  username: "",
  email: "",
  setDetails: (user_id, level, exp, vocation, username, email) =>
    set({
      user_id: user_id,
      username: username,
      email: email,
      level: level,
      exp: exp,
      vocation: vocation,
    }),
}));

export default UserDetails;
