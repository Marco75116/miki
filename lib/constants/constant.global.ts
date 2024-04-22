import { TokenBalance } from "../types/global.type";
import ethLogo from "@/lib/assets/tokens/ethereum.png";
import usdtLogo from "@/lib/assets/tokens/usdt.png";
import daiLogo from "@/lib/assets/tokens/dai.png";

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
