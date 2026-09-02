"use client";

import { useState } from "react";

type Release = {
  version: string;
  date: string;
  tag: "Current" | "Stable" | "Trial";
  summary: string;
  changes: { kind: "added" | "changed" | "fixed" | "breaking"; text: string }[];
};

const CHIP_STYLES: Record<Release["changes"][number]["kind"], string> = {
  added: "bg-cui-badge-positive-bg text-cui-badge-positive-text",
  changed: "bg-[#e0e7ff] text-[#3730a3]",
  fixed: "bg-[#e0e7ff] text-[#3730a3]",
  breaking: "bg-cui-badge-negative-bg text-cui-badge-negative-text",
};

const CHIP_LABEL: Record<Release["changes"][number]["kind"], string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  breaking: "Breaking",
};

const RELEASES: Release[] = [
  {
    version: "v0.3.0",
    date: "August 2026",
    tag: "Current",
    summary:
      "Double-sidebar navigation pattern, filterable data tables, and a custom dropdown/checkbox pair for cases where native form controls can't match the design.",
    changes: [
      { kind: "added", text: "CuiMainMenu primary + secondary sidebar pattern, with draggable resize" },
      { kind: "added", text: "Filterable, sortable data table with row selection" },
      { kind: "added", text: "Custom dropdown and checkbox components" },
      { kind: "changed", text: "Nav active-state color standardized to the CUI yellow (#FFE393) across all menus" },
    ],
  },
  {
    version: "v0.2.0",
    date: "June 2026",
    tag: "Stable",
    summary:
      "First public-facing docs site, plus the CuiCard image slot teams had been asking for since the trial launch.",
    changes: [
      { kind: "added", text: "Getting Started documentation site" },
      { kind: "added", text: "CuiCard image slot and hover elevation" },
      { kind: "breaking", text: "CuiProgress removed — replaced by the inline progress-bar pattern used on this page" },
      { kind: "fixed", text: "Focus ring not visible on dark backgrounds" },
    ],
  },
  {
    version: "v0.1.0",
    date: "March 2026",
    tag: "Trial",
    summary:
      "Initial trial release: the smallest set of primitives needed to ship a real internal product screen end to end.",
    changes: [
      { kind: "added", text: "CuiButton, CuiCard, CuiApp shell — Vue and React, at parity" },
      { kind: "added", text: "Design tokens: color, radius, spacing" },
    ],
  },
];

const TAG_STYLES: Record<Release["tag"], string> = {
  Current: "bg-cui-badge-positive-bg text-cui-badge-positive-text",
  Stable: "bg-cui-surface-hover text-cui-body-dark",
  Trial: "bg-[#fef3c7] text-[#92400e]",
};

export default function ReleaseTimeline() {
  const [openVersion, setOpenVersion] = useState<string | null>(RELEASES[0].version);

  return (
    <div className="relative">
      <div className="absolute top-1 bottom-1 left-[7px] w-px bg-cui-border" aria-hidden="true" />
      <div className="flex flex-col gap-6">
        {RELEASES.map((release) => {
          const isOpen = openVersion === release.version;
          return (
            <div key={release.version} className="relative pl-8">
              <span
                className={`absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  release.tag === "Current" ? "bg-cui-hero" : "bg-cui-muted"
                }`}
                style={{ boxShadow: "0 0 0 1px var(--color-cui-border)" }}
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={() => setOpenVersion(isOpen ? null : release.version)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2.5">
                    <span className="font-display text-xl font-normal text-cui-header-body">
                      {release.version}
                    </span>
                    <span className={`rounded-cui px-2 py-0.5 text-[11px] font-semibold ${TAG_STYLES[release.tag]}`}>
                      {release.tag}
                    </span>
                    <span className="text-[13px] text-cui-muted">{release.date}</span>
                  </div>
                  <p className="max-w-[560px] text-sm leading-[1.6] text-cui-body">{release.summary}</p>
                </div>
                <span
                  className={`material-symbols-outlined mt-1 flex-none text-xl! text-cui-muted transition-transform duration-150 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <ul className="mt-3.5 flex flex-col gap-2 border-l-2 border-cui-border pl-4">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-cui-body">
                      <span
                        className={`mt-0.5 flex-none rounded-cui px-1.5 py-0.5 text-[10.5px] font-semibold ${CHIP_STYLES[change.kind]}`}
                      >
                        {CHIP_LABEL[change.kind]}
                      </span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
