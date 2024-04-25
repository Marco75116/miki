import React from "react";
import { TableHead, TableRow } from "../ui/table";

const TableHeaderMarket = () => {
  return (
    <TableRow>
      <TableHead className="w-[430px]">Asset</TableHead>
      <TableHead className="w-[230px]">Total supplied</TableHead>
      <TableHead className="w-[230px] ">Supply APY</TableHead>
      <TableHead className="w-[230px] ">Total borrowed</TableHead>
      <TableHead className="w-[230px] ">Borrow APY</TableHead>
      <TableHead className="w-[0px]" />
    </TableRow>
  );
};

export default TableHeaderMarket;
