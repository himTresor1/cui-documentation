"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AnchorNavItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export type AnchorNavOrientation = "responsive" | "vertical" | "horizontal";

export interface CuiAnchorNavProps {
  /** Sections to link to, in document order */
  items: AnchorNavItem[];
  /** Active item id. Omit to let the component track scrolling itself. */
  value?: string;
  /** Called when the highlighted section changes */
  onValueChange?: (id: string) => void;
  /**
   * Layout direction. `responsive` (default) is a vertical rail from the `md`
   * breakpoint up and a horizontal scroller below it.
   */
  orientation?: AnchorNavOrientation;
  /** Track the scroll position and highlight the section in view */
  scrollSpy?: boolean;
  /**
   * Scrolling element. Accepts a CSS selector or an element; defaults to the
   * page. Set this when the content scrolls inside a container.
   */
  scrollContainer?: string | HTMLElement | null;
  /** Pixels to leave above the target, e.g. the height of a sticky header */
  offset?: number;
  /** Accessible name for the navigation landmark */
  ariaLabel?: string;
  /** Called when an item is clicked */
  onItemClick?: (item: AnchorNavItem, event: MouseEvent) => void;
  /** Custom renderer for an item's label content */
  renderItem?: (props: { item: AnchorNavItem; active: boolean }) => ReactNode;
  className?: string;
}

const NAV_CLASSES: Record<AnchorNavOrientation, string> = {
  responsive: "max-md:border-b md:border-r",
  vertical: "border-r",
  horizontal: "border-b",
};

const LIST_CLASSES: Record<AnchorNavOrientation, string> = {
  responsive:
    "max-md:flex-row max-md:items-end max-md:gap-3 max-md:overflow-x-auto md:flex-col md:items-stretch md:gap-8",
  vertical: "flex-col items-stretch gap-8",
  horizontal: "flex-row items-end gap-3 overflow-x-auto",
};

const LINK_CLASSES: Record<AnchorNavOrientation, string> = {
  responsive: "max-md:flex-col max-md:items-center max-md:gap-2 md:flex-row md:items-center md:justify-end md:gap-8",
  vertical: "flex-row items-center justify-end gap-8",
  horizontal: "flex-col items-center gap-2",
};

const INDICATOR_CLASSES: Record<AnchorNavOrientation, string> = {
  responsive: "max-md:h-[3px] max-md:w-full md:w-[3px] md:self-stretch",
  vertical: "w-[3px] self-stretch",
  horizontal: "h-[3px] w-full",
};

// A long section title has nowhere to go in a fixed-width rail, so vertical
// labels truncate to one line with an ellipsis rather than wrapping — the rail
// stays a scannable column of equal-height rows, and the full text is on the
// link's `title`. A horizontal bar scrolls sideways instead, so it keeps its
// labels intact on one line.
const LABEL_CLASSES: Record<AnchorNavOrientation, string> = {
  responsive:
    "max-md:inline-flex max-md:items-center max-md:whitespace-nowrap md:block md:text-right md:truncate md:min-w-0",
  vertical: "block text-right truncate min-w-0",
  horizontal: "inline-flex items-center whitespace-nowrap",
};

/**
 * "On this page" anchor navigation — ported from CommonUI's real
 * CuiAnchorNav (builderio-components/components/react/src/components/CuiAnchorNav).
 * Logic is unchanged; CUI's own CSS custom properties are swapped for this
 * app's --color-cui-* / --radius-cui-* tokens.
 */
