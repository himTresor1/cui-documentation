"use client";

import Image from "next/image";
import { Search, MessageSquare, Bell, ChevronRight } from "lucide-react";

export default function DocsHeader({
  breadcrumb,
  onOpenSearch,
}: {
  breadcrumb: string[];
  onOpenSearch: () => void;
}) {
  return (
    <header className="flex h-[70px] flex-none items-center justify-between border-b border-cui-border bg-white px-5">
      <div className="flex items-center gap-1.5 text-[13px] text-cui-body">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-4 w-4 flex-none text-cui-muted" />}
            <span className={i === breadcrumb.length - 1 ? "font-semibold text-cui-header-body" : ""}>{crumb}</span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-9 w-[220px] flex-none items-center gap-2 rounded-cui-sm border border-cui-border bg-cui-surface-hover px-3 text-[13px] text-cui-muted transition-colors hover:border-[#d3d5e0]"
        >
          <Search className="h-[15px] w-[15px] flex-none" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="flex-none rounded border border-cui-border bg-white px-1.5 py-0.5 font-sans text-[11px] text-cui-muted">
            ⌘K
          </kbd>
        </button>
        <button
          type="button"
          aria-label="Comments"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-cui text-cui-body hover:bg-cui-surface-hover"
        >
          <MessageSquare className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 flex-none items-center justify-center rounded-cui text-cui-body hover:bg-cui-surface-hover"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-[7px] h-1.5 w-1.5 rounded-full bg-[#e11d48]" />
        </button>
        <Image
          src="/assets/images/avatar.png"
          alt=""
          width={30}
          height={30}
          className="flex-none rounded-full object-cover"
        />
      </div>
    </header>
  );
}
