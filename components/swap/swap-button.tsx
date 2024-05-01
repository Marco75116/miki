"use client";

import React, { useMemo } from "react";
import { abiRouter02 } from "@/lib/constants/abis/abiRouter02";
import { abiERC20Testnet } from "@/lib/constants/abis/abiERC20Testnet";
import { useAccount, useWriteContract } from "wagmi";
import { Button } from "../ui/button";
import { useSecureTokenSelection } from "@/lib/stores/secureTokenSelection";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useApproveNeeded } from "@/lib/hooks/useApproveNeeded";
import { stringToBigIntWithDecimals } from "@/lib/helpers/global.helper";
import { TokenBalance } from "@/lib/types/global.type";
import { routerAddress02 } from "@/lib/constants/constant.global";

type SwapButtonProps = {
	amountFrom: string;
	amountTo: string;
	tokenSelectedFrom: TokenBalance;
	tokenSelectedTo: TokenBalance;
	pairExist: boolean;
};

const SwapButton = ({
	amountFrom,
	amountTo,
	tokenSelectedFrom,
	tokenSelectedTo,
	pairExist,
}: SwapButtonProps) => {
	const { data: hash, isPending, writeContract, error } = useWriteContract();
	const { address } = useAccount();

	const router = useRouter();

	const amountToken0BigInt = useMemo(() => {
		return stringToBigIntWithDecimals(amountFrom, tokenSelectedFrom?.decimals);
	}, [amountFrom, tokenSelectedFrom]);

	const amountToken1BigInt = useMemo(() => {
		return stringToBigIntWithDecimals(amountTo, tokenSelectedTo?.decimals);
	}, [amountTo, tokenSelectedTo]);

	const { isApproveNeeded } = useApproveNeeded(
		tokenSelectedFrom?.addressToken,
		routerAddress02,
		amountToken0BigInt,
	);

	return (
		<Button
			className={cn("bg-mauve rounded-2xl px-6 w-full h-16 hover:bg-mauve/80")}
			disabled={
				isPending ||
				tokenSelectedFrom === undefined ||
				tokenSelectedTo === undefined ||
				amountToken0BigInt === BigInt(0)
			}
			onClick={() => {
				!pairExist
					? router.push(
							`add/${tokenSelectedFrom.addressToken}/${tokenSelectedTo.addressToken}`,
					  )
					: isApproveNeeded
					  ? writeContract({
								abi: abiERC20Testnet,
								address: tokenSelectedFrom?.addressToken as `0x${string}`,
								functionName: "approve",
								args: [routerAddress02, amountToken0BigInt],
						  })
					  : writeContract({
								abi: abiRouter02,
								address: routerAddress02 as `0x${string}`,
								functionName: "swapExactTokensForTokens",
								args: [
									amountToken0BigInt,
									(amountToken1BigInt * BigInt(995)) / BigInt(1000),
									[
										tokenSelectedFrom.addressToken,
										tokenSelectedTo.addressToken,
									],
									address,
									Date.now(),
								],
						  });
			}}
		>
			{!pairExist &&
			tokenSelectedFrom !== undefined &&
			tokenSelectedTo !== undefined
				? "Create Pair"
				: isApproveNeeded
				  ? `Approve ${tokenSelectedFrom.symbol}`
				  : "Swap"}
		</Button>
	);
};

export default SwapButton;
