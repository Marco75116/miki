"use client";
import React from "react";
import Menu from "./menu/menu";
import AddressDiplayed from "./addressDiplayed";
import { useRouter } from "next/navigation";

const Header = () => {
  const { push } = useRouter();
  return (
    <div className="flex items-center justify-between w-full px-12 py-4 gap-4 ">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="font-medium text-3xl cursor-pointer"
        onClick={() => {
          push("/");
        }}
      >
        miki
      </div>
      <div className="flex flex-row items-center space-x-4">
        <Menu />
        <AddressDiplayed />
      </div>
    </div>
  );
};

export default Header;