export function CuiAnchorNav({
  items,
  value,
  onValueChange,
  orientation = "responsive",
  scrollSpy = true,
  scrollContainer = null,
  offset = 0,
  ariaLabel = "On this page",
  onItemClick,
  renderItem,
  className,
}: CuiAnchorNavProps) {
  // Internal tracking is only used when the consumer does not pass `value`.
  const [observedId, setObservedId] = useState<string>(items[0]?.id ?? "");
  const activeId = value !== undefined ? value : observedId;

  // Kept in refs so the observer callback never closes over a stale value.
  // Synced via effect, not during render — mutating a ref while rendering
  // is unsafe under React's concurrent semantics.
  const activeIdRef = useRef(activeId);
  const itemsRef = useRef(items);
  useEffect(() => {
    activeIdRef.current = activeId;
    itemsRef.current = items;
  });

  const setActive = useCallback(
    (id: string) => {
      if (id === activeIdRef.current) return;
      setObservedId(id);
      onValueChange?.(id);
    },
    [onValueChange]
  );

  const resolveContainer = useCallback((): HTMLElement | null => {
    if (typeof document === "undefined") return null;
    if (!scrollContainer) return null;
    return typeof scrollContainer === "string" ? document.querySelector<HTMLElement>(scrollContainer) : scrollContainer;
  }, [scrollContainer]);

  // While a click-initiated scroll is animating, the observer keeps its record
  // of what is on screen up to date but stops driving the highlight.
  const spyLocked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const visible = useRef<Set<string>>(new Set());

  const scrollTarget = useCallback((): HTMLElement | Window | null => {
    if (typeof window === "undefined") return null;
    return resolveContainer() ?? window;
  }, [resolveContainer]);

  const releaseScrollSpy = useCallback(() => {
    spyLocked.current = false;
    clearTimeout(unlockTimer.current);
    unlockTimer.current = undefined;
  }, []);

  const lockScrollSpy = useCallback(() => {
    releaseScrollSpy();
    if (!scrollSpy) return;
    spyLocked.current = true;

    const target = scrollTarget();
    // `scrollend` fires exactly when the animation settles. Safari does not
    // support it yet, so a timeout backs it up — whichever lands first wins.
    target?.addEventListener("scrollend", releaseScrollSpy, { once: true });
    unlockTimer.current = setTimeout(releaseScrollSpy, 1000);
  }, [releaseScrollSpy, scrollSpy, scrollTarget]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
      const container = resolveContainer();

      if (container) {
        const delta = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
        container.scrollTo({
          top: container.scrollTop + delta - offset,
          behavior,
        });
      } else {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - offset,
          behavior,
        });
      }
    },
    [offset, resolveContainer]
  );

  const handleClick = (item: AnchorNavItem, event: MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    onItemClick?.(item, event);
    if (event.defaultPrevented) return;

    // Take over from the browser so the sticky-header offset is honoured and
    // the URL is not polluted with a hash on every click.
    event.preventDefault();

    // Highlight the destination up front and hold it there. A smooth scroll
    // travels through every section in between, which would otherwise make the
    // observer flicker the highlight across the whole list on the way down.
    setActive(item.id);
    lockScrollSpy();
    scrollToId(item.id);
    document.getElementById(item.id)?.focus?.({ preventScroll: true });
  };

  useEffect(() => {
    if (!scrollSpy || typeof IntersectionObserver === "undefined") return;

    const seen = visible.current;
    seen.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) seen.add(id);
          else seen.delete(id);
        }
        if (spyLocked.current) return;
        // Highlight the first visible section in document order so the rail
        // reads top-to-bottom rather than jumping to whichever fired last.
        const first = itemsRef.current.find((item) => seen.has(item.id));
        if (first) setActive(first.id);
      },
      {
        root: resolveContainer(),
        // Activate a section once its heading reaches the upper third of the
        // viewport, which is where a reader's eye actually is.
        rootMargin: `-${offset}px 0px -66% 0px`,
        threshold: 0,
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      seen.clear();
      releaseScrollSpy();
    };
  }, [items, offset, releaseScrollSpy, resolveContainer, scrollSpy, setActive]);

  // When the rail is taller than the space it is given, its container scrolls.
  // Clicking a link near the bottom leaves that container scrolled to the end,
  // hiding the sections above it — including the first one — even after the
  // reader returns to the top of the page. Nudge the rail so the active item is
  // always visible.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = navRef.current;
    if (!root || !activeId) return;

    const link = root.querySelector<HTMLElement>(`[data-anchor-id="${CSS.escape(activeId)}"]`);
    if (!link) return;

    let box = root.parentElement;
    const pageScroller = resolveContainer();
    while (box && box !== document.body) {
      const overflowY = getComputedStyle(box).overflowY;
      if ((overflowY === "auto" || overflowY === "scroll") && box.scrollHeight > box.clientHeight) {
        break;
      }
      box = box.parentElement;
    }
    // Nothing to nudge, or the only scroll box is the page itself.
    if (!box || box === document.body || box === pageScroller) return;

    const linkRect = link.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    if (linkRect.top < boxRect.top) {
      box.scrollTop -= boxRect.top - linkRect.top;
    } else if (linkRect.bottom > boxRect.bottom) {
      box.scrollTop += linkRect.bottom - boxRect.bottom;
    }
  }, [activeId, resolveContainer]);

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={["anchornav-wrapper block border-cui-border", NAV_CLASSES[orientation], className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <ul className={["anchornav-list m-0 flex list-none p-0", LIST_CLASSES[orientation]].join(" ")}>
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                data-anchor-id={item.id}
                title={item.label}
                data-current={active}
                aria-current={active ? "location" : undefined}
                aria-disabled={item.disabled ? "true" : undefined}
                className={[
                  "anchornav-link group flex rounded-cui-sm no-underline outline-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cui-focus-ring",
                  LINK_CLASSES[orientation],
                  item.disabled ? "cursor-not-allowed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={(event) => handleClick(item, event)}
              >
                {/* Label pill */}
                <span
                  className={[
                    "anchornav-label rounded-full px-3 py-1 text-xs leading-relaxed",
                    LABEL_CLASSES[orientation],
                    "transition-colors duration-200",
                    active
                      ? "bg-cui-nav-active text-cui-header-body"
                      : item.disabled
                        ? "text-cui-muted opacity-50"
                        : "text-cui-muted group-hover:bg-cui-surface-hover group-hover:text-cui-header-body",
                  ].join(" ")}
                >
                  {renderItem ? renderItem({ item, active }) : item.label}
                </span>

                {/* Position indicator on the rail */}
                <span
                  aria-hidden="true"
                  className={[
                    "anchornav-indicator shrink-0 rounded-full transition-colors duration-200",
                    INDICATOR_CLASSES[orientation],
                    active ? "bg-cui-nav-active-border" : "bg-transparent",
                  ].join(" ")}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
