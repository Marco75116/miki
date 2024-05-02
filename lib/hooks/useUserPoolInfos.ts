import { abiPairAddress } from "@/lib/constants/abis/abiPairAddress";
import { pairDaiEth, timeByBlock } from "@/lib/constants/constant.global";
import { useAccount, useReadContracts } from "wagmi";
import { displayDecimalNumber } from "@/lib/helpers/global.helper";
import { useMemo } from "react";

type Reserves = [bigint, bigint, bigint];

export const useUserPoolInfos = () => {
	const { address } = useAccount();

	const pairContract = {
		address: pairDaiEth as `0x${string}`,
		abi: abiPairAddress,
	} as const;

	const { data, isSuccess } = useReadContracts({
		allowFailure: false,
		contracts: [
			{
				...pairContract,
				functionName: "balanceOf",
				args: [address],
			},
			{
				...pairContract,
				functionName: "totalSupply",
			},
			{
				...pairContract,
				functionName: "getReserves",
			},
		],
		query: {
			refetchInterval: timeByBlock / 2,
			enabled: address !== undefined,
		},
	});

	const [reserve0, reserve1, blockTimestampLast] = (data?.[2] as Reserves) || [
		undefined,
		undefined,
		undefined,
	];

	const balancePairV2 = useMemo(() => {
		if (data) {
			const balanceWei = data[0] as bigint;
			return displayDecimalNumber(balanceWei, 18);
		}
	}, [data, data?.[0]]);

	const poolShare = useMemo(() => {
		if (data) {
			const balanceWei = data[0] as bigint;
			const totalSupplyWei = data[1] as bigint;
			const poolShareEther = (balanceWei * BigInt(10 ** 18)) / totalSupplyWei;
			return displayDecimalNumber(poolShareEther, 18);
		}
	}, [data]);

	const balanceToken0 = useMemo(() => {
		if (poolShare) {
			return Number(displayDecimalNumber(reserve0, 18)) * Number(poolShare);
		}
	}, [poolShare, reserve0]);

	const balanceToken1 = useMemo(() => {
		if (poolShare) {
			return Number(displayDecimalNumber(reserve1, 18)) * Number(poolShare);
		}
	}, [poolShare, reserve1]);

	return { balancePairV2, poolShare, balanceToken0, balanceToken1 };
};
