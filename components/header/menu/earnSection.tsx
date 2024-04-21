"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "farms",
    href: "/earn/farms",
    description: "provide liquidity for rewards",
  },
  {
    title: "pool",
    href: "/earn/pool",
    description: "facilitate exchanges for fees",
  },
  {
    title: "lending",
    href: "/earn/lending",
    description: "earn interest by lending your cryptos or borrow for trading",
  },
  {
    title: "staking",
    href: "/earn/staking",
    description: "transform your holdings into a profitable asset",
  },
];
type EarnSectionProps = {
  label: string;
};
const EarnSection = ({ label }: EarnSectionProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="  w-[400px] gap-3 p-4 fixed bg-[#C599E0] rounded-lg">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default EarnSection;
