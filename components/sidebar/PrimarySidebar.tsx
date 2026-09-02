"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

export type SidebarCategory = { key: string; label: string; icon: LucideIcon };

export type SidebarTopItem =
  | { key: string; label: string; icon: LucideIcon; kind: "link"; href: string }
  | { key: string; label: string; icon: LucideIcon; kind: "toggle"; categories: SidebarCategory[] };

/**
 * Primary nav rail of the two-tier sidebar (CuiMainMenu). Opening a
 * "toggle" item expands its categories inline (first nest level);
 * picking a category is the second nest level — the parent then
 * collapses this rail to an icon-only strip and shows the category's
 * content in the secondary sidebar.
 *
 * Exactly one thing is "open" at a time (openToggle is a single key,
 * never a set), and it always corresponds to either the section the
 * user is actively browsing or the one that owns the current
 * category — closing it (or navigating to a link, or opening a
 * different section) always clears both the open state and the
 * category together, so nothing stays expanded once you've moved on.
 */
export default function PrimarySidebar({
  logoHref,
  logoLabel,
  topLevel,
  initialActiveKey,
  activeCategory,
  onSelectCategory,
  onLeaveCategory,
  collapsed,
  onExpand,
}: {
  logoHref: string;
  logoLabel: string;
  topLevel: SidebarTopItem[];
  initialActiveKey?: string;
  activeCategory: string | null;
  onSelectCategory: (key: string, label: string) => void;
  onLeaveCategory: () => void;
  collapsed: boolean;
  onExpand: () => void;
}) {
  const [activeLink, setActiveLink] = useState(initialActiveKey ?? topLevel[0]?.key ?? "");
  const [openToggle, setOpenToggle] = useState<string | null>(
    topLevel.find((item) => item.kind === "toggle" && item.categories.some((c) => c.key === activeCategory))?.key ??
      null
  );

  const categoryOwnerKey = topLevel.find(
    (item) => item.kind === "toggle" && item.categories.some((c) => c.key === activeCategory)
  )?.key;

  function handleLinkClick(item: Extract<SidebarTopItem, { kind: "link" }>, e: React.MouseEvent) {
    if (collapsed) e.preventDefault();
    setActiveLink(item.key);
    setOpenToggle(null);
    if (activeCategory !== null) onLeaveCategory();
    else if (collapsed) onExpand();
  }

  function handleToggleClick(item: Extract<SidebarTopItem, { kind: "toggle" }>) {
    const ownsCurrent = activeCategory !== null && item.key === categoryOwnerKey;

    if (collapsed) {
      // Collapsed rail: a click always means "bring me back", never closes.
      if (activeCategory !== null && !ownsCurrent) onLeaveCategory();
      setOpenToggle(item.key);
      onExpand();
      return;
    }

    if (openToggle === item.key) {
      setOpenToggle(null);
      if (ownsCurrent) onLeaveCategory();
      return;
    }

    if (activeCategory !== null && !ownsCurrent) onLeaveCategory();
    setOpenToggle(item.key);
  }

  return (
    <aside
      className={`flex flex-none flex-col overflow-hidden border-r border-[#CBD5E1] bg-cui-sidebar px-3 py-4 transition-[width] duration-500 ease-in-out ${
        collapsed ? "w-16" : "w-[260px]"
      }`}
    >
      <Link
        href={logoHref}
        className={`mb-4 flex items-center gap-2 px-1.5 pt-1 text-[13px] font-semibold text-cui-header-body ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <Image src="/assets/images/ist-logo.svg" alt="IST" width={26} height={16} className="flex-none" />
        {!collapsed && <span className="whitespace-nowrap">{logoLabel}</span>}
      </Link>

      {!collapsed && (
        <div className="mb-2 px-2.5 text-[11px] font-bold tracking-[0.06em] text-cui-muted uppercase">Main Menu</div>
      )}

      <nav className="flex flex-1 flex-col gap-px">
        {topLevel.map((item) => {
          const isOpen = openToggle === item.key;
          // A toggle never shows the active pill itself — once one of its
          // categories is selected, the category is what's active, and
          // showing both reads as two things being "current" at once.
          const isActive = item.kind === "toggle" ? false : activeCategory === null && activeLink === item.key;
          const Icon = item.icon;

          const itemClasses = `flex min-h-[34px] w-full items-center gap-2 rounded-cui-sm border px-2.5 py-1.5 text-left font-sans text-[13.5px] whitespace-nowrap text-cui-header-body ${
            isActive
              ? "border-cui-nav-active-border bg-cui-nav-active font-semibold"
              : "border-transparent font-normal hover:bg-cui-surface-hover"
          } ${collapsed ? "justify-center px-0" : ""}`;

          const body = (
            <>
              <Icon className="h-4 w-4 flex-none text-cui-icon" />
              {!collapsed &&
                (item.kind === "toggle" ? (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 flex-none text-cui-icon transition-transform duration-150 ${
                        isOpen ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </>
                ) : (
                  item.label
                ))}
            </>
          );

          return (
            <div key={item.key}>
              {item.kind === "link" ? (
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  onClick={(e) => handleLinkClick(item, e)}
                  className={itemClasses}
                >
                  {body}
                </Link>
              ) : (
                <button
                  type="button"
                  title={collapsed ? item.label : undefined}
                  onClick={() => handleToggleClick(item)}
                  aria-expanded={isOpen}
                  className={itemClasses}
                >
                  {body}
                </button>
              )}

              {!collapsed && item.kind === "toggle" && (
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="flex min-h-0 flex-col gap-px py-0.5 pl-[30px]">
                    {item.categories.length > 0 ? (
                      item.categories.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                          <a
                            key={cat.key}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectCategory(cat.key, cat.label);
                            }}
                            className={`flex items-center gap-2 rounded-cui-sm border px-2.5 py-1.5 text-[13px] whitespace-nowrap ${
                              activeCategory === cat.key
                                ? "border-cui-nav-active-border bg-cui-nav-active font-semibold text-cui-header-body"
                                : "border-transparent text-cui-header-body hover:bg-cui-surface-hover"
                            }`}
                          >
                            <CatIcon className="h-3.5 w-3.5 flex-none text-cui-icon" />
                            {cat.label}
                          </a>
                        );
                      })
                    ) : (
                      <span className="block px-2.5 py-1.5 text-[12.5px] text-cui-muted italic">
                        Nothing built here yet
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <a
          href="#"
          className="mt-3 border-t border-cui-border px-2.5 py-2.5 text-[12.5px] font-semibold whitespace-nowrap text-cui-body"
        >
          Support / Documentation
        </a>
      )}
    </aside>
  );
}
