import { create } from "zustand";

const UserDetails = create((set) => ({
  user_id: 0,
  level: 0,
  exp: 0,
  vocation: "",
  username: "",
  email: "",
  vocation_img: "",
  vocation_portrait: "",
  setDetails: (user_id, level, exp, vocation, username, email) =>
    set({
      user_id: user_id,
      username: username,
      email: email,
      level: level,
      exp: exp,
      vocation: vocation,
      vocation_img: vocation + ".png",
      vocation_portrait: vocation + "_portrait.png",
    }),
  reset: () =>
    set({
      user_id: 0,
      username: "",
      email: "",
      level: 0,
      exp: 0,
      vocation: "",
      vocation_img: "",
      vocation_portrait: "",
    }),
}));

export default UserDetails;
