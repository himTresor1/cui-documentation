"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";

export type SidebarListItem = { key: string; label: string; icon: LucideIcon; href?: string };

/** Flat list of icon + label rows, used inside the secondary sidebar panel. */
export default function SidebarItemList({
  items,
  defaultActive,
}: {
  items: SidebarListItem[];
  defaultActive?: string;
}) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.key);

  return (
    <nav className="flex flex-col gap-px">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.key}
            href={item.href ?? "#"}
            onClick={(e) => {
              if (!item.href || item.href === "#") e.preventDefault();
              setActive(item.key);
            }}
            className={`flex min-h-[34px] items-center gap-2 rounded-cui-sm border px-2.5 py-1.5 font-sans text-[13.5px] whitespace-nowrap ${
              active === item.key
                ? "border-cui-nav-active-border bg-cui-nav-active font-semibold text-cui-header-body"
                : "border-transparent text-cui-header-body hover:bg-cui-surface-hover"
            }`}
          >
            <Icon className="h-4 w-4 flex-none text-cui-icon" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
