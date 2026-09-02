"use client";

export default function Resizer({
  isDragging,
  onMouseDown,
}: {
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={`relative w-px flex-none cursor-col-resize before:absolute before:inset-y-0 before:-left-[3px] before:-right-[3px] before:content-[''] ${
        isDragging ? "bg-cui-hero" : "bg-[#f0f1f4] hover:bg-cui-hero"
      }`}
    />
  );
}
