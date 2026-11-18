import { Check, Copy, Download, X } from "lucide-react";
import { useState } from "react";
import {
  COUNCIL_STAKEHOLDERS,
  PLATFORM_MODULES,
  ROADMAP_PHASES,
  STRATEGIC_OBJECTIVES,
  UNESCO_QUESTIONS,
} from "../data/marshallPlanData";

interface ExportBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  customUnescoDraft?: {
    question: string;
    pillar: string;
    headline: string;
    executiveAnswer: string;
  } | null;
}

function buildMarkdownBrief(
  customDraft?: ExportBriefModalProps["customUnescoDraft"]
): string {
  const lines: string[] = [
    "# NdaY'Fanabeazana — Human Development Digital Public Infrastructure (HD-DPI)",
    "**Author:** Individual Enterprise NdaY'",
    "**Submission Context:** UNESCO Digital Learning Week 2027 Call for Proposals",
    "**Theme:** *Education in age of AI: Thinking, Empowering, Governing and facilitating inclusive access to technology-driven learning platforms for marginalized communities*",
    "",
    "> \"It takes a nation to educate a child, and an educated child to transform a nation.\"",
    "",
    "---",
    "",
    "## 1. UNESCO Digital Learning Week 2027 Alignment Answers",
    "",
  ];

  for (const item of UNESCO_QUESTIONS) {
    lines.push(`### ${item.pillar}: ${item.question}`);
    lines.push(item.marshallPlanDirectAnswer);
    lines.push("");
    lines.push("**Key HD-DPI Mechanisms:**");
    for (const mech of item.mechanisms) {
      lines.push(`- ${mech}`);
    }
    lines.push("");
  }

  if (customDraft) {
    lines.push(`### Custom Generated Proposal Response (${customDraft.pillar})`);
    lines.push(`**Prompt:** ${customDraft.question}`);
    lines.push(`**${customDraft.headline}**`);
    lines.push(customDraft.executiveAnswer);
    lines.push("");
  }

  lines.push("---", "", "## 2. Six Strategic Objectives (20-Year Marshall Plan)", "");
  for (const obj of STRATEGIC_OBJECTIVES) {
    lines.push(`### ${obj.number}. ${obj.title} (${obj.subtitle})`);
    lines.push(obj.premise);
    for (const pillar of obj.pillars) {
      lines.push(`- ${pillar}`);
    }
    lines.push("");
  }

  lines.push("---", "", "## 3. 16 Interoperable HD-DPI Platform Modules", "");
  for (const mod of PLATFORM_MODULES) {
    lines.push(
      `- **${mod.name}** (${mod.objectiveRef} · ${mod.offlineCapable ? "Offline-First Capable" : "Cloud/Observatory"}): ${mod.description}`
    );
  }

  lines.push("", "---", "", "## 4. National Human Development Council (13 Stakeholders)", "");
  for (const seat of COUNCIL_STAKEHOLDERS) {
    lines.push(`- **${seat.sector}:** ${seat.role}`);
  }

  lines.push("", "---", "", "## 5. 20-Year Phased Implementation Roadmap", "");
  for (const phase of ROADMAP_PHASES) {
    lines.push(`### ${phase.phase} (${phase.horizon}) — ${phase.headline}`);
    for (const del of phase.deliverables) {
      lines.push(`- ${del}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function ExportBriefModal({
  isOpen,
  onClose,
  customUnescoDraft,
}: ExportBriefModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdown = buildMarkdownBrief(customUnescoDraft);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NdaY-Fanabeazana-UNESCO-DLW-2027-Brief.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const payload = {
      project: "NdaY'Fanabeazana HD-DPI",
      author: "Individual Enterprise NdaY'",
      unescoCall: "Digital Learning Week 2027",
      strategicObjectives: STRATEGIC_OBJECTIVES,
      unescoAnswers: UNESCO_QUESTIONS,
      platformModules: PLATFORM_MODULES,
      roadmap: ROADMAP_PHASES,
      governanceCouncil: COUNCIL_STAKEHOLDERS,
      customDraft: customUnescoDraft ?? null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NdaY-Fanabeazana-Marshall-Plan.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2
              id="export-modal-title"
              className="font-editorial text-xl font-semibold text-slate-900"
            >
              Export UNESCO DLW 2027 &amp; Marshall Plan Brief
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Individual Enterprise NdaY&apos; · NdaY&apos;Fanabeazana HD-DPI Submission Package
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close export modal"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <p className="mb-3 text-sm text-slate-600">
            Download or copy the complete structured brief answering the UNESCO Digital Learning Week
            2027 Call for Proposals alongside the 20-year NdaY&apos;Fanabeazana Marshall Plan.
          </p>
          <pre className="max-h-72 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
            {markdown}
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied Markdown" : "Copy Markdown"}
          </button>
          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            Download JSON
          </button>
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            Download Markdown
          </button>
        </div>
      </div>
    </div>
  );
}
