"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Download,
  Palette,
  Blocks,
  LayoutTemplate,
  Grid2x2,
  Pencil,
  Zap,
  Table,
  Compass,
  MessageSquare,
  LayoutGrid,
  Type,
  Shapes,
  Ruler,
  Inbox,
  ClipboardList,
  Rows3,
  Eye,
  MousePointerClick,
  ArrowLeft,
  ChevronDownCircle,
  GitFork,
  CheckCircle2,
} from "lucide-react";
import PrimarySidebar, { type SidebarTopItem } from "@/components/sidebar/PrimarySidebar";
import SecondarySidebar from "@/components/sidebar/SecondarySidebar";
import SidebarItemList, { type SidebarListItem } from "@/components/sidebar/SidebarItemList";

const ACTIONS_ITEMS: SidebarListItem[] = [
  { key: "overview", label: "Overview", icon: Eye },
  { key: "button", label: "Button", icon: MousePointerClick },
  { key: "back-button", label: "Back Button", icon: ArrowLeft },
  { key: "button-dropdown", label: "Button Dropdown", icon: ChevronDownCircle },
  { key: "split-button", label: "Split Button", icon: GitFork },
  { key: "select-button", label: "Select Button", icon: CheckCircle2 },
];

const TOP_LEVEL: SidebarTopItem[] = [
  { key: "introduction", label: "Introduction", icon: Sparkles, kind: "link", href: "/documentation" },
  {
    key: "getting-started",
    label: "Getting Started",
    icon: Download,
    kind: "link",
    href: "/documentation/getting-started",
  },
  {
    key: "design-foundations",
    label: "Design Foundations",
    icon: Palette,
    kind: "toggle",
    categories: [
      { key: "colors", label: "Colors", icon: Palette },
      { key: "typography", label: "Typography", icon: Type },
      { key: "icons", label: "Icons", icon: Shapes },
      { key: "spacing", label: "Spacing", icon: Ruler },
    ],
  },
  {
    key: "components",
    label: "Components",
    icon: Blocks,
    kind: "toggle",
    categories: [
      { key: "overview", label: "Overview", icon: Grid2x2 },
      { key: "input", label: "Input", icon: Pencil },
      { key: "actions", label: "Actions", icon: Zap },
      { key: "data", label: "Data", icon: Table },
      { key: "navigation", label: "Navigation", icon: Compass },
      { key: "feedback", label: "Feedback", icon: MessageSquare },
      { key: "application", label: "Application", icon: LayoutGrid },
    ],
  },
  {
    key: "patterns",
    label: "Patterns",
    icon: LayoutTemplate,
    kind: "toggle",
    categories: [
      { key: "empty-states", label: "Empty States", icon: Inbox },
      { key: "forms", label: "Forms", icon: ClipboardList },
      { key: "tables", label: "Tables", icon: Rows3 },
    ],
  },
];

function activeKeyForPathname(pathname: string) {
  if (pathname === "/documentation/getting-started") return "getting-started";
  return "introduction";
}

function SecondaryContent({ activeCategory, activeLabel }: { activeCategory: string; activeLabel: string }) {
  if (activeCategory === "actions") {
    return (
      <>
        <div className="px-2.5 pb-2.5 text-xs font-bold tracking-[0.04em] whitespace-nowrap text-cui-muted uppercase">
          Actions
        </div>
        <SidebarItemList items={ACTIONS_ITEMS} defaultActive="button" />
      </>
    );
  }

  return (
    <>
      <div className="px-2.5 pb-2.5 text-xs font-bold tracking-[0.04em] whitespace-nowrap text-cui-muted uppercase">
        {activeLabel}
      </div>
      <span className="block px-2.5 py-1.5 text-[12.5px] text-cui-muted italic">Nothing built here yet</span>
    </>
  );
}

export default function DocsSidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  function leaveCategory() {
    setActiveCategory(null);
    setActiveLabel("");
    setCollapsed(false);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <PrimarySidebar
        logoHref="/"
        logoLabel="Common UI"
        topLevel={TOP_LEVEL}
        initialActiveKey={activeKeyForPathname(pathname)}
        activeCategory={activeCategory}
        onSelectCategory={(key, label) => {
          setActiveCategory(key);
          setActiveLabel(label);
          setCollapsed(true);
        }}
        onLeaveCategory={leaveCategory}
        collapsed={collapsed}
        onExpand={() => setCollapsed(false)}
      />
      {activeCategory && (
        <SecondarySidebar>
          <SecondaryContent activeCategory={activeCategory} activeLabel={activeLabel} />
        </SecondarySidebar>
      )}
      <main id="docs-scroll" className="min-w-0 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
