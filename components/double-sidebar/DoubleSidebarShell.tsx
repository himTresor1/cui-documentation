"use client";

import { useState } from "react";
import {
  Home,
  Sparkles,
  Download,
  Blocks,
  Package,
  MoreHorizontal,
  Grid2x2,
  Pencil,
  Zap,
  Table,
  Compass,
  MessageSquare,
  LayoutGrid,
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
import MainBody from "./MainBody";
import CuiDropdown from "./CuiDropdown";
import Checkbox from "./Checkbox";

const ACTIONS_ITEMS: SidebarListItem[] = [
  { key: "overview", label: "Overview", icon: Eye },
  { key: "button", label: "Button", icon: MousePointerClick },
  { key: "back-button", label: "Back Button", icon: ArrowLeft },
  { key: "button-dropdown", label: "Button Dropdown", icon: ChevronDownCircle },
  { key: "split-button", label: "Split Button", icon: GitFork },
  { key: "select-button", label: "Select Button", icon: CheckCircle2 },
];

const TOP_LEVEL: SidebarTopItem[] = [
  { key: "home", label: "Home", icon: Home, kind: "link", href: "/" },
  { key: "intro", label: "Introduction to CUI", icon: Sparkles, kind: "toggle", categories: [] },
  { key: "installation", label: "Installation", icon: Download, kind: "link", href: "#" },
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
  { key: "blocks", label: "Blocks", icon: Package, kind: "toggle", categories: [] },
  { key: "other", label: "Other", icon: MoreHorizontal, kind: "toggle", categories: [] },
];

function FilterPanel() {
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between px-2.5 text-sm font-bold text-cui-header-body">
        <span>Filter</span>
        <button type="button" className="text-[13px] font-semibold text-cui-hero">
          Clear
        </button>
      </div>
      <div className="flex flex-col gap-3.5 px-2.5">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">Find by name</span>
          <input
            type="text"
            defaultValue="Sunshine preschool"
            className="h-[34px] rounded-cui border border-cui-border bg-white px-2.5 font-sans text-[13px] text-cui-header-body"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">My adress (find within range)</span>
          <input
            type="text"
            defaultValue="Sunshine Road 86"
            className="h-[34px] rounded-cui border border-cui-border bg-white px-2.5 font-sans text-[13px] text-cui-header-body"
          />
        </label>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">Range from my location</span>
          <CuiDropdown options={["5 km", "10 km", "25 km"]} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">Preschool area</span>
          <CuiDropdown options={["Stockholm West", "Stockholm East", "Stockholm South"]} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">Opening hours</span>
          <CuiDropdown options={["07:00 – 18:00", "06:30 – 17:30"]} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-cui-body">Profile</span>
          <CuiDropdown options={["Montessori", "Reggio Emilia", "Waldorf"]} />
        </div>
        <div className="mt-1 flex flex-col gap-2.5">
          <label className="flex items-center gap-2 font-sans text-[13px] text-cui-header-body">
            <Checkbox /> Private
          </label>
          <label className="flex items-center gap-2 font-sans text-[13px] text-cui-header-body">
            <Checkbox /> Municipal
          </label>
        </div>
      </div>
    </>
  );
}

function SecondaryContent({ activeCategory, activeLabel }: { activeCategory: string; activeLabel: string }) {
  if (activeCategory === "input") return <FilterPanel />;

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

export default function DoubleSidebarShell() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  function leaveCategory() {
    setActiveCategory(null);
    setActiveLabel("");
    setCollapsed(false);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <PrimarySidebar
        logoHref="/"
        logoLabel="Regional Samverkan"
        topLevel={TOP_LEVEL}
        initialActiveKey="home"
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
      <MainBody activeCategory={activeCategory ?? ""} />
    </div>
  );
}
