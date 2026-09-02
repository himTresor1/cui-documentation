type Item = { title: string; text: string };

type Column = {
  status: string;
  icon: string;
  accent: string;
  items: Item[];
};

const COLUMNS: Column[] = [
  {
    status: "In Progress",
    icon: "bolt",
    accent: "bg-cui-hero",
    items: [
      { title: "Form validation primitives", text: "Shared error/hint pattern for inputs, selects, and CuiDropdown." },
      { title: "Dark mode tokens", text: "A parallel token set so consuming apps can opt into dark surfaces." },
      { title: "Data table sorting & pagination", text: "Extending the schools-admin table trial into a reusable CuiTable." },
    ],
  },
  {
    status: "Up Next",
    icon: "schedule",
    accent: "bg-[#f79009]",
    items: [
      { title: "CuiModal", text: "Dialogs and confirmations, built on the same host pattern as toasts." },
      { title: "Design Foundations page", text: "Typography, color, spacing, and icon reference for the docs site." },
      { title: "CuiToast polish", text: "Stacking, auto-dismiss timing, and reduced-motion support." },
    ],
  },
  {
    status: "Exploring",
    icon: "explore",
    accent: "bg-cui-muted",
    items: [
      { title: "Figma-to-code sync", text: "Investigating whether tokens can round-trip with the design file." },
      { title: "Theming API", text: "Letting individual products override a small set of tokens safely." },
      { title: "Accessibility audit tooling", text: "Automated checks wired into the component library's CI." },
    ],
  },
];

export default function RoadmapBoard() {
  return (
    <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
      {COLUMNS.map((column) => (
        <div key={column.status} className="rounded-cui border border-cui-border bg-white p-4">
          <div className="mb-3.5 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${column.accent}`} aria-hidden="true" />
            <span className="material-symbols-outlined text-base! text-cui-muted" aria-hidden="true">
              {column.icon}
            </span>
            <span className="text-sm font-semibold text-cui-header-body">{column.status}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {column.items.map((item) => (
              <div key={item.title} className="rounded-cui border border-cui-border bg-cui-surface-hover p-3">
                <strong className="mb-1 block text-[13px] text-cui-body-dark">{item.title}</strong>
                <p className="text-xs leading-[1.5] text-cui-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
