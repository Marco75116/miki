"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import EarnSection from "./earnSection";
import Link from "next/link";
import TradeSection from "./tradeSection";
type MenuSectionProps = {
	section: { label: string; href: string };
};

const MenuSection = ({ section }: MenuSectionProps) => {
	const pathname = usePathname();

	const currentPage = useMemo(() => {
		if (section.href === "/" || section.href === "https://meson.fi/") {
			return pathname === section.href;
		}

		return pathname.includes(section.href.split("/")[1]);
	}, [section, pathname]);

	if (section.label === "trade") {
		return <TradeSection label={section.label} currentPage={currentPage} />;
	}

	if (section.label === "earn") {
		return <EarnSection label={section.label} currentPage={currentPage} />;
	}

	return (
		<Link
			className={`text-lg  cursor-pointer flex items-center  ${
				currentPage ? "font-semibold" : "font-light"
			}`}
			href={section.href}
			target={`${section.href === "https://meson.fi/" ? "_blank" : "_self"}`}
		>
			{section.label}
		</Link>
	);
};

export default MenuSection;
