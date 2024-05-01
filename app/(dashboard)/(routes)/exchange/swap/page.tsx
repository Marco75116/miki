"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { mockWalletBalance } from "@/lib/constants/constant.global";
import { useSecureTokenSelection } from "@/lib/stores/secureTokenSelection";
import { TokenBalance } from "@/lib/types/global.type";
import {
	displayDecimalNumber,
	formatNumber,
	getAmountIn,
	getAmountOut,
	getRandomNumber,
} from "@/lib/helpers/global.helper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveVertical, Settings } from "lucide-react";
import { useSelectedTokenBalance } from "@/lib/hooks/useSelectedTokenBalance";
import { usePairExists } from "@/lib/hooks/usePairExists";
import { useGetReserves } from "@/lib/hooks/useGetReserves";
import SwapButton from "@/components/swap/swap-button";

const SwapPage = () => {
	const {
		tokensSelectionFrom,
		setTokensSelectionFrom,
		tokensSelectionTo,
		setTokensSelectionTo,
	} = useSecureTokenSelection();

	const tokenSelectedFrom = useMemo(() => {
		return mockWalletBalance.find((balance) => {
			return balance.symbol === tokensSelectionFrom;
		}) as TokenBalance;
	}, [tokensSelectionFrom]);

	const tokenSelectedTo = useMemo(() => {
		return mockWalletBalance.find((balance) => {
			return balance.symbol === tokensSelectionTo;
		}) as TokenBalance;
	}, [tokensSelectionTo]);

	const [amountFrom, setAmountFrom] = useState<string>("0");
	const [amountTo, setAmountTo] = useState<string>("0");

	const { balance: balanceFrom } = useSelectedTokenBalance(
		tokenSelectedFrom?.addressToken,
	);
	const { balance: balanceTo } = useSelectedTokenBalance(
		tokenSelectedTo?.addressToken,
	);

	const isOrdered = useMemo(() => {
		if (tokenSelectedFrom && tokenSelectedTo) {
			return (
				tokenSelectedFrom.addressToken.toLowerCase() <
				tokenSelectedTo.addressToken.toLowerCase()
			);
		}
	}, [tokenSelectedFrom, tokenSelectedTo]);

	const { pairAddress, pairExist } = usePairExists(
		tokenSelectedFrom?.addressToken,
		tokenSelectedTo?.addressToken,
	);

	const { reserve0, reserve1 } = useGetReserves(pairAddress as string);

	return (
		<div className="h-full center">
			<div className="">
				<div className="flex justify-between items-center mb-4">
					<Button
						className={cn("bg-mauve rounded-full px-6 hover:bg-mauve/80")}
					>
						swap
					</Button>
					<Settings className="mr-2" />
				</div>
				<Card className="py-3 rounded-2xl">
					<CardContent className="py-0">
						<div className="font-semibold text-mauve">you pay</div>
						<div className="flex flex-row my-4 center space-x-6">
							<Input
								className="border-none font-medium "
								type="number"
								value={amountFrom}
								onChange={(e) => {
									setAmountFrom(e.target.value);

									if (pairExist) {
										const amountOut = getAmountOut(
											e.target.value,
											tokenSelectedFrom.decimals,
											tokenSelectedTo.decimals,
											reserve0,
											reserve1,
											isOrdered,
										);
										setAmountTo(amountOut);
									}
								}}
							/>
							<Select
								value={tokensSelectionFrom}
								onValueChange={(value) => {
									setTokensSelectionFrom(value);
									if (value === tokensSelectionTo) {
										setTokensSelectionTo("");
									}
								}}
							>
								<SelectTrigger className="w-[250px]">
									<SelectValue placeholder="Select a Token" />
								</SelectTrigger>
								<SelectContent>
									{mockWalletBalance.map((b) => (
										<SelectItem
											key={b.symbol}
											value={b.symbol}
											onClick={() => {}}
										>
											<div className="flex flex-row gap-2">
												<Image src={b.imgSrc} alt="token img" height={20} />
												<div>{b.symbol}</div>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex justify-between text-xs text-muted-foreground">
							<div>${Number(amountFrom) * getRandomNumber(2, 10)}</div>
							<div>
								{tokenSelectedFrom &&
									`balance : ${formatNumber(Number(balanceFrom), 3)}`}{" "}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="center negativeMargin ">
					<Button
						variant={"outline"}
						className=" bg-white border px-2"
						onClick={() => {
							const a = tokensSelectionTo;
							const b = tokensSelectionFrom;
							setTokensSelectionFrom(a);
							setTokensSelectionTo(b);
						}}
					>
						<MoveVertical className="text-black" />
					</Button>
				</div>

				<Card className="py-3 rounded-2xl">
					<CardContent className="py-0">
						<div className="font-semibold text-mauve">you receive</div>
						<div className="flex flex-row my-4 center space-x-6">
							<Input
								className="border-none font-medium"
								type="number"
								value={amountTo}
								onChange={(e) => {
									setAmountTo(e.target.value);

									if (pairExist) {
										const amountIn = getAmountIn(
											e.target.value,
											tokenSelectedFrom.decimals,
											tokenSelectedTo.decimals,
											reserve0,
											reserve1,
											isOrdered,
										);
										setAmountFrom(amountIn);
									}
								}}
							/>
							<Select
								value={tokensSelectionTo}
								onValueChange={(value) => {
									setTokensSelectionTo(value);
									if (value === tokensSelectionFrom) {
										setTokensSelectionFrom("");
									}
								}}
							>
								<SelectTrigger className="w-[250px]">
									<SelectValue placeholder="Select a Token" />
								</SelectTrigger>
								<SelectContent>
									{mockWalletBalance.map((b) => (
										<SelectItem
											key={b.symbol}
											value={b.symbol}
											onClick={() => {}}
										>
											<div className="flex flex-row gap-2">
												<Image src={b.imgSrc} alt="token img" height={20} />
												<div>{b.symbol}</div>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex justify-between text-xs text-muted-foreground">
							<div>${Number(amountTo) * getRandomNumber(2, 8)}</div>
							<div>
								{tokenSelectedTo &&
									`balance : ${formatNumber(Number(balanceTo), 3)}`}{" "}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="mt-2">
					<SwapButton
						amountFrom={amountFrom}
						amountTo={amountTo}
						tokenSelectedFrom={tokenSelectedFrom}
						tokenSelectedTo={tokenSelectedTo}
						pairExist={pairExist}
					/>
				</div>
			</div>
		</div>
	);
};

export default SwapPage;
