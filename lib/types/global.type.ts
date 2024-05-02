import { StaticImageData } from "next/image";

export type TokenBalance = {
	addressToken: string;
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
	decimals: number;
};

export const lendingsActions = [
	"supply",
	"withdraw",
	"borrow",
	"repay",
] as const;

export type lendingAction = (typeof lendingsActions)[number];

export type TransactionAction =
	| {
			action: "approve";
			symbolFrom: string;
	  }
	| {
			action: "swap";
			symbolFrom: string;
			symbolTo: string;
	  };
