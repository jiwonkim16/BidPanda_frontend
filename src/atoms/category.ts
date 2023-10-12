import { atom } from "recoil";

export const categoryList = atom({
  key: "category",
  default: ["전체", "취미", "테크", "패션", "펫", "유아", "리빙", "신발"],
});

export const category = atom({
  key: "categoryIcon",
  default: "",
});
