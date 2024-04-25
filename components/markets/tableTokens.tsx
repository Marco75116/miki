import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTokenData } from "@/lib/constants/constant.global";
import Row from "./row";
import TopTable from "./topTable";
import TableHeaderMarket from "./tableHeader";

const TableTokens = () => {
  return (
    <>
      <TopTable />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableHeaderMarket />
          </TableHeader>
          <TableBody>
            {mockTokenData.length !== 0 ? (
              mockTokenData.map((token) => (
                <Row token={token} key={token.addressToken} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableTokens;
