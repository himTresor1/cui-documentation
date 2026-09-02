"use client";

import Image from "next/image";
import { btnBase, btnMd, btnFramework, btnPrimary } from "@/lib/cui-button";
import Checkbox from "./Checkbox";

const SCHOOLS = [
  { name: "Törnströmska", org: "551005-3241", students: 256, address: "108 Lönngatan", type: "Kommun" },
  { name: "Chapman", org: "651005-1232", students: 372, address: "22 Tallvägen", type: "Kommun" },
  { name: "Ehrensvärdska", org: "561005-2445", students: 156, address: "12 Blåvägen", type: "Kommun" },
  { name: "Sundsvalska", org: "561005-2445", students: 85, address: "34 Grönvägen", type: "Privat" },
  { name: "Västerås Akademiska", org: "561005-2445", students: 124, address: "56 Rödvägen", type: "Kommun" },
  { name: "Göteborgs Friskola", org: "561005-2445", students: 167, address: "78 Gulvägen", type: "Kommun" },
  { name: "Uppsala Internationella Skola", org: "561005-2445", students: 188, address: "90 Lila vägen", type: "Kommun" },
  { name: "Stockholms Kreativa Gymnasium", org: "561005-2445", students: 143, address: "23 Orangevägen", type: "Kommun" },
];

const PRESCHOOL_IMAGES = [
  "https://images.unsplash.com/photo-1761208663763-c4d30657c910?w=600&h=400&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1774452001291-97f638aba017?w=600&h=400&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1566230546149-f1a4b2b57734?w=600&h=400&fit=crop&q=80&auto=format",
];

function Header() {
  return (
    <header className="flex h-[70px] flex-none items-center justify-between border-b border-cui-border bg-white px-5">
      <div className="flex items-center gap-1.5 text-[13px] text-cui-body">
        <span className="material-symbols-outlined text-lg! text-cui-muted">home</span>
        <span className="material-symbols-outlined text-lg! text-cui-muted">chevron_right</span>
        <span>Breadcrumb</span>
        <span className="material-symbols-outlined text-lg! text-cui-muted">chevron_right</span>
        <span className="font-semibold text-cui-header-body">Active</span>
      </div>
      <div className="flex items-center gap-2.5">
        <button type="button" aria-label="Search" className="flex h-8 w-8 items-center justify-center rounded-cui text-cui-body hover:bg-cui-surface-hover">
          <span className="material-symbols-outlined text-xl!">search</span>
        </button>
        <button type="button" aria-label="Comments" className="flex h-8 w-8 items-center justify-center rounded-cui text-cui-body hover:bg-cui-surface-hover">
          <span className="material-symbols-outlined text-xl!">chat_bubble</span>
        </button>
        <button type="button" aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-cui text-cui-body hover:bg-cui-surface-hover">
          <span className="material-symbols-outlined text-xl!">notifications</span>
          <span className="absolute top-1.5 right-[7px] h-1.5 w-1.5 rounded-full bg-[#e11d48]" />
        </button>
        <Image src="/assets/images/avatar.png" alt="" width={30} height={30} className="rounded-full object-cover" />
      </div>
    </header>
  );
}

