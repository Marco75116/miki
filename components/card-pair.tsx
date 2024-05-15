"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useUserPoolInfos } from "@/lib/hooks/useUserPoolInfos";
import {
	formatNumber,
	toFormattedPercentage,
} from "@/lib/helpers/global.helper";
import Link from "next/link";
import { useGetERC20Infos } from "@/lib/hooks/useGetERC20Infos";
import ImageTokenList from "./ImageTokenList";

type CardPairV2Props = {
	lpAddress: string;
};

const CardPairV2 = ({ lpAddress }: CardPairV2Props) => {
	const {
		balancePairV2,
		poolShare,
		balanceToken0,
		balanceToken1,
		token0Address,
		token1Address,
	} = useUserPoolInfos(lpAddress);

	const { symbol: token0Symbol } = useGetERC20Infos(token0Address);
	const { symbol: token1Symbol } = useGetERC20Infos(token1Address);

	return (
		<Card>
			<CardContent className="pb-0">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1" className=" border-b-0">
						<AccordionTrigger>
							{token0Symbol}/{token1Symbol}
						</AccordionTrigger>
						<AccordionContent>
							<Separator />

							<div className=" flex flex-col gap-6 mt-2">
								<div className="flex flex-col space-y-2">
									<div className="flex flex-row justify-between">
										<div>Your total pool tokens:</div>
										<div>{balancePairV2}</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>Pool tokens in rewards pool:</div>
										<div>0</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>{token0Symbol}:</div>
										<div className="flex gap-1">
											{formatNumber(balanceToken0, 3)}
											<ImageTokenList symbol={token0Symbol} />
										</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>{token1Symbol}:</div>
										<div className="flex gap-1">
											{formatNumber(balanceToken1, 3)}

											<ImageTokenList symbol={token1Symbol} />
										</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>Your pool share:</div>
										<div>{toFormattedPercentage(Number(poolShare), 2)}</div>
									</div>
								</div>
								<div className="center gap-4">
									<Link href={`add/${token0Address}/${token1Address}`}>
										<Button className={cn("bg-mauve hover:bg-mauve/80")}>
											Add Lidquity
										</Button>
									</Link>
									<Link href={`remove/${lpAddress}`}>
										<Button className={cn("bg-mauve hover:bg-mauve/80")}>
											Remove Lidquity
										</Button>
									</Link>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
};

export default CardPairV2;
