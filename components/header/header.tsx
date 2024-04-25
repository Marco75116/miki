import React from "react";
import Menu from "./menu/menu";
import AddressDiplayed from "./addressDiplayed";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-12 py-4 gap-4 ">
      <Link className="font-medium text-3xl cursor-pointer" href={"/"}>
        miki
      </Link>
      <div className="flex flex-row items-center space-x-4">
        <Menu />
        <AddressDiplayed />
      </div>
    </div>
  );
};

export default Header;
