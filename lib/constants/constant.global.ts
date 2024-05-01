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
		href: "/exchange/swap",
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
		addressToken: "0x8f8828d226Befb46A13F4924fDf87FC65bAb343a",
		symbol: "WETH",
		imgSrc: ethLogo,
		balance: 1.5,
		decimals: 18,
	},
	{
		addressToken: "0xF8357722637a0bd81b958FEA639BCf7EC7aeB365",
		symbol: "USDT",
		imgSrc: usdtLogo,
		balance: 1999,
		decimals: 6,
	},
	{
		addressToken: "0x6aC1C63824991EE50DD41C17F2bb0d111D9fcec1",
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
		supplyAPY: 0.103,
		supplyBoost: 0.0722,
		totalBorrowed: 50000,
		borrowAPY: 0.19,
		borrowBoost: 0.0941,
		imgSrc: sklLogo,
		price: 0.09287,
	},
	{
		addressToken: "0x8f8828d226Befb46A13F4924fDf87FC65bAb343a",
		name: "Wrapped Ether",
		symbol: "WETH",
		totalSupplied: 872,
		supplyAPY: 0.11,
		supplyBoost: 0.0578,
		totalBorrowed: 500,
		borrowAPY: 0.15,
		borrowBoost: 0.0212,
		imgSrc: ethLogo,
		price: 1800.5,
	},
	{
		addressToken: "0x6aC1C63824991EE50DD41C17F2bb0d111D9fcec1",
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
		addressToken: "0xF8357722637a0bd81b958FEA639BCf7EC7aeB365",
		name: "Tether USD",
		symbol: "USDT",
		totalSupplied: 2500000,
		supplyAPY: 0.09,
		supplyBoost: 0.0334,
		totalBorrowed: 150000,
		borrowAPY: 0.24,
		borrowBoost: 0,
		imgSrc: usdtLogo,
		price: 1.0,
	},
];

export const timeByBlock = 10 * 1000;
export const routerAddress02 = "0x44109e1f1f1b8d121F5B9Bc92759BC088ebab373";
export const factoryAddress = "0xC1Ae295b586C164455587593c2D1302Fb87935D7";
