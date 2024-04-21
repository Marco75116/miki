import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 items-start">
          <main className="flex flex-col w-full overflow-hidden">
            <Header />
            <Separator className="border" />

            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
