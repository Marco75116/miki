"use client";
import { ArrowUpRight, Wallet } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AddressDiplayed = () => {
  const router = useRouter();

  const { address } = useAccount();
  const { chains } = useSwitchChain();
  const chainId = useChainId();

  const urlExplorer = useMemo(() => {
    const chain = chains.find((chain) => chain.id === chainId);
    if (chain) {
      return `${chain?.blockExplorers?.default.url}/address/${address}`;
    }
    return "";
  }, [chainId, chains, address]);

  const shortAddress = useMemo(() => {
    return `${address?.slice(0, 5)}...${address?.slice(-4)}`;
  }, [address]);

  if (address) {
    return (
      <div className="flex flex-row items-end gap-1 text-sm ">
        <span className="font-semibold text-black ">
          <Wallet />
        </span>
        {shortAddress}
        <Link href={urlExplorer} target="_blank">
          <ArrowUpRight />
        </Link>
      </div>
    );
  }

  return (
    <Button
      variant={"outline"}
      className="flex flex-row items-end gap-1 text-sm center"
      onClick={() => {
        router.push("/connectwallet");
      }}
    >
      <span className="font-semibold text-black ">
        <Wallet />
      </span>
      connect wallet
    </Button>
  );
};

export default AddressDiplayed;
