"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import EarnSection from "./earnSection";
type MenuSectionProps = {
  section: { label: string; href: string };
};

const MenuSection = ({ section }: MenuSectionProps) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    if (section.href === "/") {
      return pathname === section.href;
    }
    return pathname.includes(section.href);
  }, [section, pathname]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`text-lg  cursor-pointer flex items-center  ${
        currentPage ? "font-semibold" : "font-light"
      }`}
      onClick={() => {
        push(section.href);
      }}
    >
      {section.label === "earn" ? (
        <EarnSection label={section.label} />
      ) : (
        section.label
      )}
    </div>
  );
};

export default MenuSection;
