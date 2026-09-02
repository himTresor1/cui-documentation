import type { Metadata } from "next";
import DoubleSidebarShell from "@/components/double-sidebar/DoubleSidebarShell";

export const metadata: Metadata = {
  title: "Double Sidebar — Common UI",
};

export default function DoubleSidebarPage() {
  return <DoubleSidebarShell />;
}
