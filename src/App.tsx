import { useState } from "react";
import { ExportBriefModal } from "./components/ExportBriefModal";
import { FamilyAndHubApp } from "./components/FamilyAndHubApp";
import { Header } from "./components/Header";
import type { ActiveSection } from "./components/Header";
import { ObservatoryApp } from "./components/ObservatoryApp";
import { OverviewSection } from "./components/OverviewSection";
import { TeacherStudioApp } from "./components/TeacherStudioApp";
import { UnescoProposalSection } from "./components/UnescoProposalSection";

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [customUnescoDraft, setCustomUnescoDraft] = useState<{
    question: string;
    pillar: string;
    headline: string;
    executiveAnswer: string;
  } | null>(null);

  const handleSelectSection = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenExport={() => setExportModalOpen(true)}
      />

      <main className="flex-1">
        {activeSection === "overview" && (
          <OverviewSection onNavigate={handleSelectSection} />
        )}
        {activeSection === "unesco" && (
          <UnescoProposalSection onSaveDraftForExport={setCustomUnescoDraft} />
        )}
        {activeSection === "family-hub" && <FamilyAndHubApp />}
        {activeSection === "teacher-studio" && <TeacherStudioApp />}
        {activeSection === "observatory" && <ObservatoryApp />}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            NdaY&apos;Fanabeazana · Human Development Digital Public Infrastructure (HD-DPI) ·
            Individual Enterprise NdaY&apos;
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => handleSelectSection("unesco")}
              className="cursor-pointer font-medium text-slate-600 hover:text-slate-900"
            >
              UNESCO DLW 2027 Answers
            </button>
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="cursor-pointer font-medium text-blue-900 hover:underline"
            >
              Download Proposal Brief
            </button>
          </div>
        </div>
      </footer>

      <ExportBriefModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        customUnescoDraft={customUnescoDraft}
      />
    </div>
  );
}
