import Image from "next/image";
import Link from "next/link";
import RotatingWord from "@/components/RotatingWord";
import VueIcon from "@/components/icons/VueIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import { btnBase, btnLg, btnFramework } from "@/lib/cui-button";

const FADE_TOP =
  "bg-[radial-gradient(ellipse_58%_100%_at_0%_0%,var(--color-cui-surface)_0%,var(--color-cui-surface)_29%,rgba(255,255,255,0)_69%),radial-gradient(ellipse_58%_100%_at_100%_0%,var(--color-cui-surface)_0%,var(--color-cui-surface)_29%,rgba(255,255,255,0)_69%),linear-gradient(to_bottom,var(--color-cui-surface)_0%,var(--color-cui-surface)_9%,rgba(255,255,255,0)_26%)]";

const FADE_BOTTOM =
  "bg-[radial-gradient(ellipse_58%_100%_at_0%_100%,var(--color-cui-surface)_0%,var(--color-cui-surface)_29%,rgba(255,255,255,0)_69%),radial-gradient(ellipse_58%_100%_at_100%_100%,var(--color-cui-surface)_0%,var(--color-cui-surface)_29%,rgba(255,255,255,0)_69%),linear-gradient(to_top,var(--color-cui-surface)_0%,var(--color-cui-surface)_9%,rgba(255,255,255,0)_26%)]";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-2 max-[960px]:grid-cols-1">
      {/* LEFT: hero content */}
      <section className="flex min-h-screen flex-col justify-between px-14 py-7 max-[960px]:px-6 max-[960px]:pt-6 max-[960px]:pb-8">
        <header className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3.5 text-[22px] font-semibold tracking-[-0.01em]">
            <Image
              src="/assets/images/ist-logo.svg"
              alt="IST"
              width={42}
              height={25}
            />
            Common UI
          </Link>
        </header>

        <div className="flex max-w-[560px] flex-col">
          <a
            href="#"
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-cui border border-cui-border py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium text-cui-body hover:border-[#d3d5e0]"
          >
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#17b26a]" />
            Now in trial — Common UI v0.1
            <span className="text-cui-muted">&rarr;</span>
          </a>

          <h1 className="mb-5 font-display text-[clamp(32px,4.4vw,68px)] leading-[1.05] font-normal tracking-[-0.01em] text-cui-header-body">
            One design system.
            <br />
            Every <RotatingWord />
          </h1>

          <p className="mb-6 max-w-[480px] text-lg leading-[1.6] text-cui-header-body">
            Common UI is a component library and design kit for teams who&rsquo;d
            rather ship product than rebuild buttons. Kickstart your next
            project with everything you need to design and develop — fast.
          </p>

          <div className="mb-6 flex gap-3 max-[560px]:flex-col max-[560px]:items-stretch">
            <Link href="/documentation/getting-started" className={`${btnBase} ${btnLg} ${btnFramework}`}>
              <VueIcon className="h-[18px] w-[18px] flex-none" />
              Common UI Vue
            </Link>
            <Link href="/documentation/getting-started" className={`${btnBase} ${btnLg} ${btnFramework}`}>
              <ReactIcon className="h-[18px] w-[18px] flex-none" />
              Common UI React
            </Link>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex">
              {[
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&q=80&auto=format",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80&auto=format",
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=80&auto=format",
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&q=80&auto=format",
              ].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="-ml-2 h-8 w-8 rounded-full border-2 border-white object-cover first:ml-0"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
            <div className="text-[13px] text-cui-body">
              <div className="mb-0.5 text-xs leading-none tracking-[1px] text-[#f79009]">
                ★★★★★
              </div>
              <span>Trusted by 2,400+ product teams</span>
            </div>
          </div>
        </div>

        <div className="flex max-w-[560px] flex-col">
          <span className="block font-sans text-[13px] font-semibold tracking-[0.02em] text-cui-hero uppercase">
            Two ways to build
          </span>
          <div className="mt-1.5 grid max-w-[460px] grid-cols-2 gap-3">
            <a
              href="#"
              className="flex flex-col overflow-hidden rounded-cui border border-cui-border bg-white transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-cui-hero hover:shadow-[0_4px_14px_rgba(78,51,217,0.12)]"
            >
              <div className="h-[108px] overflow-hidden bg-cui-surface-hover">
                <img
                  src="/assets/images/components-new.png"
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-0.5 px-3 pt-2 pb-2.5">
                <span className="text-[13px] font-semibold text-cui-header-body">
                  Components
                </span>
                <span className="text-[11.5px] leading-[1.4] text-cui-muted">
                  40+ open-source building blocks
                </span>
              </div>
            </a>
            <a
              href="#"
              className="flex flex-col overflow-hidden rounded-cui border border-cui-border bg-white transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-cui-hero hover:shadow-[0_4px_14px_rgba(78,51,217,0.12)]"
            >
              <div className="h-[108px] overflow-hidden bg-cui-surface-hover">
                <img
                  src="/assets/images/blocks-new.png"
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-0.5 px-3 pt-2 pb-2.5">
                <span className="text-[13px] font-semibold text-cui-header-body">
                  Blocks
                </span>
                <span className="text-[11.5px] leading-[1.4] text-cui-muted">
                  Ready-made sections, composed and styled
                </span>
              </div>
            </a>
          </div>

          <footer className="flex justify-between pt-4 text-[13px] text-cui-muted">
            <span>&copy; 2026 Common UI</span>
            <a href="#">commonui.ist.com</a>
          </footer>
        </div>
      </section>

      {/* RIGHT: visual */}
      <section className="relative min-h-screen overflow-hidden bg-cui-surface max-[960px]:min-h-[60vh] max-[960px]:border-t max-[960px]:border-cui-border">
        <img
          src="/assets/images/hero.png"
          alt="Common UI product preview"
          className="absolute inset-0 z-[1] block h-full w-full object-cover"
        />
        <div className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-[45%] ${FADE_TOP}`} />
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] ${FADE_BOTTOM}`} />
      </section>
    </div>
  );
}
