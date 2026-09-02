"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { Highlight, themes, type Language, type PrismTheme } from "prism-react-renderer";

/** GitHub theme, with one fix: its last style rule re-matches
 * "keyword"/"tag" and overrides them to a dark indigo (#00009f) that
 * reads as purple — replaced with the brighter blue the theme
 * already uses for the same token category everywhere else. */
const codeTheme: PrismTheme = {
  ...themes.github,
  styles: themes.github.styles.map((rule) =>
    rule.style.color === "#00009f" ? { ...rule, style: { ...rule.style, color: "#0ea5e9" } } : rule
  ),
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code"
      className="flex h-7 w-7 flex-none items-center justify-center rounded text-cui-muted transition-colors hover:text-cui-header-body"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#16a34a]" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

/** Real, tokenized syntax highlighting (not one flat text color) —
 * inside a fixed-max-height panel so a long snippet scrolls in place
 * instead of stretching the page. */
function CodeLines({ code, language }: { code: string; language: Language }) {
  const trimmed = code.replace(/\n$/, "");

  return (
    <Highlight theme={codeTheme} code={trimmed} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="max-h-[340px] overflow-auto bg-white px-4 py-3.5">
          <code className="block font-mono text-[13px] leading-[1.6]">
            {tokens.map((line, i) => {
              const { className: lineClassName, style: lineStyle, ...lineRest } = getLineProps({ line });
              return (
                <div key={i} {...lineRest} style={lineStyle} className={`flex ${lineClassName}`}>
                  <span className="mr-4 w-4 flex-none text-right text-cui-muted/50 select-none">{i + 1}</span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

/** Plain code block: a neutral grey card holding a filename + copy
 * button row above a white, rounded, inset code panel. This is the
 * one visual pattern all code blocks on the docs site should use. */
export function CodeBlock({
  children,
  filename,
  language = "tsx",
  className = "",
}: {
  children: string;
  filename?: string;
  language?: Language;
  className?: string;
}) {
  return (
    <div className={`mb-2 rounded-[14px] bg-cui-code-bg p-3 ${className}`}>
      <div className="mb-2 flex h-7 items-center justify-between px-1">
        <span className="font-mono text-xs text-cui-muted">{filename}</span>
        <CopyButton text={children} />
      </div>
      <div className="overflow-hidden rounded-[10px] border border-cui-border">
        <CodeLines code={children} language={language} />
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-cui bg-cui-surface-hover px-1.5 py-0.5 font-mono text-[0.9em] text-cui-body-dark">
      {children}
    </code>
  );
}

export type CodeTab = { id: string; label: string; code: string; language?: Language };

/** CuiTabs — a standalone tab switcher, separate from the code block
 * below it (not sharing its grey background). Active-tab colors match
 * CuiTab's real tokens (yellow-100 fill, yellow-300 underline). */
export function CuiTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-3 flex border-b border-cui-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`-mb-px flex-none border-b-2 px-4 py-2.5 font-mono text-xs font-semibold transition-colors ${
            active === tab.id
              ? "border-cui-nav-active-border bg-cui-nav-active text-cui-header-body"
              : "border-transparent text-cui-muted hover:text-cui-header-body"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/** A CuiTabs switcher above a plain CodeBlock — for one command shown
 * a few different ways (npm/yarn/pnpm, curl/fetch, etc). The two are
 * visually distinct pieces, not one merged card. */
export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <CuiTabs tabs={tabs} active={activeTab.id} onChange={setActive} />
      <div className="rounded-[14px] bg-cui-code-bg p-3">
        <div className="mb-2 flex h-7 items-center justify-end px-1">
          <CopyButton text={activeTab.code} />
        </div>
        <div className="overflow-hidden rounded-[10px] border border-cui-border">
          <CodeLines code={activeTab.code} language={activeTab.language ?? "bash"} />
        </div>
      </div>
    </div>
  );
}
