"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
type MenuSectionProps = {
  section: { label: string; href: string };
};

const MenuSection = ({ section }: MenuSectionProps) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    return section.href === pathname;
  }, [section, pathname]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`text-lg  cursor-pointer   ${
        currentPage ? "font-semibold" : "font-light"
      }`}
      onClick={() => {
        push(section.href);
      }}
    >
      {section.label}
    </div>
  );
};

export default MenuSection;