function SchoolsTable() {
  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-cui-border bg-white px-5 py-3.5">
        <div className="relative w-[200px]">
          <span className="material-symbols-outlined absolute top-1/2 left-2 -translate-y-1/2 text-base! text-cui-muted">
            search
          </span>
          <input
            type="text"
            placeholder="Sök"
            disabled
            className="h-[34px] w-full rounded-cui border border-cui-border bg-white pr-2.5 pl-8 font-sans text-[13px] text-cui-body"
          />
        </div>
        <button type="button" className={`${btnBase} ${btnMd} ${btnFramework}`}>
          <span className="material-symbols-outlined text-base!">filter_list</span> Filter
        </button>
        <div className="flex-1" />
        <button type="button" className={`${btnBase} ${btnMd} ${btnFramework}`}>
          Exportera
        </button>
        <button type="button" className={`${btnBase} ${btnMd} ${btnPrimary}`}>
          Lägg till skola
        </button>
      </div>

      <div className="flex items-center gap-3.5 border-b border-cui-border bg-white px-5 py-2.5 text-[13px] text-cui-body">
        <span>0 rows selected</span>
        <button type="button" className="text-[13px] font-semibold text-cui-badge-negative-text">
          Delete
        </button>
      </div>

      <div className="flex-1 overflow-auto p-5">
        <table className="w-full border-collapse overflow-hidden rounded-cui border border-cui-border bg-white text-[13.5px]">
          <thead>
            <tr>
              <th className="w-9 border-b border-cui-border bg-cui-surface-hover p-0 py-2.5 pl-3">
                <Checkbox />
              </th>
              {["Units", "Org id", "Students", "Adress", "Type"].map((h) => (
                <th key={h} className="border-b border-cui-border bg-cui-surface-hover px-3 py-2.5 text-left font-semibold whitespace-nowrap text-cui-body">
                  {h}
                </th>
              ))}
              <th className="w-9 border-b border-cui-border bg-cui-surface-hover" />
            </tr>
          </thead>
          <tbody>
            {SCHOOLS.map((row, i) => (
              <tr key={row.name}>
                <td className={`py-2.5 pl-3 ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  <Checkbox />
                </td>
                <td className={`px-3 py-2.5 whitespace-nowrap text-cui-header-body ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  {row.name}
                </td>
                <td className={`px-3 py-2.5 whitespace-nowrap text-cui-header-body ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  {row.org}
                </td>
                <td className={`px-3 py-2.5 whitespace-nowrap text-cui-header-body ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  {row.students}
                </td>
                <td className={`px-3 py-2.5 whitespace-nowrap text-cui-header-body ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  {row.address}
                </td>
                <td className={`px-3 py-2.5 whitespace-nowrap ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  <span
                    className={`inline-block rounded-cui px-2 py-0.5 text-xs font-medium ${
                      row.type === "Privat" ? "bg-[#eef2ff] text-[#4338ca]" : "bg-cui-surface-hover text-cui-body"
                    }`}
                  >
                    {row.type}
                  </span>
                </td>
                <td className={`cursor-pointer text-center text-cui-muted ${i < SCHOOLS.length - 1 ? "border-b border-cui-border" : ""}`}>
                  <span className="material-symbols-outlined text-lg!">more_vert</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PreschoolSearch() {
  return (
    <>
      <section
        className="flex-none border-b border-cui-border bg-cover bg-[center_bottom] px-7 py-9"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('/assets/images/hero-image-documentation.png')",
        }}
      >
        <h1 className="mb-2.5 font-display text-[30px] leading-[1.15] font-normal text-cui-header-body">
          Search preschools in Malmö kommun
        </h1>
        <p className="mb-3.5 max-w-[520px] text-sm leading-[1.6] text-cui-body">
          Explore preschools across Malmö kommun and find the right fit for your family. Filter by distance, opening
          hours, and pedagogical profile.
        </p>
        <div className="flex gap-2">
          <span className="rounded-cui bg-cui-badge-positive-bg px-2.5 py-1 text-xs font-semibold text-cui-badge-positive-text">
            12 results
          </span>
          <span className="rounded-cui bg-cui-badge-positive-bg px-2.5 py-1 text-xs font-semibold text-cui-badge-positive-text">
            Updated today
          </span>
        </div>
      </section>

      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <a
              key={i}
              href="#"
              className="block overflow-hidden rounded-cui border border-cui-border bg-white transition-[border-color,box-shadow] duration-150 hover:border-cui-hero hover:shadow-[0_2px_8px_rgba(78,51,217,0.1)]"
            >
              <div
                className="h-[120px] bg-cover bg-center bg-[#ded6f3]"
                style={{ backgroundImage: `url('${PRESCHOOL_IMAGES[i % PRESCHOOL_IMAGES.length]}')` }}
              />
              <div className="p-3.5">
                <span className="mb-2 block text-sm font-semibold text-cui-header-body">Tornet Förskola</span>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className="inline-block rounded-cui bg-[#eef2ff] px-2 py-0.5 text-xs font-medium text-[#4338ca]">
                    Private
                  </span>
                  <span className="inline-block rounded-cui bg-cui-surface-hover px-2 py-0.5 text-xs font-medium text-cui-body">
                    07:00–17:00
                  </span>
                  <span className="inline-block rounded-cui bg-cui-surface-hover px-2 py-0.5 text-xs font-medium text-cui-body">
                    West
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-cui-hero">
                  <span className="material-symbols-outlined text-base!">add</span> Add to selection
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default function MainBody({ activeCategory }: { activeCategory: string }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-cui-surface-hover">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col">
        {activeCategory === "input" ? <PreschoolSearch /> : <SchoolsTable />}
      </div>
    </main>
  );
}
