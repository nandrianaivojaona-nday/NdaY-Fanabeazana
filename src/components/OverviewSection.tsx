import { useState } from "react";
import { ArrowRight, CheckCircle2, Globe2, WifiOff } from "lucide-react";
import {
  COUNCIL_STAKEHOLDERS,
  GENERATED_IMAGES,
  PLATFORM_MODULES,
  ROADMAP_PHASES,
  STRATEGIC_OBJECTIVES,
} from "../data/marshallPlanData";
import type { ActiveSection } from "./Header";
import { ResilientImage } from "./ResilientImage";

interface OverviewSectionProps {
  onNavigate: (section: ActiveSection) => void;
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>(
    STRATEGIC_OBJECTIVES[0].id
  );
  const [moduleFilter, setModuleFilter] = useState<"all" | "offline" | "cloud">("all");
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);

  const activeObjective =
    STRATEGIC_OBJECTIVES.find((o) => o.id === selectedObjectiveId) ??
    STRATEGIC_OBJECTIVES[0];

  const filteredModules = PLATFORM_MODULES.filter((mod) => {
    if (moduleFilter === "offline") return mod.offlineCapable;
    if (moduleFilter === "cloud") return !mod.offlineCapable;
    return true;
  });

  const activePhase = ROADMAP_PHASES[selectedPhaseIndex] ?? ROADMAP_PHASES[0];

  return (
    <div className="space-y-14">
      {/* Editorial Hero Split */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Individual Enterprise NdaY&apos; · 20-Year Human Development Marshall Plan · UNESCO DLW 2027
                </p>
                <h1 className="font-editorial mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] [text-wrap:balance]">
                  It takes a nation to educate a child, and an educated child to transform a nation.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                  NdaY&apos;Fanabeazana is a federated Human Development Digital Public Infrastructure
                  (HD-DPI) connecting families, Fokontany learning hubs, empowered teachers, and
                  transparent institutions from birth through lifelong learning.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate("unesco")}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  Answer UNESCO 2027 Call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("family-hub")}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  Open Parent &amp; Hub Apps
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ResilientImage
                src={GENERATED_IMAGES.heroHub}
                alt="Solar-powered Fokontany Community Learning Hub in highland Madagascar with students, parents, and teachers"
                caption="Fig. 1 — Solar-powered Fokontany Community Learning Hub integrating offline tablets, libraries, and intergenerational mentorship."
                aspectClass="h-full min-h-[280px] lg:min-h-[380px]"
              />
            </div>
          </div>

          {/* Full-Width 4-Column Structural Strip */}
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-medium text-slate-500">Strategic Framework</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-slate-900 tabular-nums">
                06 Objectives
              </dd>
              <p className="mt-1 text-xs text-slate-600">Birth-to-lifelong learning continuity</p>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">Platform Architecture</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-slate-900 tabular-nums">
                16 Modules
              </dd>
              <p className="mt-1 text-xs text-slate-600">Interoperable open HD-DPI components</p>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">National Governance</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-slate-900 tabular-nums">
                13 Sectors
              </dd>
              <p className="mt-1 text-xs text-slate-600">National Human Development Council</p>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">Marshall Plan Horizon</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-slate-900 tabular-nums">
                20 Years
              </dd>
              <p className="mt-1 text-xs text-slate-600">4 phased national rollout cycles</p>
            </div>
          </dl>
        </div>
      </section>

      {/* Six Strategic Objectives Interactive Explorer */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Marshall Plan Blueprint · Core Architecture
            </p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Six Strategic Objectives
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Select an objective to inspect its institutional premise, delivery mechanisms, and direct
            UNESCO Digital Learning Week 2027 alignment.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white lg:col-span-5">
            {STRATEGIC_OBJECTIVES.map((obj) => {
              const selected = obj.id === activeObjective.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setSelectedObjectiveId(obj.id)}
                  className={`flex w-full cursor-pointer items-start gap-4 px-5 py-4 text-left transition-colors ${
                    selected ? "bg-slate-100" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`font-mono text-sm font-medium tabular-nums ${
                      selected ? "text-blue-900" : "text-slate-400"
                    }`}
                  >
                    {obj.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">{obj.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {obj.subtitle} · UNESCO: {obj.unescoPillar}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <span className="font-mono text-xs font-medium text-slate-500 tabular-nums">
                  Objective {activeObjective.number} · UNESCO Pillar: {activeObjective.unescoPillar}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeObjective.id === "obj-1" || activeObjective.id === "obj-2" || activeObjective.id === "obj-6") {
                      onNavigate("family-hub");
                    } else if (activeObjective.id === "obj-3" || activeObjective.id === "obj-4") {
                      onNavigate("teacher-studio");
                    } else {
                      onNavigate("observatory");
                    }
                  }}
                  className="cursor-pointer text-xs font-semibold text-blue-900 hover:underline whitespace-nowrap shrink-0"
                >
                  Open Live App Module →
                </button>
              </div>

              <h3 className="font-editorial mt-5 text-2xl font-semibold text-slate-900">
                {activeObjective.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-700">{activeObjective.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{activeObjective.premise}</p>

              <h4 className="mt-6 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Implemented Marshall Plan Mechanisms
              </h4>
              <ul className="mt-3 space-y-2.5">
                {activeObjective.pillars.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
              Vision: Every Malagasy citizen is empowered from birth to lifelong learning through a
              trusted ecosystem connecting families, communities, schools, institutions, and digital
              innovation.
            </div>
          </div>
        </div>
      </section>

      {/* 16 Interoperable HD-DPI Modules */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Interoperable Platform Architecture · Open Standards
            </p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
              16 HD-DPI Platform Modules
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter platform modules by connectivity mode"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start sm:self-auto"
          >
            {(
              [
                { id: "all", label: "All 16 Modules" },
                { id: "offline", label: "Offline-First Sync" },
                { id: "cloud", label: "Cloud & AI Core" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setModuleFilter(tab.id)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  moduleFilter === tab.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredModules.map((mod) => (
            <article
              key={mod.id}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-mono tabular-nums">{mod.objectiveRef}</span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    {mod.offlineCapable ? (
                      <>
                        <WifiOff className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Offline-first</span>
                      </>
                    ) : (
                      <>
                        <Globe2 className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
                        <span>Central Sync</span>
                      </>
                    )}
                  </span>
                </div>
                <h3 className="mt-2.5 text-base font-semibold text-slate-900">{mod.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{mod.description}</p>
              </div>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                Primary Users: {mod.primaryUsers}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Cross-Cutting Pillars & 20-Year Implementation Roadmap */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cross-Cutting Pillars */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-5">
            <p className="text-xs font-medium text-slate-500">Cross-Cutting Marshall Plans</p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
              Equity, Language &amp; Values
            </h2>
            <dl className="mt-6 divide-y divide-slate-200">
              <div className="py-3.5 first:pt-0">
                <dt className="text-sm font-semibold text-slate-900">Digital Inclusion</dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                  Affordable connectivity, solar-powered Fokontany learning centers, offline-first
                  applications, community Wi-Fi, low-cost devices, and accessibility for persons
                  with disabilities.
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-sm font-semibold text-slate-900">Language Preservation</dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                  Native instruction in Malagasy, French, English, and local regional dialects, with
                  AI translation preserving mother-tongue comprehension.
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-sm font-semibold text-slate-900">Values Education</dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                  Respect, Integrity, Service, Innovation, Environmental Responsibility, Citizenship,
                  Entrepreneurship, and Leadership woven across every module.
                </dd>
              </div>
              <div className="py-3.5 last:pb-0">
                <dt className="text-sm font-semibold text-slate-900">
                  National Education Research Network
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                  Universities, teacher colleges, private sector, civil society, students, and
                  policymakers collaborating on continuous empirical evaluation.
                </dd>
              </div>
            </dl>
          </div>

          {/* 20-Year Implementation Roadmap */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-7">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Phased National Transformation · 20-Year Horizon
                </p>
                <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                  Implementation Roadmap
                </h2>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1">
                {ROADMAP_PHASES.map((p, idx) => (
                  <button
                    key={p.phase}
                    type="button"
                    onClick={() => setSelectedPhaseIndex(idx)}
                    className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedPhaseIndex === idx
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {p.phase}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-editorial text-xl font-semibold text-slate-900">
                  {activePhase.phase}: {activePhase.headline}
                </h3>
                <span className="font-mono text-xs font-medium text-blue-900 tabular-nums whitespace-nowrap shrink-0">
                  {activePhase.horizon}
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {activePhase.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-700">
                  UNESCO DLW 2027 Strategic Significance
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {activePhase.unescoLink}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
              Governed by the {COUNCIL_STAKEHOLDERS.length}-seat National Human Development Council
              to prevent single-ministry silos.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
