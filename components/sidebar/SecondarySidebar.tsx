"use client";

import { useResizableWidth } from "@/hooks/useResizableWidth";
import Resizer from "./Resizer";

/** Secondary sidebar panel — appears once a second-nest-level item is
 * picked in the primary rail. Content is fully caller-supplied. */
export default function SecondarySidebar({ children }: { children: React.ReactNode }) {
  const { width, elRef, isDragging, onMouseDown } = useResizableWidth(200, 420);

  return (
    <>
      <aside
        ref={elRef as React.RefObject<HTMLDivElement>}
        style={width ? { width } : undefined}
        className="w-[clamp(200px,20vw,264px)] min-w-[200px] max-w-[420px] flex-none overflow-hidden border-r border-[#CBD5E1] bg-white px-4 py-5"
      >
        {children}
      </aside>
      <Resizer isDragging={isDragging} onMouseDown={onMouseDown} />
    </>
  );
}
