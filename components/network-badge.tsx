"use client";
import React, { useMemo } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { Badge } from "./ui/badge";

const Networkbadge = () => {
	const { chainId } = useAccount();
	const isRightNetwork = useMemo(() => {
		return chainId === 1_444_673_419;
	}, [chainId]);
	const { switchChain } = useSwitchChain();

	if (!isRightNetwork)
		return (
			<Badge
				className={`m-2 mr-5 ${!isRightNetwork && "cursor-pointer"}`}
				variant={isRightNetwork ? "default" : "destructive"}
				onClick={() => {
					switchChain({ chainId: 1_444_673_419 });
				}}
			>
				{"You are on the wrong network."}
			</Badge>
		);
};

export default Networkbadge;
