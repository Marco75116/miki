import { StaticImageData } from "next/image";

export type TokenBalance = {
  addressToken: `0x${string}`;
  symbol: string;
  imgSrc: StaticImageData;
  balance: number;
  decimals: number;
};
