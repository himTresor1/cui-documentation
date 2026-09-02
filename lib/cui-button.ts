/* CuiButton — ported from commonui.ist.com/react. Variants + tokens
   read directly off the live docs site's rendered <CuiButton>
   examples, so these match the real component's colors/radius/sizing.
   Swap for the actual <CuiButton> import if/when this moves into the
   CUI React app. */

export const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-cui border font-sans font-medium cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-cui-focus-ring)]";

export const btnMd = "h-[34px] px-4 text-sm";
export const btnLg = "h-[42px] px-6 text-base";

/** max one per page — the single most important action */
export const btnHero =
  "bg-cui-hero border-cui-hero text-white hover:bg-cui-hero-hover hover:border-cui-hero-hover active:bg-cui-hero-active active:border-cui-hero-active";

/** pairs with the hero button as a secondary action */
export const btnHeroOutline =
  "bg-transparent border-cui-hero text-cui-hero hover:bg-[rgba(10,10,10,0.05)] active:bg-[rgba(10,10,10,0.1)]";

/** main CTA for forms/sections, not the landing hero */
export const btnPrimary =
  "bg-cui-primary border-cui-primary text-white hover:bg-cui-primary-hover hover:border-cui-primary-hover active:bg-cui-primary-active active:border-cui-primary-active";

/** minimal weight, nav-style actions */
export const btnSecondaryText =
  "bg-transparent border-transparent text-cui-header-body hover:bg-cui-surface-hover";

/** neutral bordered button pairing a framework icon with its label */
export const btnFramework =
  "bg-white border-cui-border text-cui-header-body gap-2.5 hover:border-[#d3d5e0] hover:bg-cui-surface-hover";
