import { atom } from "recoil";

export const profileImage = atom({
  key: "profile",
  default: "https://static.thenounproject.com/png/5034901-200.png", // 초기값을 제공합니다.
});
