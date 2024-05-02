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
import Image from "next/image";
import ethLogo from "@/lib/assets/tokens/ethereum.png";
import daiLogo from "@/lib/assets/tokens/dai.png";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useUserPoolInfos } from "@/lib/hooks/useUserPoolInfos";
import {
	formatNumber,
	toFormattedPercentage,
} from "@/lib/helpers/global.helper";
import Link from "next/link";

const CardPairV2 = () => {
	const { balancePairV2, poolShare, balanceToken0, balanceToken1 } =
		useUserPoolInfos();

	return (
		<Card>
			<CardContent className="pb-0">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1" className=" border-b-0">
						<AccordionTrigger>DAI/ETH </AccordionTrigger>
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
										<div>DAI:</div>
										<div className="flex gap-1">
											{formatNumber(balanceToken0, 3)}
											<Image src={daiLogo} alt="token img" height={20} />
										</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>ETH:</div>
										<div className="flex gap-1">
											{formatNumber(balanceToken1, 3)}

											<Image src={ethLogo} alt="token img" height={20} />
										</div>
									</div>
									<div className="flex flex-row justify-between">
										<div>Your pool share:</div>
										<div>{toFormattedPercentage(Number(poolShare), 2)}</div>
									</div>
								</div>
								<div className="center gap-4">
									<Link
										href={
											"add/0x6aC1C63824991EE50DD41C17F2bb0d111D9fcec1/0x8f8828d226Befb46A13F4924fDf87FC65bAb343a"
										}
									>
										<Button className={cn("bg-mauve hover:bg-mauve/80")}>
											Add Lidquity
										</Button>
									</Link>
									<Button className={cn("bg-mauve hover:bg-mauve/80")}>
										Remove Lidquity
									</Button>
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
