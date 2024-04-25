"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { lendings } from "@/lib/constants/constant.global";

const TopTable = () => {
  const [boolWallet, setBoolWallet] = useState<boolean>(false);
  return (
    <div className="flex sm:items-center py-4 pr-1  gap-2 sm:gap-8 justify-between flex-col sm:flex-row ">
      <div className="flex gap-2 sm:gap-8 flex-col sm:flex-row ">
        <Input
          placeholder="Search asset name,symbol or address"
          onChange={(e) => {}}
          className="w-[20rem]"
        />

        <Button
          className={` flex gap-2 ${!boolWallet && " opacity-50"} `}
          onClick={() => {
            setBoolWallet((prev) => !prev);
          }}
        >
          My Wallet
        </Button>
      </div>

      <Select onValueChange={(value) => {}} defaultValue={lendings[0]}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {lendings.map((lending) => {
            return (
              <SelectItem value={lending} key={lending}>
                {lending}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopTable;
