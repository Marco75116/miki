import { useReadContracts } from "wagmi";
import { abiERC20Testnet } from "../constants/abis/abiERC20Testnet";

export const useGetERC20Infos = (tokenAddress: string | undefined) => {
  const erc20Contract = {
    address: tokenAddress as `0x${string}`,
    abi: abiERC20Testnet,
  } as const;

  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...erc20Contract,
        functionName: "symbol",
      },
      {
        ...erc20Contract,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: tokenAddress !== undefined,
    },
  });

  return {
    symbol: data?.[0] as string | undefined,
    decimals: data?.[1] as number | undefined,
  };
};
