import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableTokens from "./tableTokens";

const Markets = () => {
  return (
    <div className="py-10">
      <CardHeader>
        <CardTitle>ERC-20 Market - Lend and borrow with confidence.</CardTitle>
      </CardHeader>
      <CardContent>
        <TableTokens />
      </CardContent>
    </div>
  );
};

export default Markets;
