import type { Metadata } from "next";
import DocsSidebarShell from "@/components/documentation/DocsSidebarShell";
import DocPageBody, { DocHeroRail } from "@/components/documentation/DocPageBody";
import ReleaseTimeline from "@/components/documentation/ReleaseTimeline";
import RoadmapBoard from "@/components/documentation/RoadmapBoard";

export const metadata: Metadata = {
  title: "Introduction — Common UI",
};

export default function IntroductionPage() {
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
                Home <span className="mx-1.5">/</span> Introduction
              </div>
              <h1 className="mb-4 font-display text-[clamp(36px,4.5vw,52px)] leading-[1.1] font-normal text-cui-header-body">
                Welcome to Common UI
              </h1>
              <p className="mb-5 max-w-[560px] text-[17px] leading-[1.6] text-cui-header-body">
                A shared design system for every product team at IST — one
                source of truth for how our interfaces look, behave, and get
                built.
              </p>
            </div>
          </DocHeroRail>
        </section>

        <DocPageBody>
        <div className="mx-auto max-w-[760px] px-10 pt-12 pb-24">
          <section className="mb-14">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Why Common UI exists</h2>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              All product teams implementing CUI should find that the design
              system answers 80% of all UI questions before they need to
              design something custom. The remaining 20% is where CUI should
              get out of the way, not slow teams down.
            </p>
            <p className="mb-3 text-[15px] leading-[1.7] text-cui-body">
              The goal is for Common UI to be presentable and accessible to
              everyone at IST — not just the people who work directly on it.
              A BRSE or BRNO should be able to put together prototype
              material based on CUI without needing a designer in the room.
            </p>

            <div className="mt-6 rounded-cui border border-cui-border bg-white p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-cui-body-dark">Design system coverage</span>
                <span className="font-semibold text-cui-hero">80% Complete</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-cui-surface-hover">
                <div className="h-full w-4/5 rounded-full bg-cui-hero" />
              </div>
              <p className="mt-2.5 text-xs leading-[1.6] text-cui-muted">
                A rough measure of how much of a typical internal product
                screen can be built with existing components, without custom
                one-off UI.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-3.5 text-[22px] font-bold text-cui-hero">Two ways to build</h2>
            <p className="mb-4 text-[15px] leading-[1.7] text-cui-body">
              Start from individual pieces, or from whole sections already
              composed and styled.
            </p>
            <div className="grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1">
              <div className="flex flex-col overflow-hidden rounded-cui border border-cui-border bg-white transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-cui-hero hover:shadow-[0_4px_14px_rgba(78,51,217,0.12)]">
                <div className="h-[140px] overflow-hidden bg-cui-surface-hover">
                  <img
                    src="/assets/images/components-new.png"
                    alt=""
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-1 px-4 pt-3 pb-4">
                  <span className="text-sm font-semibold text-cui-header-body">Components</span>
                  <span className="text-[13px] leading-[1.5] text-cui-muted">
                    40+ open-source building blocks
                  </span>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-cui border border-cui-border bg-white transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-cui-hero hover:shadow-[0_4px_14px_rgba(78,51,217,0.12)]">
                <div className="h-[140px] overflow-hidden bg-cui-surface-hover">
                  <img
                    src="/assets/images/blocks-new.png"
                    alt=""
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-1 px-4 pt-3 pb-4">
                  <span className="text-sm font-semibold text-cui-header-body">Blocks</span>
                  <span className="text-[13px] leading-[1.5] text-cui-muted">
                    Ready-made sections, composed and styled
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-1 text-[22px] font-bold text-cui-hero">Version Releases</h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-cui-body">
              Placeholder changelog — expand a release for details.
            </p>
            <ReleaseTimeline />
          </section>

          <section>
            <h2 className="mb-1 text-[22px] font-bold text-cui-hero">Roadmap</h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-cui-body">
              CUI is still evolving, so the roadmap tracks status rather than
              fixed dates. Placeholder items — for review.
            </p>
            <RoadmapBoard />
          </section>
        </div>
        </DocPageBody>
    </DocsSidebarShell>
  );
}
