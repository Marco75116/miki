import { useAccount, useReadContracts } from "wagmi";
import { abiERC20Testnet } from "../constants/abis/abiERC20Testnet";
import { timeByBlock } from "../constants/constant.global";
import { useMemo } from "react";
import { displayDecimalNumber } from "../helpers/global.helper";

export const useSelectedTokenBalance = (tokenAddress: string | undefined) => {
	const erc20Contract = {
		address: tokenAddress as `0x${string}`,
		abi: abiERC20Testnet,
	} as const;

	const { address } = useAccount();

	const { data: dataBalanceTokenFrom, isSuccess: isSuccessBalanceTokenFrom } =
		useReadContracts({
			allowFailure: false,
			query: {
				enabled: tokenAddress !== undefined || address !== undefined,
				refetchInterval: timeByBlock / 2,
			},
			contracts: [
				{
					...erc20Contract,
					functionName: "balanceOf",
					args: [address as `0x${string}`],
				},
				{
					...erc20Contract,
					functionName: "decimals",
				},
			],
		});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const balance = useMemo(() => {
		if (isSuccessBalanceTokenFrom) {
			const balanceWei = dataBalanceTokenFrom[0] as bigint;
			const decimals = dataBalanceTokenFrom[1] as number;
			const balance = Number(displayDecimalNumber(balanceWei, decimals));
			return balance;
		}
		return "0";
	}, [isSuccessBalanceTokenFrom, dataBalanceTokenFrom]);

	return { balance };
};
