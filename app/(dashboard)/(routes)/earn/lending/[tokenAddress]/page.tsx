"use client";
import React, { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockTokenData } from "@/lib/constants/constant.global";
import { Button } from "@/components/ui/button";
import { BadgeInfo, MoveLeft } from "lucide-react";
import Image from "next/image";
import coins from "@/lib/assets/designs/coins.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { lendingAction, lendingsActions } from "@/lib/types/global.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getMarketTokenFromSymbol,
  toFormattedPercentage,
} from "@/lib/helpers/global.helper";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Page = () => {
  const [amount, setAmount] = useState<string>("0");
  const [col, setCol] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const actionParam = useMemo(() => {
    return searchParams.get("action") as lendingAction;
  }, [searchParams]);

  const tokenAddress = useMemo(() => {
    const slugs = pathname.split("/");
    return slugs[slugs.length - 1];
  }, [pathname]);

  const BackButton = () => {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        className=" space-x-2"
        onClick={() => {
          router.push("/earn/lending");
        }}
      >
        <MoveLeft /> <div>Back</div>
      </Button>
    );
  };

  const token = useMemo(() => {
    return mockTokenData.find((token) => {
      return token.addressToken === tokenAddress;
    });
  }, [tokenAddress]);

  const apy = useMemo(() => {
    if (!token) {
      return 0;
    }
    if (actionParam === "supply" || actionParam === "withdraw") {
      return token.supplyAPY + token.supplyBoost;
    }
    return token.borrowAPY + token.borrowBoost;
  }, [token?.supplyAPY, token?.supplyBoost, token, actionParam]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (!token) {
    return (
      <div className="h-full center flex-col gap-4">
        <div className="flex center gap-2">
          We were unable to find your token searched.
          <Image className="" src={coins} alt="coins" height={40} />
        </div>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="h-full  max-w-[1512px] mx-auto px-2 lg:px-4 py-2 lg:py-14 overflow-x-hidden">
      <div className="flex flex-1 flex-row lg:space-x-32 pb-32">
        <div className="space-y-8 lg:space-y-14 w-full">
          <div className="flex items-center gap-2">
            <BackButton />
            <div className="flex items-center gap-1">
              <Image src={token.imgSrc} alt="token img" height={40} />
              <div className="flex flex-col justify-center gap-1">
                <div>{token.name}</div>{" "}
                <div className="text-muted-foreground text-xs">
                  {token.symbol}
                </div>
              </div>
            </div>
          </div>
          <div>markets keys</div>
        </div>
        <div>
          <div className="flex w-full lg:w-96 space-y-6 visible flex-col">
            <Card className="py-2">
              <div className="flex flex-1 gap-2 p-2">
                {lendingsActions.map((action) => {
                  return (
                    <Button
                      variant={"ghost"}
                      key={action}
                      onClick={() => {
                        router.push(
                          `${pathname}?${createQueryString("action", action)}`
                        );
                      }}
                    >
                      <span
                        className={`capitalize-first ${
                          action === actionParam
                            ? "font-semibold"
                            : "font-light"
                        }`}
                      >
                        {action}
                      </span>
                    </Button>
                  );
                })}
              </div>
              <Separator />
              <CardContent className="p-4  space-y-8">
                <div className="flex justify-between">
                  <Select
                    value={token.symbol}
                    onValueChange={(value) => {
                      const tokenSelected = getMarketTokenFromSymbol(value);
                      router.push(
                        `${tokenSelected?.addressToken}?${createQueryString(
                          "action",
                          actionParam
                        )}`
                      );
                    }}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select a Token" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTokenData.map((b) => (
                        <SelectItem
                          key={b.symbol}
                          value={b.symbol}
                          onClick={() => {}}
                        >
                          <div className="flex flex-row gap-2">
                            <Image src={b.imgSrc} alt="token img" height={20} />
                            <div>{b.symbol}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-col items-end">
                    <span className=" text-muted-foreground text-sm">
                      {actionParam === "supply" || actionParam === "withdraw"
                        ? "Supply"
                        : "Borrow"}
                      APY
                    </span>
                    <div className="font-medium text-lg">
                      {toFormattedPercentage(apy, 2)} APY
                    </div>
                  </div>
                </div>
                <div className="space-y-2 border p-4 rounded-md">
                  <div className="text-muted-foreground text-xs">Amount</div>
                  <div className="flex gap-4 items-center">
                    <Input
                      className="border-none font-medium "
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      onClick={() => {
                        setAmount("233");
                      }}
                    >
                      Max
                    </Button>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Balance : 233 {token.symbol}
                  </div>
                </div>
                <Button
                  className={cn(
                    "bg-mauve rounded-2xl px-6 w-full h-14 hover:bg-mauve/80"
                  )}
                >
                  <span className="capitalize-first">{actionParam}</span>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div
                className={`text-lg flex items-center gap-2 ${
                  col ? "text-black" : "text-muted-foreground "
                }`}
              >
                Enabled as Collateral{" "}
                <Switch
                  onCheckedChange={() => {
                    setCol((prev) => !prev);
                  }}
                />
              </div>
              <Card>
                <CardHeader className={"p-4"}>
                  <CardDescription>You have supplied</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-1">
                    <div className="text-2xl">$297.63</div>
                    <div className="text-sm text-muted-foreground">
                      297.75 {token.symbol}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className={"p-4"}>
                <CardDescription>Rewards</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between">
                  <div className="text-2xl">
                    $0.38
                    <Tooltip>
                      <TooltipTrigger className="text-muted-foreground">
                        <BadgeInfo height={16} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Rewards</div>
                            <div>
                              {" "}
                              <div>$0.05</div>
                              <div className="text-muted-foreground text-xs">
                                39.72 {token.symbol}
                              </div>
                            </div>
                            <div>
                              <div>$0.01</div>
                              <div className="text-muted-foreground text-xs">
                                3.72 Skale
                              </div>
                            </div>
                          </div>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Button variant={"secondary"} size={"sm"}>
                    Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
