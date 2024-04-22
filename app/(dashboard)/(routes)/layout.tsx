import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="h-full relative">
        <main className="overflow-hidden h-full flex flex-col">
          <Header />
          <Separator className="border" />

          <div className="flex-1">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
