"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import EarnSection from "./earnSection";
import Link from "next/link";
type MenuSectionProps = {
  section: { label: string; href: string };
};

const MenuSection = ({ section }: MenuSectionProps) => {
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    if (section.href === "/") {
      return pathname === section.href;
    }
    return pathname.includes(section.href);
  }, [section, pathname]);

  if (section.label === "earn") {
    return <EarnSection label={section.label} currentPage={currentPage} />;
  }

  return (
    <Link
      className={`text-lg  cursor-pointer flex items-center  ${
        currentPage ? "font-semibold" : "font-light"
      }`}
      href={section.href}
    >
      {section.label}
    </Link>
  );
};

export default MenuSection;
