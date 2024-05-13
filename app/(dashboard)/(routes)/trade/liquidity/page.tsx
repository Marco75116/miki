import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import CardPairV2 from "@/components/card-pair";

const page = () => {
	return (
		<div className="h-full flex items-center flex-col">
			<div className="space-y-4 w-[40rem] mt-20">
				<div className="flex gap-4">
					<Link
						href={"add/0x8f8828d226Befb46A13F4924fDf87FC65bAb343a/undefined"}
					>
						<Button className={cn("bg-mauve hover:bg-mauve/80")}>
							Create Pair
						</Button>
					</Link>
					<Link
						href={"add/0x8f8828d226Befb46A13F4924fDf87FC65bAb343a/undefined"}
					>
						<Button className={cn("bg-mauve hover:bg-mauve/80")}>
							Add Lidquity
						</Button>
					</Link>
				</div>

				<div>My Liquidity Positions : </div>
				<CardPairV2 />
			</div>
		</div>
	);
};

export default page;
