import { useAccount, useReadContracts } from "wagmi";
import { abiERC20Testnet } from "../constants/abis/abiERC20Testnet";
import { timeByBlock } from "../constants/constant.global";
import { useMemo } from "react";

export const useApproveNeeded = (
  tokenAddress: string | undefined,
  addressApproved: string,
  amountTokenBigInt: bigint
) => {
  const { address } = useAccount();

  const erc20Contract = {
    address: tokenAddress as `0x${string}`,
    abi: abiERC20Testnet,
  } as const;

  const { data: dataAllowance, isSuccess: isSuccessBalanceWallet } =
    useReadContracts({
      allowFailure: false,
      contracts: [
        {
          ...erc20Contract,
          functionName: "allowance",
          args: [`${address}`, addressApproved],
        },
        {
          ...erc20Contract,
          functionName: "decimals",
        },
      ],
      query: {
        refetchInterval: timeByBlock / 4,
        enabled: tokenAddress !== undefined,
      },
    });

  const isApproveNeeded = useMemo(() => {
    if (isSuccessBalanceWallet) {
      return amountTokenBigInt > (dataAllowance?.[0] as bigint);
    }
  }, [isSuccessBalanceWallet, amountTokenBigInt, dataAllowance?.[0]]);

  return { isApproveNeeded };
};
