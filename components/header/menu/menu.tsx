import { menu } from "@/lib/constants/constant.global";
import React from "react";
import MenuSection from "./menuSection";

const Menu = () => {
  return (
    <div className="flex flex-row gap-2">
      {menu.map((section) => {
        return <MenuSection key={section.href} section={section} />;
      })}
    </div>
  );
};

export default Menu;
