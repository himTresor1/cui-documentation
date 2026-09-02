"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowUp, ArrowDown, CornerDownLeft, ChevronRight, type LucideIcon } from "lucide-react";

export type PaletteItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
};

export type PaletteSection = {
  title: string;
  items: PaletteItem[];
};

/** Cmd/Ctrl+K search modal — pushes suggestions (main sidebar sections
 * and their categories) rather than waiting for a query, matching the
 * pattern most docs sites use for this shortcut. */
export default function CommandPalette({
  open,
  onClose,
  sections,
}: {
  open: boolean;
  onClose: () => void;
  sections: PaletteSection[];
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((section) => ({ ...section, items: section.items.filter((item) => item.label.toLowerCase().includes(q)) }))
      .filter((section) => section.items.length > 0);
  }, [query, sections]);

  // Each item's flat index, precomputed once per render — accumulated
  // functionally (reduce's return value) rather than by mutating a
  // counter while mapping over sections in the JSX below.
  const sectionsWithOffsets = useMemo(
    () =>
      filteredSections.reduce<{ offset: number; sections: (PaletteSection & { offset: number })[] }>(
        (acc, section) => ({
          offset: acc.offset + section.items.length,
          sections: [...acc.sections, { ...section, offset: acc.offset }],
        }),
        { offset: 0, sections: [] }
      ).sections,
    [filteredSections]
  );

  const flatItems = useMemo(() => filteredSections.flatMap((section) => section.items), [filteredSections]);

  // Resetting activeIndex when query/open change is state derived from
  // props changing mid-render, not a side effect — done here rather
  // than in an effect (avoids an extra render pass).
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        flatItems[activeIndex]?.action();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, flatItems, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="flex max-h-[70vh] w-full max-w-[560px] flex-col overflow-hidden rounded-cui border border-cui-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-none items-center gap-2.5 border-b border-cui-border px-4 py-3.5">
          <Search className="h-[18px] w-[18px] flex-none text-cui-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-cui-header-body outline-none placeholder:text-cui-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-6 w-6 flex-none items-center justify-center rounded text-cui-muted hover:bg-cui-surface-hover"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {filteredSections.length === 0 && <p className="px-4 py-6 text-center text-sm text-cui-muted">No results</p>}
          {sectionsWithOffsets.map((section) => (
            <div key={section.title} className="mb-1 px-2">
              <div className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-[0.04em] text-cui-muted uppercase">
                {section.title}
              </div>
              {section.items.map((item, i) => {
                const idx = section.offset + i;
                const isActive = idx === activeIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => item.action()}
                    className={`flex w-full items-center gap-2.5 rounded-cui-sm px-2.5 py-2 text-left text-sm text-cui-header-body ${
                      isActive ? "bg-cui-surface-hover" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-none text-cui-icon" />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 flex-none text-cui-muted" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-none items-center justify-between border-t border-cui-border bg-cui-surface-hover px-4 py-2.5 text-xs text-cui-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="flex h-5 w-5 items-center justify-center rounded border border-cui-border bg-white">
                <ArrowUp className="h-3 w-3" />
              </kbd>
              <kbd className="flex h-5 w-5 items-center justify-center rounded border border-cui-border bg-white">
                <ArrowDown className="h-3 w-3" />
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="flex h-5 w-5 items-center justify-center rounded border border-cui-border bg-white">
                <CornerDownLeft className="h-3 w-3" />
              </kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            Close
            <kbd className="rounded border border-cui-border bg-white px-1.5 py-0.5">ESC</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
