import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false, // 초기값을 제공합니다.
});
