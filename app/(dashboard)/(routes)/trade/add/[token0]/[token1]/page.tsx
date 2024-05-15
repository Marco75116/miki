"use client";
import React, { useMemo, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2, MoveLeft, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSelectedTokenBalance } from "@/lib/hooks/useSelectedTokenBalance";
import {
	mockWalletBalance,
	routerAddress02,
} from "@/lib/constants/constant.global";
import { TokenBalance, TransactionAction } from "@/lib/types/global.type";
import {
	displayDecimalNumber,
	getMarketTokenFromSymbol,
	getRandomNumber,
	getTokenFromAddress,
	stringToBigIntWithDecimals,
} from "@/lib/helpers/global.helper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
	useAccount,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abiRouter02 } from "@/lib/constants/abis/abiRouter02";
import { abiERC20Testnet } from "@/lib/constants/abis/abiERC20Testnet";
import { useApproveNeeded } from "@/lib/hooks/useApproveNeeded";
import { usePairExists } from "@/lib/hooks/usePairExists";
import { useGetReserves } from "@/lib/hooks/useGetReserves";
import { useTimeDelayToast } from "@/lib/hooks/useTimeDelayToast";

const AddPage = () => {
	const {
		data: hash,
		isPending,
		writeContract,
		error,
	} = useWriteContract({
		mutation: {
			onSuccess(data, variables, context) {
				if (variables.args?.length === 2) {
					const token = getTokenFromAddress(variables.address);
					SetLastTxSubmitted({
						action: "approve",
						symbolFrom: token?.symbol || "",
					});
				} else {
					if (!variables.args) return;
					const [addressToken0, addressToken1] = ([
						variables.args[0],
						variables.args[1],
					] as [string, string]) || ["", ""];
					const token0 = getTokenFromAddress(addressToken0);
					const token1 = getTokenFromAddress(addressToken1);

					SetLastTxSubmitted({
						action: "add",
						symbol0: token0?.symbol || "",
						symbol1: token1?.symbol || "",
					});
				}
			},
		},
	});
	const { address } = useAccount();
	const pathname = usePathname();
	const router = useRouter();

	const token0Address = useMemo(() => {
		const slugs = pathname.split("/");

		return slugs[slugs.length - 2] === "undefined"
			? undefined
			: slugs[slugs.length - 2];
	}, [pathname]);

	const token1Address = useMemo(() => {
		const slugs = pathname.split("/");
		return slugs[slugs.length - 1] === "undefined"
			? undefined
			: slugs[slugs.length - 1];
	}, [pathname]);

	const token0 = useMemo(() => {
		return mockWalletBalance.find((balance) => {
			return balance.addressToken === token0Address;
		}) as TokenBalance;
	}, [token0Address]);

	const token1 = useMemo(() => {
		return mockWalletBalance.find((balance) => {
			return balance.addressToken === token1Address;
		}) as TokenBalance;
	}, [token1Address]);

	const [amount0, setAmount0] = useState<string>("0");
	const [amount1, setAmount1] = useState<string>("0");

	const amountToken0BigInt = useMemo(() => {
		return stringToBigIntWithDecimals(amount0, token0?.decimals);
	}, [amount0, token0]);

	const amountToken1BigInt = useMemo(() => {
		return stringToBigIntWithDecimals(amount1, token1?.decimals);
	}, [amount1, token1]);

	const { isApproveNeeded: isApproveNeeded0 } = useApproveNeeded(
		token0Address,
		routerAddress02,
		amountToken0BigInt,
	);

	const { isApproveNeeded: isApproveNeeded1 } = useApproveNeeded(
		token1Address,
		routerAddress02,
		amountToken1BigInt,
	);

	const { balance: balanceFrom } = useSelectedTokenBalance(
		token0?.addressToken,
	);
	const { balance: balanceTo } = useSelectedTokenBalance(token1?.addressToken);

	const isOrdered = useMemo(() => {
		if (token0Address && token1Address) {
			return token0Address.toLowerCase() < token1Address.toLowerCase();
		}
	}, [token0Address, token1Address]);

	const { pairAddress, pairExist } = usePairExists(
		token0Address,
		token1Address,
	);

	const { reserve0, reserve1 } = useGetReserves(pairAddress as string);

	const { isSuccess: isConfirmed, isFetching } = useWaitForTransactionReceipt({
		hash,
	});

	const { timeDelay, SetLastTxSubmitted } = useTimeDelayToast(isFetching, hash);

	return (
		<div className="h-full flex items-center flex-col">
			<div className="space-y-4 w-[25rem] mt-20">
				<Card>
					<CardHeader>
						<div className="flex justify-between items-center">
							<Button
								variant={"ghost"}
								size={"sm"}
								className=" space-x-2"
								onClick={() => {
									router.back();
								}}
							>
								<MoveLeft />
							</Button>
							<CardTitle>
								{pairExist ? "Add liquitity" : "Create Pair"}
							</CardTitle>
							<Button variant={"ghost"} size={"sm"} className=" space-x-2">
								<Settings />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<p>
							<div className="flex flex-row my-4 center space-x-6">
								<Input
									className="border-none font-medium "
									type="number"
									value={amount0}
									onChange={(e) => {
										setAmount0(e.target.value);
										if (pairExist) {
											const amount0Bigint = stringToBigIntWithDecimals(
												e.target.value,
												token0?.decimals,
											);

											const amount1Bigint = isOrdered
												? (reserve1 * amount0Bigint) / reserve0
												: (reserve0 * amount0Bigint) / reserve1;

											setAmount1(
												displayDecimalNumber(amount1Bigint, token1?.decimals),
											);
										}
									}}
								/>
								<Select
									value={token0?.symbol}
									onValueChange={(value) => {
										const tokenSelected = getMarketTokenFromSymbol(value);
										if (tokenSelected?.addressToken === token1Address) {
											router.push(
												`/trade/add/${tokenSelected?.addressToken}/undefined`,
											);
										} else {
											router.push(
												`/trade/add/${tokenSelected?.addressToken}/${token1?.addressToken}`,
											);
										}
									}}
								>
									<SelectTrigger className="w-[300px]">
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
								<div>${Number(amount0) * getRandomNumber(2, 10)}</div>
								<div>{token0 && `balance : ${balanceFrom}`} </div>
							</div>
							<div className="center">
								<Plus />
							</div>
							<div className="flex flex-row my-4 center space-x-6">
								<Input
									className="border-none font-medium"
									type="number"
									value={amount1}
									onChange={(e) => {
										setAmount1(e.target.value);
										if (pairExist) {
											const amount1Bigint = stringToBigIntWithDecimals(
												e.target.value,
												token1?.decimals,
											);

											const amount0Bigint = isOrdered
												? (reserve0 * amount1Bigint) / reserve1
												: (reserve1 * amount1Bigint) / reserve0;

											setAmount0(
												displayDecimalNumber(amount0Bigint, token0?.decimals),
											);
										}
									}}
								/>
								<Select
									value={token1?.symbol}
									onValueChange={(value) => {
										const tokenSelected = getMarketTokenFromSymbol(value);
										if (tokenSelected?.addressToken === token0Address) {
											router.push(
												`/trade/add/undefined/${tokenSelected?.addressToken}`,
											);
										} else {
											router.push(
												`/trade/add/${token0?.addressToken}/${tokenSelected?.addressToken}`,
											);
										}
									}}
								>
									<SelectTrigger className="w-[300px]">
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
								<div>${Number(amount1) * getRandomNumber(2, 8)}</div>
								<div>{token1 && `balance : ${balanceTo}`} </div>
							</div>
						</p>
					</CardContent>
					<CardFooter>
						<Button
							className={cn(
								"bg-mauve rounded-2xl px-6 w-full h-16 text-lg hover:bg-mauve/80",
							)}
							disabled={
								isPending ||
								token0Address === "undefined" ||
								token1Address === "undefined" ||
								Number(amount0) === 0 ||
								Number(amount1) === 0 ||
								timeDelay
							}
							onClick={() => {
								isApproveNeeded0
									? writeContract({
											abi: abiERC20Testnet,
											address: token0Address as `0x${string}`,
											functionName: "approve",
											args: [routerAddress02, amountToken0BigInt],
									  })
									: isApproveNeeded1
									  ? writeContract({
												abi: abiERC20Testnet,
												address: token1Address as `0x${string}`,
												functionName: "approve",
												args: [routerAddress02, amountToken1BigInt],
										  })
									  : writeContract({
												abi: abiRouter02,
												address: routerAddress02 as `0x${string}`,
												functionName: "addLiquidity",
												args: [
													token0Address,
													token1Address,
													amountToken0BigInt,
													amountToken1BigInt,
													(amountToken0BigInt * BigInt(995)) / BigInt(1000),
													(amountToken1BigInt * BigInt(995)) / BigInt(1000),
													address,
													Date.now() + 100,
												],
										  });
							}}
						>
							{timeDelay ? (
								<>
									<Loader2 className="animate-spin mr-2" /> Processing...
								</>
							) : isApproveNeeded0 ? (
								`Approve ${token0?.symbol}`
							) : isApproveNeeded1 ? (
								`Approve ${token1?.symbol}`
							) : pairExist ? (
								"Add liquitity"
							) : (
								"Create Pair"
							)}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default AddPage;
