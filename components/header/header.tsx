import React from "react";
import Menu from "./menu/menu";

const Header = () => {
  return (
    <div className="flex flex-col w-full px-12 py-4 gap-4 ">
      <Menu />
    </div>
  );
};

export default Header;
