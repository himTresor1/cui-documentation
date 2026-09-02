"use client";

import { useEffect, useRef, useState } from "react";
import type { AnchorNavItem } from "@/components/CuiAnchorNav";

/**
 * Builds the "on this page" navigation for a documentation page by reading
 * the h2 headings already rendered inside a content element.
 *
 * Ported from CuiAnchorNav's own docs-site helper. Pages are not expected
 * to declare their own section list — headings are the source of truth,
 * so the nav cannot drift out of sync with the page. Headings without an
 * `id` are given a slugified one so they can be linked to.
 */

const HEADING_SELECTOR = "h2";

/** Elements whose headings are part of a demo, not the page's own structure. */
const IGNORED_ANCESTORS = [".anchornav-wrapper", "[data-anchor-nav-ignore]"];

const slugify = (text: string, fallbackIndex: number): string => {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `section-${slug}` : `section-${fallbackIndex + 1}`;
};

/**
 * The docs shell scrolls an inner element rather than the window, so the
 * nav has to be told which element that is. Walking up from the content
 * is more robust than hardcoding a class that may be restyled.
 */
const findScrollParent = (start: HTMLElement | null): HTMLElement | null => {
  let node = start?.parentElement ?? null;
  while (node && node !== document.body) {
    const overflowY = getComputedStyle(node).overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

export function useAutoAnchorNav(contentRef: React.RefObject<HTMLElement | null>) {
  const [items, setItems] = useState<AnchorNavItem[]>([]);
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);
  const rescanTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const scan = () => {
      const used = new Set<string>();
      const found: AnchorNavItem[] = [];

      root.querySelectorAll<HTMLElement>(HEADING_SELECTOR).forEach((heading, index) => {
        if (IGNORED_ANCESTORS.some((sel) => heading.closest(sel))) return;

        const label = (heading.textContent ?? "").trim();
        if (!label) return;

        let id = heading.id;
        if (!id) {
          const base = slugify(label, index);
          // Two sections can legitimately share a title; keep ids unique.
          let unique = base;
          let suffix = 2;
          while (used.has(unique) || document.getElementById(unique)) {
            unique = `${base}-${suffix++}`;
          }
          id = unique;
          heading.id = id;
        }
        if (used.has(id)) return;

        used.add(id);
        // Let the heading receive focus when the nav jumps to it.
        if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
        heading.style.scrollMarginTop = "1rem";

        found.push({ id, label });
      });

      setItems((previous) => {
        const same =
          previous.length === found.length &&
          previous.every((item, i) => item.id === found[i].id && item.label === found[i].label);
        return same ? previous : found;
      });
      setScrollParent(findScrollParent(root));
    };

    scan();

    // Documentation pages can swap content client-side, so the heading
    // list has to be rebuilt as the DOM settles.
    const observer = new MutationObserver(() => {
      clearTimeout(rescanTimer.current);
      rescanTimer.current = setTimeout(scan, 150);
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      clearTimeout(rescanTimer.current);
    };
  }, [contentRef]);

  return { items, scrollParent };
}
