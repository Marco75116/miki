"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const CheckConnected = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    isConnected ? router.push("/overview") : router.push("/connectwallet");
  }, [isConnected]);

  return <div></div>;
};

export default CheckConnected;
