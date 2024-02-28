"use client";
import CheckConnected from "@/components/checkConnected";
import dynamic from "next/dynamic";

const ConnectModal = dynamic(() => import("@/components/connect-modal"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="flex items-center w-full h-12 mb-8">
      <CheckConnected />
      <ConnectModal />
    </div>
  );
}
