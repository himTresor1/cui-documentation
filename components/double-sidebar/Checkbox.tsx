import type { InputHTMLAttributes } from "react";

export default function Checkbox({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      {...props}
      className={`relative h-4 w-4 flex-none cursor-pointer appearance-none rounded border-[1.5px] border-[#64748b] bg-white checked:border-cui-hero checked:bg-cui-hero after:absolute after:top-px after:left-1 after:hidden after:h-2 after:w-1 after:rotate-45 after:border-2 after:border-t-0 after:border-l-0 after:border-white after:content-[''] checked:after:block ${className}`}
    />
  );
}
