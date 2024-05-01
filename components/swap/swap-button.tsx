"use client";

import React, { useEffect, useMemo } from "react";
import { abiRouter02 } from "@/lib/constants/abis/abiRouter02";
import { abiERC20Testnet } from "@/lib/constants/abis/abiERC20Testnet";
import {
	useAccount,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useApproveNeeded } from "@/lib/hooks/useApproveNeeded";
import { stringToBigIntWithDecimals } from "@/lib/helpers/global.helper";
import { TokenBalance } from "@/lib/types/global.type";
import { routerAddress02 } from "@/lib/constants/constant.global";
import { toast } from "sonner";

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
	const {
		data: hash,
		isPending,
		isSuccess,
		writeContract,
		error,
	} = useWriteContract();

	const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
		hash,
	});

	useEffect(() => {
		if (isConfirmed) {
			toast("Transaction successfully submitted!", {
				className: "success",
				description: "",
				action: {
					label: "View",
					onClick: () => {
						window.open(
							`https://juicy-low-small-testnet.explorer.testnet.skalenodes.com/tx/${hash}`,
							"_blank",
						);
					},
				},
			});
		}
	}, [isConfirmed, hash]);

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
