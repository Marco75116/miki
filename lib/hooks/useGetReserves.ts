import { useReadContract } from "wagmi";
import { abiPairAddress } from "../constants/abis/abiPairAddress";
import { zeroAddress } from "viem";
import { timeByBlock } from "../constants/constant.global";

type Reserves = [bigint, bigint, bigint];

export const useGetReserves = (pairAddress: string | undefined) => {
  const { data: reserves } = useReadContract({
    query: {
      enabled: pairAddress !== zeroAddress || pairAddress !== undefined,
      refetchInterval: timeByBlock / 2,
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
