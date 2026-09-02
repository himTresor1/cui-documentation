"use client";

import { useEffect, useRef, useState } from "react";

/* CUI-style dropdown — replaces the native <select>. */
export default function CuiDropdown({ options, defaultIndex = 0 }: { options: string[]; defaultIndex?: number }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultIndex);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[34px] w-full items-center justify-between gap-2 rounded-cui-sm border bg-white px-2.5 font-sans text-[13px] text-cui-header-body ${
          open ? "border-cui-hero shadow-[0_0_0_3px_rgba(78,51,217,0.12)]" : "border-cui-border hover:border-[#d3d5e0]"
        }`}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{options[selected]}</span>
        <span
          className={`material-symbols-outlined flex-none text-lg! text-cui-muted transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      <div
        className={`absolute top-[calc(100%+4px)] right-0 left-0 z-20 max-h-[220px] origin-top overflow-y-auto rounded-cui-sm border border-cui-border bg-white p-1 shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition-[opacity,transform] duration-300 ease-out ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              setSelected(i);
              setOpen(false);
            }}
            className={`block w-full rounded-[3px] px-2.5 py-2 text-left font-sans text-[13px] text-cui-header-body hover:bg-cui-surface-hover ${
              i === selected ? "bg-cui-nav-active font-semibold" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
