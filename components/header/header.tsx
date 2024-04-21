"use client";
import React from "react";
import Menu from "./menu/menu";
import AddressDiplayed from "./addressDiplayed";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-12 py-4 gap-4 ">
      <div className="font-medium text-3xl">miki</div>
      <div className="flex flex-row items-center space-x-4">
        <Menu />
        <AddressDiplayed />
      </div>
    </div>
  );
};

export default Header;
