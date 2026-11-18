import { useState } from "react";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { UNESCO_QUESTIONS } from "../data/marshallPlanData";
import type { UnescoQuestion } from "../data/marshallPlanData";

export interface GeneratedUnescoDraft {
  question: string;
  pillar: string;
  headline: string;
  executiveAnswer: string;
  marshallPlanMechanisms: {
    moduleName: string;
    concreteAction: string;
    inclusionGuarantee: string;
  }[];
  governanceAndSafeguards: string;
  phasedMilestones: string[];
}

interface UnescoProposalSectionProps {
  onSaveDraftForExport: (draft: {
    question: string;
    pillar: string;
    headline: string;
    executiveAnswer: string;
  }) => void;
}

const PRESET_COMMITTEE_PROMPTS: {
  pillar: UnescoQuestion["pillar"];
  question: string;
}[] = [
  {
    pillar: "Thinking",
    question:
      "How does NdaY'Fanabeazana cultivate critical thinking, local problem-solving, and ethical judgment in the age of AI instead of automating rote testing?",
  },
  {
    pillar: "Empowering",
    question:
      "What safeguards ensure AI empowers teachers, parents, and community mentors as co-creators rather than displacing human pedagogical authority?",
  },
  {
    pillar: "Governing",
    question:
      "How does the National Human Development Council and Open Education Data architecture govern AI ethics, privacy, and cross-ministerial accountability?",
  },
  {
    pillar: "Inclusive Access",
    question:
      "How do solar-powered Fokontany hubs, offline-first caching, SMS/radio channels, and Malagasy/dialect translation reach marginalized communities?",
  },
];

