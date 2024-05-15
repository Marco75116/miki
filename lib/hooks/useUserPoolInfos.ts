import { abiPairAddress } from "@/lib/constants/abis/abiPairAddress";
import { timeByBlock } from "@/lib/constants/constant.global";
import { useAccount, useReadContracts } from "wagmi";
import { displayDecimalNumber } from "@/lib/helpers/global.helper";
import { useMemo } from "react";
import { useGetERC20Infos } from "./useGetERC20Infos";

type Reserves = [bigint, bigint, bigint];

export const useUserPoolInfos = (lpAddress: string | undefined) => {
  const { address } = useAccount();

  const pairContract = {
    address: lpAddress as `0x${string}`,
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
      {
        ...pairContract,
        functionName: "token0",
      },
      {
        ...pairContract,
        functionName: "token1",
      },
    ],
    query: {
      refetchInterval: timeByBlock / 2,
      enabled: address !== undefined && lpAddress !== undefined,
    },
  });

  const [reserve0, reserve1, blockTimestampLast] = (data?.[2] as Reserves) || [
    undefined,
    undefined,
    undefined,
  ];

  const { decimals: decimals0 } = useGetERC20Infos(
    data?.[3] as string | undefined
  );
  const { decimals: decimals1 } = useGetERC20Infos(
    data?.[4] as string | undefined
  );

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
    if (poolShare && decimals0) {
      return (
        Number(displayDecimalNumber(reserve0, decimals0)) * Number(poolShare)
      );
    }
  }, [poolShare, reserve0]);

  const balanceToken1 = useMemo(() => {
    if (poolShare && decimals1) {
      return (
        Number(displayDecimalNumber(reserve1, decimals1)) * Number(poolShare)
      );
    }
  }, [poolShare, reserve1]);

  const totalSupply = useMemo(() => {
    if (data) {
      const totalSupplyWei = data[1] as bigint;
      return Number(displayDecimalNumber(totalSupplyWei, 18));
    }
  }, [poolShare]);

  return {
    balancePairV2,
    poolShare,
    balanceToken0,
    balanceToken1,
    token0Address: data?.[3] as string | undefined,
    token1Address: data?.[4] as string | undefined,
    totalSupply,
    totalSupplyWei: data?.[1] as bigint | undefined,
  };
};
