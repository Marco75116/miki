"use client";
import React, { useMemo, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2, MoveLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { routerAddress02 } from "@/lib/constants/constant.global";
import {
	displayDecimalNumber,
	formatNumber,
	getTokenFromAddress,
	stringToBigIntWithDecimals,
} from "@/lib/helpers/global.helper";
import { usePathname, useRouter } from "next/navigation";
import {
	useAccount,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abiRouter02 } from "@/lib/constants/abis/abiRouter02";
import { abiERC20Testnet } from "@/lib/constants/abis/abiERC20Testnet";
import { useApproveNeeded } from "@/lib/hooks/useApproveNeeded";
import { useGetReserves } from "@/lib/hooks/useGetReserves";
import { useUserPoolInfos } from "@/lib/hooks/useUserPoolInfos";
import { useGetERC20Infos } from "@/lib/hooks/useGetERC20Infos";
import { Separator } from "@/components/ui/separator";
import { useTimeDelayToast } from "@/lib/hooks/useTimeDelayToast";

const RemovePage = () => {
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
						symbolFrom: token?.symbol || "LP",
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
						action: "remove",
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

	const lpAddress = useMemo(() => {
		const slugs = pathname.split("/");

		return slugs[slugs.length - 1] === "undefined"
			? undefined
			: slugs[slugs.length - 1];
	}, [pathname]);

	const [amount, setAmount] = useState<string>("0");

	const amountTokenBigInt = useMemo(() => {
		return stringToBigIntWithDecimals(amount, 18);
	}, [amount]);

	const { isApproveNeeded } = useApproveNeeded(
		lpAddress,
		routerAddress02,
		amountTokenBigInt,
	);

	const { balancePairV2, token0Address, token1Address, totalSupplyWei } =
		useUserPoolInfos(lpAddress);

	const { reserve0, reserve1 } = useGetReserves(lpAddress);

	const { symbol: token0Symbol, decimals: decimals0 } =
		useGetERC20Infos(token0Address);
	const { symbol: token1Symbol, decimals: decimals1 } =
		useGetERC20Infos(token1Address);

	const poolShare = useMemo(() => {
		if (totalSupplyWei) {
			const poolShareEther =
				(amountTokenBigInt * BigInt(10 ** 18)) / totalSupplyWei;
			return displayDecimalNumber(poolShareEther, 18);
		}
	}, [totalSupplyWei, amountTokenBigInt]);

	const expectingToken0 = useMemo(() => {
		if (poolShare && reserve0 && decimals0) {
			return (
				Number(displayDecimalNumber(reserve0, Number(decimals0))) *
				Number(poolShare)
			);
		}
	}, [poolShare, reserve0, decimals0]);

	const expectingToken1 = useMemo(() => {
		if (poolShare && reserve1 && decimals1) {
			return (
				Number(displayDecimalNumber(reserve1, Number(decimals1))) *
				Number(poolShare)
			);
		}
	}, [poolShare, reserve1, decimals1]);

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
								Remove liquidity <br />
								{token0Symbol}/{token1Symbol}
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
									value={amount}
									onChange={(e) => {
										setAmount(e.target.value);
									}}
								/>

								<Button
									className={cn("bg-mauve  hover:bg-mauve/80")}
									onClick={() => {
										balancePairV2 && setAmount(balancePairV2);
									}}
								>
									Max
								</Button>
							</div>
							<div className="flex justify-between text-xs text-muted-foreground">
								{lpAddress && `balance : ${balancePairV2}`} {token0Symbol}/
								{token1Symbol}
							</div>
							<div className="m-2">
								<Separator />
							</div>
							<div className="flex ">
								<p className="font-semibold mr-2">Expectings :</p>
								<div>
									<p>
										{formatNumber(expectingToken0, 3)} &nbsp;{token0Symbol}
									</p>
									<p>
										{formatNumber(expectingToken1, 3)}&nbsp;
										{token1Symbol}
									</p>
								</div>
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
								lpAddress === "undefined" ||
								Number(amountTokenBigInt) === 0 ||
								timeDelay
							}
							onClick={() => {
								isApproveNeeded
									? writeContract({
											abi: abiERC20Testnet,
											address: lpAddress as `0x${string}`,
											functionName: "approve",
											args: [routerAddress02, amountTokenBigInt],
									  })
									: writeContract({
											abi: abiRouter02,
											address: routerAddress02 as `0x${string}`,
											functionName: "removeLiquidity",
											args: [
												token0Address,
												token1Address,
												amountTokenBigInt,
												0,
												0,
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
							) : isApproveNeeded ? (
								`Approve LP ${token0Symbol}/${token1Symbol}`
							) : (
								"Remove liquidity"
							)}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default RemovePage;
