"use client";

import { useCallback, useRef, useState } from "react";

/** Draggable pane width — starts at `null` (let the CSS default apply)
 * until the user drags, then holds an explicit px value clamped to
 * [min, max], same floor/ceiling the CSS default width respects. */
export function useResizableWidth(min: number, max: number) {
  const [width, setWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!elRef.current) return;
      const startX = e.clientX;
      const startWidth = elRef.current.getBoundingClientRect().width;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      setIsDragging(true);

      function onMove(ev: MouseEvent) {
        const next = Math.max(min, Math.min(max, startWidth + (ev.clientX - startX)));
        setWidth(next);
      }
      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        setIsDragging(false);
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [min, max]
  );

  return { width, elRef, isDragging, onMouseDown };
}
