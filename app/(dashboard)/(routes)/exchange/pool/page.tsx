import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { cn } from "@/lib/utils";

const page = () => {
	return (
		<div className="h-full flex items-center flex-col">
			<div className="space-y-4 w-[40rem] mt-20">
				<div className="flex gap-4">
					<Link href={"swap"}>
						<Button className={cn("bg-mauve hover:bg-mauve/80")}>
							Create Pair
						</Button>
					</Link>
					<Link href={"/swap"}>
						<Button className={cn("bg-mauve hover:bg-mauve/80")}>
							Add Lidquity
						</Button>
					</Link>
				</div>

				<div>My Liquidity Positions : </div>
				<Card>
					<CardContent className="pb-0">
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1" className=" border-b-0">
								<AccordionTrigger>ETH/DAI </AccordionTrigger>
								<AccordionContent>
									<Separator />

									<div className=" flex flex-col gap-6 mt-2">
										<div className="flex flex-col space-y-2">
											<div className="flex flex-row justify-between">
												<div>Your total pool tokens:</div>
												<div>0.000003378</div>
											</div>
											<div className="flex flex-row justify-between">
												<div>Pool tokens in rewards pool:</div>
												<div>0</div>
											</div>
											<div className="flex flex-row justify-between">
												<div>ETH:</div>
												<div className="flex gap-1">
													0.000003378
													<Image src={ethLogo} alt="token img" height={20} />
												</div>
											</div>
											<div className="flex flex-row justify-between">
												<div>DAI:</div>
												<div className="flex gap-1">
													0.000003378
													<Image src={daiLogo} alt="token img" height={20} />
												</div>
											</div>
											<div className="flex flex-row justify-between">
												<div>Your total pool tokens:</div>
												<div>0.000003378</div>
											</div>
										</div>
										<div className="center gap-4">
											<Button className={cn("bg-mauve hover:bg-mauve/80")}>
												Add Lidquity
											</Button>
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
			</div>
		</div>
	);
};

export default page;
