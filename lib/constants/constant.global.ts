import { TokenBalance, TokenMarket } from "../types/global.type";
import ethLogo from "@/lib/assets/tokens/ethereum.png";
import usdtLogo from "@/lib/assets/tokens/usdt.png";
import daiLogo from "@/lib/assets/tokens/dai.png";
import sklLogo from "@/lib/assets/tokens/skale.png";

export const menu = [
  {
    label: "dashboard",
    href: "/",
  },
  {
    label: "swap",
    href: "/swap",
  },
  {
    label: "earn",
    href: "/earn",
  },
  {
    label: "launchpad",
    href: "/launchpad",
  },
  {
    label: "bridge",
    href: "https://meson.fi/",
  },
];

export const mockWalletBalance: TokenBalance[] = [
  {
    addressToken: "0xf48c61Cc6DBCF6f4Dd1C93d29De27Fd0832843bE",
    symbol: "WETH",
    imgSrc: ethLogo,
    balance: 1.5,
    decimals: 18,
  },
  {
    addressToken: "0x5492dE05F89501A4a6F5d3dE85675541E42534C2",
    symbol: "USDT",
    imgSrc: usdtLogo,
    balance: 1999,
    decimals: 6,
  },
  {
    addressToken: "0xC2Eb52200586aF9594B93618b55B460e07E4ddBd",
    symbol: "DAI",
    imgSrc: daiLogo,
    balance: 199,
    decimals: 18,
  },
];

export const lendings = ["Assets", "RWA", "LP"];

export const mockTokenData: TokenMarket[] = [
  {
    addressToken: "0x1234567890abcdef1234567890abcdef12345678", // Example address
    name: "SKALE",
    symbol: "SKL",
    totalSupplied: 1560000,
    supplyAPY: 0.2,
    supplyBoost: 0.0722,
    totalBorrowed: 50000,
    borrowAPY: 0.25,
    borrowBoost: 0.0941,
    imgSrc: sklLogo,
    price: 0.09287,
  },
  {
    addressToken: "0xf48c61Cc6DBCF6f4Dd1C93d29De27Fd0832843bE",
    name: "Wrapped Ether",
    symbol: "WETH",
    totalSupplied: 872,
    supplyAPY: 0.25,
    supplyBoost: 0.0578,
    totalBorrowed: 500,
    borrowAPY: 0.32,
    borrowBoost: 0.0212,
    imgSrc: ethLogo,
    price: 1800.5,
  },
  {
    addressToken: "0xC2Eb52200586aF9594B93618b55B460e07E4ddBd",
    name: "Dai Stablecoin",
    symbol: "DAI",
    totalSupplied: 50000,
    supplyAPY: 0.22,
    supplyBoost: 0.0,
    totalBorrowed: 20000,
    borrowAPY: 0.29,
    borrowBoost: 0.0,
    imgSrc: daiLogo,
    price: 1.0,
  },
  {
    addressToken: "0x5492dE05F89501A4a6F5d3dE85675541E42534C2",
    name: "Tether USD",
    symbol: "USDT",
    totalSupplied: 2500000,
    supplyAPY: 0.18,
    supplyBoost: 0.0334,
    totalBorrowed: 150000,
    borrowAPY: 0.24,
    borrowBoost: 0,
    imgSrc: usdtLogo,
    price: 1.0,
  },
];
