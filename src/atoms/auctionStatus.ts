import { atom } from "recoil";

export const auctionStatus = atom({
  key: "auctionStatus",
  default: true,
});

// interface AuctionStatus {
//   [itemId: string]: boolean;
// }

// export const auctionStatusAtom = atom<AuctionStatus>({
//   key: "auctionStatus",
//   default: {},
// });
