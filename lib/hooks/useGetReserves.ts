import { useReadContract } from "wagmi";
import { abiPairAddress } from "../constants/abis/abiPairAddress";
import { zeroAddress } from "viem";

type Reserves = [bigint, bigint, bigint];

export const useGetReserves = (pairAddress: string) => {
	const { data: reserves } = useReadContract({
		query: {
			enabled: pairAddress !== zeroAddress,
		},
		abi: abiPairAddress,
		address: pairAddress as `0x${string}`,
		functionName: "getReserves",
	});

	const [reserve0, reserve1, blockTimestampLast] = (reserves as Reserves) || [
		undefined,
		undefined,
		undefined,
	];

	return { reserve0, reserve1, blockTimestampLast };
};