export function UnescoProposalSection({
  onSaveDraftForExport,
}: UnescoProposalSectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<
    "All" | UnescoQuestion["pillar"]
  >("All");
  const [studioPillar, setStudioPillar] =
    useState<UnescoQuestion["pillar"]>("Inclusive Access");
  const [customQuestion, setCustomQuestion] = useState<string>(
    PRESET_COMMITTEE_PROMPTS[3].question
  );
  const [outputLanguage, setOutputLanguage] = useState<
    "English" | "Français" | "Malagasy"
  >("English");
  const [audienceFocus, setAudienceFocus] = useState<string>(
    "UNESCO Digital Learning Week 2027 Selection Committee"
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedDraft, setGeneratedDraft] =
    useState<GeneratedUnescoDraft | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleQuestions = UNESCO_QUESTIONS.filter((q) =>
    selectedPillar === "All" ? true : q.pillar === selectedPillar
  );

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  const handleGenerateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/ai/unesco-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pillar: studioPillar,
          question: customQuestion.trim(),
          responseLanguage: outputLanguage,
          audienceFocus,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to synthesize UNESCO response.");
      }

      const draft: GeneratedUnescoDraft = {
        question: customQuestion.trim(),
        pillar: studioPillar,
        headline: data.headline,
        executiveAnswer: data.executiveAnswer,
        marshallPlanMechanisms: data.marshallPlanMechanisms || [],
        governanceAndSafeguards: data.governanceAndSafeguards || "",
        phasedMilestones: data.phasedMilestones || [],
      };
      setGeneratedDraft(draft);
      onSaveDraftForExport({
        question: draft.question,
        pillar: draft.pillar,
        headline: draft.headline,
        executiveAnswer: draft.executiveAnswer,
      });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to synthesize response."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="border-b border-slate-200 pb-8">
        <p className="text-xs font-medium text-slate-500">
          UNESCO Digital Learning Week 2027 · Call for Proposals Response · Individual Enterprise NdaY&apos;
        </p>
        <h1 className="font-editorial mt-3 max-w-4xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
          Education in the Age of AI: Thinking, Empowering, Governing, and Facilitating Inclusive Access
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          Direct institutional answers demonstrating how the 20-year NdaY&apos;Fanabeazana Human
          Development DPI operationalizes every pillar of the UNESCO 2027 theme for marginalized
          and low-connectivity communities.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(
            ["All", "Thinking", "Empowering", "Governing", "Inclusive Access"] as const
          ).map((pillar) => (
            <button
              key={pillar}
              type="button"
              onClick={() => setSelectedPillar(pillar)}
              className={`cursor-pointer rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedPillar === pillar
                  ? "border-blue-900 bg-blue-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {pillar === "All" ? "All 4 UNESCO Pillars" : pillar}
            </button>
          ))}
        </div>
      </section>

      {/* Core UNESCO Call Answers Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visibleQuestions.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6"
          >
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 text-xs text-slate-500">
                <span className="font-semibold text-blue-900">
                  Pillar · {item.pillar}
                </span>
                <span className="font-mono tabular-nums">{item.phaseFocus}</span>
              </div>

              <h2 className="font-editorial mt-4 text-xl font-semibold leading-snug text-slate-900">
                {item.question}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {item.marshallPlanDirectAnswer}
              </p>

              <div className="mt-5">
                <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Implemented HD-DPI Mechanisms
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
                  {item.mechanisms.map((m) => (
                    <li key={m}>· {m}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3.5">
                <h4 className="text-xs font-semibold text-slate-700">
                  Verification &amp; Evidence Indicators
                </h4>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
                  {item.evidenceIndicators.map((ind) => (
                    <li key={ind}>— {ind}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setStudioPillar(item.pillar);
                  setCustomQuestion(item.question);
                }}
                className="cursor-pointer text-xs font-semibold text-blue-900 hover:underline whitespace-nowrap shrink-0"
              >
                Refine in Proposal Studio →
              </button>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    item.id,
                    `${item.pillar}: ${item.question}\n\n${item.marshallPlanDirectAnswer}`
                  )
                }
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Answer</span>
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Interactive UNESCO Proposal Answer Studio (Gemini Server-Side) */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-xs font-medium text-slate-500">
            Interactive Submission Workspace · Grounded in NdaY&apos;Fanabeazana Marshall Plan
          </p>
          <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
            UNESCO DLW 2027 Proposal Answer Studio
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm text-slate-600">
            Draft tailored responses for specific UNESCO Call for Proposals questions in English,
            French, or Malagasy—citing exact modules, governance safeguards, and inclusion
            channels.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <form onSubmit={handleGenerateDraft} className="space-y-4 lg:col-span-5">
            <div>
              <label
                htmlFor="unesco-pillar"
                className="block text-xs font-semibold text-slate-700"
              >
                UNESCO 2027 Sub-Theme Pillar
              </label>
              <select
                id="unesco-pillar"
                value={studioPillar}
                onChange={(e) =>
                  setStudioPillar(e.target.value as UnescoQuestion["pillar"])
                }
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
              >
                <option value="Thinking">01. Thinking (Pedagogy &amp; Critical Inquiry)</option>
                <option value="Empowering">02. Empowering (Teachers, Parents &amp; Hubs)</option>
                <option value="Governing">03. Governing (HD-DPI Council &amp; Open Data)</option>
                <option value="Inclusive Access">
                  04. Inclusive Access (Marginalized &amp; Offline Communities)
                </option>
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700">
                Quick Committee Prompts
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {PRESET_COMMITTEE_PROMPTS.map((preset) => (
                  <button
                    key={preset.pillar}
                    type="button"
                    onClick={() => {
                      setStudioPillar(preset.pillar);
                      setCustomQuestion(preset.question);
                    }}
                    className="cursor-pointer rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    {preset.pillar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="unesco-question"
                className="block text-xs font-semibold text-slate-700"
              >
                Call for Proposals Question or Evaluation Prompt
              </label>
              <textarea
                id="unesco-question"
                rows={4}
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Enter a UNESCO DLW 2027 question..."
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="unesco-lang"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Submission Language
                </label>
                <select
                  id="unesco-lang"
                  value={outputLanguage}
                  onChange={(e) =>
                    setOutputLanguage(
                      e.target.value as "English" | "Français" | "Malagasy"
                    )
                  }
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Français">Français</option>
                  <option value="Malagasy">Malagasy</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="unesco-focus"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Reviewer Focus
                </label>
                <select
                  id="unesco-focus"
                  value={audienceFocus}
                  onChange={(e) => setAudienceFocus(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                >
                  <option value="UNESCO Digital Learning Week 2027 Selection Committee">
                    UNESCO Selection Committee
                  </option>
                  <option value="National Human Development Council & Ministries">
                    National Council &amp; Ministries
                  </option>
                  <option value="Global South DPI & Donor Partners">
                    DPI &amp; Development Partners
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !customQuestion.trim()}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Synthesizing Proposal Answer...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Generate Grounded Proposal Answer
                </>
              )}
            </button>

            {errorMsg && (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                {errorMsg}
              </div>
            )}
          </form>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 lg:col-span-7">
            {!generatedDraft && !loading && (
              <div className="flex h-full min-h-[280px] flex-col justify-center text-center">
                <p className="font-editorial text-lg font-medium text-slate-800">
                  Submission Response Output
                </p>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-600">
                  Select a UNESCO pillar or enter a custom Call for Proposals question on the left
                  to synthesize a structured answer grounded in NdaY&apos;Fanabeazana&apos;s 16
                  modules and 20-year roadmap.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-4">
                <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-28 w-full animate-pulse rounded bg-slate-200" />
              </div>
            )}

            {generatedDraft && !loading && (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-medium text-blue-900">
                      {generatedDraft.pillar} · Ready for Export Brief
                    </p>
                    <h3 className="font-editorial mt-1 text-xl font-semibold text-slate-900">
                      {generatedDraft.headline}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        "studio-draft",
                        `${generatedDraft.headline}\n\n${generatedDraft.executiveAnswer}`
                      )
                    }
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    {copiedId === "studio-draft" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Draft
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-slate-700">
                  {generatedDraft.executiveAnswer}
                </p>

                {generatedDraft.marshallPlanMechanisms.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      Concrete HD-DPI Mechanisms
                    </h4>
                    <div className="mt-2 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
                      {generatedDraft.marshallPlanMechanisms.map((mech, idx) => (
                        <div key={idx} className="p-3.5">
                          <p className="text-xs font-semibold text-slate-900">{mech.moduleName}</p>
                          <p className="mt-1 text-xs text-slate-600">{mech.concreteAction}</p>
                          <p className="mt-1 text-xs font-medium text-emerald-800">
                            Inclusion Guarantee: {mech.inclusionGuarantee}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedDraft.governanceAndSafeguards && (
                  <div className="rounded-md border border-slate-200 bg-white p-3.5">
                    <h4 className="text-xs font-semibold text-slate-800">
                      Governance &amp; Ethical Safeguards
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {generatedDraft.governanceAndSafeguards}
                    </p>
                  </div>
                )}

                {generatedDraft.phasedMilestones.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      Phased Rollout Milestones
                    </h4>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700">
                      {generatedDraft.phasedMilestones.map((m, i) => (
                        <li key={i}>
                          <span className="font-mono text-slate-400">0{i + 1}.</span> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
