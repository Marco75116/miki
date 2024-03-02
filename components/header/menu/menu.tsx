import { menu } from "@/lib/constants/constant.global";
import React from "react";
import MenuSection from "./menuSection";

const Menu = () => {
	return (
		<div className="flex flex-row justify-between px-14 pt-4">
			{menu.map((section) => (
				<MenuSection key={section.href} section={section} />
			))}
		</div>
	);
};

export default Menu;
