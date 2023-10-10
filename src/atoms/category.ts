import { atom } from "recoil";

export const categoryList = atom({
  key: "category",
  default: ["신발", "취미", "테크", "패션", "펫", "유아", "리빙", "잡화"],
});
