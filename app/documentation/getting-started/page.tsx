import type { Metadata } from "next";
import DocsSidebarShell from "@/components/documentation/DocsSidebarShell";
import DocPageBody, { DocHeroRail } from "@/components/documentation/DocPageBody";
import { CodeBlock, CodeTabs, InlineCode } from "@/components/DocsCode";

export const metadata: Metadata = {
  title: "Getting Started — Common UI",
};

const INSTALL_TABS = [
  { id: "npm", label: "npm", code: "npm install @ist-group/commonui-components-react" },
  { id: "yarn", label: "yarn", code: "yarn add @ist-group/commonui-components-react" },
  { id: "pnpm", label: "pnpm", code: "pnpm add @ist-group/commonui-components-react" },
];

const NEXT_STEPS = [
  {
    icon: "widgets",
    title: "Browse Components",
    text: "Explore all available components with live examples and documentation.",
  },
  {
    icon: "palette",
    title: "Design Foundations",
    text: "Learn about typography, colors, icons, and design tokens.",
  },
  {
    icon: "accessible",
    title: "Accessibility",
    text: "Understand built-in accessibility features and best practices.",
  },
];

const MAIN_SETUP = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ist-group/commonui-components-react/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`;

const APP_SETUP = `import { CuiButton, CuiCard } from "@ist-group/commonui-components-react";

export default function App() {
  return (
    <CuiCard title="Welcome" imageAlt="Welcome">
      Start building with Common UI
      <CuiButton variant="hero" onClick={() => console.log("clicked!")}>
        Get Started
      </CuiButton>
    </CuiCard>
  );
}`;

const APP_SHELL = `import { CuiApp, CuiHeader, CuiMainMenu } from "@ist-group/commonui-components-react";
import { template } from "@beqa/react-slots";

export default function App() {
  return (
    <CuiApp>
      <template.menu>
        <CuiMainMenu /* … */ />
      </template.menu>
      <template.header>
        <CuiHeader /* … */ />
      </template.header>

      {/* Your routed page content */}
    </CuiApp>
  );
}`;

export default function GettingStartedPage() {
  return (
    <DocsSidebarShell>
        <section
          className="border-b border-cui-border bg-cover bg-[center_bottom]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('/assets/images/hero-image-documentation.png')",
          }}
        >
          <DocHeroRail>
            <div className="mx-auto max-w-[760px] px-10 pt-18 pb-14">
              <div className="mb-4.5 text-[13px] text-cui-muted">
                Home <span className="mx-1.5">/</span> Getting Started
              </div>
              <h1 className="mb-4 font-display text-[clamp(36px,4.5vw,52px)] leading-[1.1] font-normal text-cui-header-body">
                Getting Started
              </h1>
              <p className="mb-5 max-w-[560px] text-[17px] leading-[1.6] text-cui-header-body">
                Everything you need to install Common UI and ship your first
                component in minutes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-cui bg-cui-badge-positive-bg px-3 py-1.5 text-xs font-semibold text-cui-badge-positive-text">
                  React 18 &amp; 19 supported
                </span>
                <span className="rounded-cui bg-cui-badge-positive-bg px-3 py-1.5 text-xs font-semibold text-cui-badge-positive-text">
                  Tree-shakeable imports
                </span>
                <span className="rounded-cui bg-cui-badge-negative-bg px-3 py-1.5 text-xs font-semibold text-cui-badge-negative-text">
                  Breaking change in v1.3.0: CuiProgress removed
                </span>
              </div>
            </div>
          </DocHeroRail>
        </section>

        <DocPageBody>
        <div className="mx-auto max-w-[760px] px-10 pt-12 pb-24">
          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Quick Start</h2>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              Common UI for React is a comprehensive React 18/19 + TypeScript
              component library built with accessibility and developer
              experience in mind. Components are styled with Tailwind CSS 4
              and design tokens. Get started in minutes with npm, yarn, or
              pnpm.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Installation</h2>
            <CodeTabs tabs={INSTALL_TABS} />
          </section>

          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Basic Setup</h2>

            <h3 className="mt-7 mb-2 text-base font-semibold text-cui-body-dark">
              Import the stylesheet
            </h3>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              Import the component styles once, at your application entry point:
            </p>
            <CodeBlock filename="main.tsx">{MAIN_SETUP}</CodeBlock>

            <h3 className="mt-7 mb-2 text-base font-semibold text-cui-body-dark">
              Use components directly
            </h3>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              Unlike the Vue package, there is no global plugin to register —
              import each component where you use it. Imports are
              tree-shakeable, so you only ship what you render:
            </p>
            <CodeBlock filename="App.tsx">{APP_SETUP}</CodeBlock>
          </section>

          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">App Shell</h2>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              <InlineCode>CuiApp</InlineCode> provides the application shell
              (menu / header / content slots) and mounts the toast and modal
              hosts, so <InlineCode>useToast()</InlineCode> works anywhere
              below it:
            </p>
            <CodeBlock filename="App.tsx">{APP_SHELL}</CodeBlock>
          </section>

          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Next Steps</h2>
            <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
              {NEXT_STEPS.map((step) => (
                <a
                  key={step.title}
                  href="#"
                  className="flex gap-3 rounded-cui border border-cui-border p-4 text-inherit transition-[border-color,box-shadow] duration-150 hover:border-cui-hero hover:shadow-[0_2px_8px_rgba(78,51,217,0.08)]"
                >
                  <span className="material-symbols-outlined text-xl! leading-none" aria-hidden="true">
                    {step.icon}
                  </span>
                  <div>
                    <strong className="mb-1 block text-sm text-cui-body-dark">{step.title}</strong>
                    <p className="text-[13px] leading-[1.5] text-cui-body">{step.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Troubleshooting</h2>
            <div>
              <details open className="mb-2 rounded-cui border border-cui-border px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-cui-body-dark">
                  Components render unstyled?
                </summary>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-cui-body">
                  Make sure you&rsquo;ve imported the stylesheet once at your
                  entry point:{" "}
                  <InlineCode>
                    import &quot;@ist-group/commonui-components-react/style.css&quot;;
                  </InlineCode>
                </p>
              </details>
              <details className="mb-2 rounded-cui border border-cui-border px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-cui-body-dark">
                  useToast throws or toasts don&rsquo;t appear?
                </summary>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-cui-body">
                  <InlineCode>useToast()</InlineCode> must be called from a
                  component rendered inside <InlineCode>CuiApp</InlineCode>,
                  which mounts the toast host.
                </p>
              </details>
            </div>
          </section>
        </div>
        </DocPageBody>
    </DocsSidebarShell>
  );
}
