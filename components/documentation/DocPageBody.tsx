"use client";

import { useRef } from "react";
import { CuiAnchorNav } from "@/components/CuiAnchorNav";
import { useAutoAnchorNav } from "@/hooks/useAutoAnchorNav";

// Shared with DocHeroRail below, so the hero's centered title lines up
// with the body content even though only the body actually has a rail.
const RAIL_ROW = "flex items-start gap-8 px-6";
const RAIL_WIDTH = "w-[180px]";

/**
 * Wraps a documentation page's body content with the "on this page"
 * anchor nav — required on every documentation page per AGENTS.md, so a
 * long page always shows its own length/structure at a glance. Section
 * list is read straight off the page's own <h2> headings (see
 * useAutoAnchorNav), so it can never drift out of sync with the content.
 */
export default function DocPageBody({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { items, scrollParent } = useAutoAnchorNav(contentRef);

  return (
    <div className={RAIL_ROW}>
      <div ref={contentRef} className="min-w-0 flex-1">
        {children}
      </div>
      {items.length > 0 && (
        <aside className={`sticky top-12 hidden ${RAIL_WIDTH} flex-none pt-12 lg:block`}>
          <CuiAnchorNav
            items={items}
            orientation="vertical"
            scrollContainer={scrollParent}
            offset={16}
            className="border-r-0"
          />
        </aside>
      )}
    </div>
  );
}

/**
 * Reserves the same width DocPageBody's anchor-nav rail takes up, so a
 * hero section's centered title lines up with the body content below it
 * — the hero itself never shows a rail, only the invisible spacer.
 */
export function DocHeroRail({ children }: { children: React.ReactNode }) {
  return (
    <div className={RAIL_ROW}>
      <div className="min-w-0 flex-1">{children}</div>
      <div aria-hidden="true" className={`hidden ${RAIL_WIDTH} flex-none lg:block`} />
    </div>
  );
}
