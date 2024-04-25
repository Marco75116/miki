import { StaticImageData } from "next/image";

export type TokenBalance = {
  addressToken: `0x${string}`;
  symbol: string;
  imgSrc: StaticImageData;
  balance: number;
  decimals: number;
};

export type TokenMarket = {
  addressToken: string;
  symbol: string;
  name: string;
  totalSupplied: number;
  supplyAPY: number;
  supplyBoost: number;
  totalBorrowed: number;
  borrowAPY: number;
  borrowBoost: number;
  imgSrc: StaticImageData;
  price: number;
};
