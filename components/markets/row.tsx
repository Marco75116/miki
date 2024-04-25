"use client";
import { TokenMarket } from "@/lib/types/global.type";
import { TableCell, TableRow } from "../ui/table";
import React, { useMemo } from "react";
import Image from "next/image";
import {
  formatNumber,
  toFormattedPercentage,
} from "@/lib/helpers/global.helper";
import { Button } from "../ui/button";
import skaleLogo from "@/lib/assets/tokens/skale.png";
import { useRouter } from "next/navigation";

type RowTokensProps = {
  token: TokenMarket;
};

const Row = ({ token }: RowTokensProps) => {
  const router = useRouter();
  const assetCell = useMemo(() => {
    return (
      <div className="flex gap-2 items-center">
        <Image src={token.imgSrc} alt="token img" height={40} />
        <div className="flex flex-col justify-center gap-1">
          <div>{token.name}</div>{" "}
          <div className="text-muted-foreground text-xs">{token.symbol}</div>
        </div>
      </div>
    );
  }, [token.symbol, token.imgSrc, token.name]);

  const totalSuppliedCell = useMemo(() => {
    const decimalsDiplayed = token.totalSupplied < 1000000 ? 0 : 2;
    const usdValue = token.totalSupplied * token.price;
    const usdDecimalsDiplayed = usdValue < 1000000 ? 0 : 2;
    return (
      <div className="flex flex-col justify-center gap-1">
        <div>{formatNumber(token.totalSupplied, decimalsDiplayed)}</div>
        <div className="text-muted-foreground text-xs">
          ${formatNumber(usdValue, usdDecimalsDiplayed)}
        </div>
      </div>
    );
  }, [token.totalSupplied, token.price]);

  const supplyAPYCell = useMemo(() => {
    const totalApy = token.supplyAPY + token.supplyBoost;
    return (
      <div className="flex flex-col">
        {toFormattedPercentage(totalApy, 2)}
        {token.supplyBoost ? (
          <div>
            <Button
              variant={"secondary"}
              className="text-muted-foreground text-xs bg-white flex gap-1 items-center"
              size={"xs"}
            >
              {toFormattedPercentage(token.supplyBoost, 2)}
              <Image src={skaleLogo} alt="skale logo" height={15} />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }, [token.supplyAPY, token.supplyBoost]);

  const totalBorrowedCell = useMemo(() => {
    const decimalsDiplayed = token.totalBorrowed < 1000000 ? 0 : 2;
    const usdValue = token.totalBorrowed * token.price;
    const usdDecimalsDiplayed = usdValue < 1000000 ? 0 : 2;
    return (
      <div className="flex flex-col justify-center gap-1">
        <div>{formatNumber(token.totalBorrowed, decimalsDiplayed)}</div>
        <div className="text-muted-foreground text-xs">
          ${formatNumber(usdValue, usdDecimalsDiplayed)}
        </div>
      </div>
    );
  }, [token.totalBorrowed, token.price]);

  const borrowAPYCell = useMemo(() => {
    const totalApy = token.borrowAPY - token.borrowBoost;
    return (
      <div>
        {toFormattedPercentage(totalApy, 2)}
        {token.borrowBoost ? (
          <div>
            <Button
              variant={"secondary"}
              className="text-muted-foreground text-xs bg-white flex gap-1 items-center"
              size={"xs"}
            >
              {toFormattedPercentage(token.borrowBoost, 2)}
              <Image src={skaleLogo} alt="skale logo" height={15} />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }, [token.borrowAPY, token.borrowBoost]);

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => {
        router.push(`/earn/lending/${token.addressToken}?action=supply`);
      }}
    >
      <TableCell className="font-medium">{assetCell}</TableCell>
      <TableCell className="font-medium">{totalSuppliedCell}</TableCell>
      <TableCell className="font-medium">{supplyAPYCell}</TableCell>
      <TableCell className="font-medium">{totalBorrowedCell}</TableCell>
      <TableCell className="font-medium">{borrowAPYCell}</TableCell>
      <TableCell className="text-right">
        <Button size={"sm"} className="font-light" variant={"secondary"}>
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
