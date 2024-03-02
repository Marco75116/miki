"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { CardDescription } from "../ui/card";

const AddressDiplayed = () => {
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

	return (
		<CardDescription className="flex flex-row items-end gap-1 ">
			<span className="font-semibold text-black ">Wallet Address :</span>
			{address}
			<Link href={urlExplorer} target="_blank">
				<ArrowUpRight />
			</Link>
		</CardDescription>
	);
};

export default AddressDiplayed;
