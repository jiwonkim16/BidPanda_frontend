import { atom } from "recoil";

export const categoryList = atom({
  key: "category",
  default: [
    "전체",
    "👟신발",
    "💻테크",
    "👔패션",
    "🐱애견",
    "👶유아",
    "🏠리빙",
    "🚲취미",
  ],
});

export const category = atom({
  key: "categoryIcon",
  default: "",
});
