import { useReadContract } from "wagmi";
import { factoryAddress } from "../constants/constant.global";
import { abiFactoryV2 } from "../constants/abis/abiFactoryV2";
import { useMemo } from "react";
import { zeroAddress } from "viem";

export const usePairExists = (
	tokenA: string | undefined,
	tokenB: string | undefined,
) => {
	const { data: pairAddress } = useReadContract({
		query: {
			enabled: tokenA !== undefined || tokenB !== undefined,
		},
		abi: abiFactoryV2,
		address: factoryAddress,
		functionName: "getPair",
		args: [tokenA, tokenB],
	});

	const pairExist = useMemo(() => {
		if (!pairAddress) {
			return false;
		}
		return pairAddress !== zeroAddress;
	}, [pairAddress]);

	return { pairAddress, pairExist };
};
