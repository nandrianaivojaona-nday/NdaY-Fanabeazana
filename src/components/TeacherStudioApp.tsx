import { useState } from "react";
import { Award, CheckCircle2, Loader2, Sparkles, WifiOff } from "lucide-react";
import { GENERATED_IMAGES } from "../data/marshallPlanData";
import { ResilientImage } from "./ResilientImage";

interface LessonOutput {
  title: string;
  teacherRoleSummary: string;
  learningObjectives: string[];
  lowResourceMaterials: string[];
  classroomSteps: { phase: string; duration: string; activity: string }[];
  multilingualVocabulary: { malagasy: string; french: string; english: string }[];
  formativeCheck: string;
  valuesIntegration: string;
}

interface InnovationProposal {
  id: string;
  teacher: string;
  school: string;
  title: string;
  impact: string;
  status: string;
}

const OFFLINE_CACHE_PACK: LessonOutput = {
  title: "Solar Micro-Irrigation & Water Measurement (Offline Hub Pack)",
  teacherRoleSummary:
    "The teacher leads hands-on inquiry at the school garden workbench while students measure flow volume and connect local Malagasy terminology with French scientific terms.",
  learningObjectives: [
    "Measure water volume per minute using recycled bottles and a simple timer",
    "Explain why drip irrigation preserves highland soil moisture during dry season",
    "Collaborate in mixed-ability teams and record findings in the Student Portfolio",
  ],
  lowResourceMaterials: [
    "2 recycled 1.5L plastic bottles",
    "Bamboo tubing or dry reeds",
    "Chalkboard & notebook grid",
    "12V solar hub reference diagram (cached locally)",
  ],
  classroomSteps: [
    {
      phase: "01. Observation & Dialogue",
      duration: "10 min",
      activity:
        "Teacher invites students to share how elders conserve water in family gardens.",
    },
    {
      phase: "02. Team Experiment",
      duration: "25 min",
      activity:
        "Groups compare open pouring vs. bamboo drip flow and record milliliters per minute.",
    },
    {
      phase: "03. Portfolio Reflection",
      duration: "10 min",
      activity:
        "Students draw the diagram in Malagasy and French for their Holistic Student Portfolio.",
    },
  ],
  multilingualVocabulary: [
    { malagasy: "Rano", french: "Eau", english: "Water" },
    { malagasy: "Fitahirizan-drano", french: "Conservation de l'eau", english: "Water conservation" },
    { malagasy: "Masoandro", french: "Énergie solaire", english: "Solar energy" },
  ],
  formativeCheck:
    "Each team explains one practical improvement they can test at home or in the school nutrition plot.",
  valuesIntegration: "Environmental stewardship, teamwork, and civic problem-solving.",
};

const TEACHER_CAREER_TIERS = [
  {
    tier: "01. Teacher",
    requirement: "Initial certification + Parent & Community partnership foundation",
    benefit: "Access to Teacher AI Assistant, wellbeing support & micro-learning",
  },
  {
    tier: "02. Senior Teacher",
    requirement: "Demonstrated student portfolio growth & multilingual pedagogy",
    benefit: "Housing & financial planning stipend + curriculum co-author credit",
  },
  {
    tier: "03. Mentor Teacher",
    requirement: "Peer coaching of 3+ early-career teachers across Fokontany clusters",
    benefit: "Protected mentoring hours & National Teacher Academy badge",
  },
  {
    tier: "04. Master Teacher",
    requirement: "Action research published in National Education Research Network",
    benefit: "Priority eligibility for Teacher Innovation Fund grants",
  },
  {
    tier: "05. Education Leader",
    requirement: "School transformation & community hub leadership outcomes",
    benefit: "Regional observatory advisory seat & national recognition award",
  },
];

const INITIAL_INNOVATIONS: InnovationProposal[] = [
  {
    id: "ti-1",
    teacher: "Mme. Rakotonirina Sahondra",
    school: "EPP Ambohibao",
    title: "Bilingual Malagasy-French Tactile Phonics Kits from Recycled Wood",
    impact: "Improved Grade 1 reading fluency in 3 rural satellite classrooms",
    status: "Funded · Cohort 1",
  },
  {
    id: "ti-2",
    teacher: "M. Andriantsitohaina Marc",
    school: "CEG Fianarantsoa Nord",
    title: "School Waste-to-Biogas Science Lab & Nutrition Kitchen Link",
    impact: "Zero-cost cooking fuel for school canteen + applied chemistry projects",
    status: "Under Review",
  },
];

export function TeacherStudioApp() {
  const [taskType, setTaskType] = useState("Lesson Plan");
  const [subject, setSubject] = useState("Applied Environmental Science");
  const [gradeLevel, setGradeLevel] = useState("Upper Primary (Grades 4–5)");
  const [language, setLanguage] = useState("Bilingual Malagasy & Français");
  const [topic, setTopic] = useState(
    "Solar drip irrigation and soil moisture stewardship for school gardens"
  );
  const [contextNote, setContextNote] = useState(
    "Solar-powered rural school with 38 learners, chalkboards, and local agricultural materials."
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lessonOutput, setLessonOutput] = useState<LessonOutput>(OFFLINE_CACHE_PACK);

  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  const [innovations, setInnovations] =
    useState<InnovationProposal[]>(INITIAL_INNOVATIONS);
  const [innTeacher, setInnTeacher] = useState("");
  const [innSchool, setInnSchool] = useState("");
  const [innTitle, setInnTitle] = useState("");

  const handleGenerateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/ai/teacher-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType,
          subject,
          gradeLevel,
          language,
          topic,
          contextNote,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to generate lesson package.");
      }
      setLessonOutput(data as LessonOutput);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to reach Teacher AI Assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddInnovation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!innTeacher.trim() || !innSchool.trim() || !innTitle.trim()) return;
    setInnovations((prev) => [
      {
        id: `ti-${Date.now()}`,
        teacher: innTeacher.trim(),
        school: innSchool.trim(),
        title: innTitle.trim(),
        impact: "Submitted for regional Mentor Teacher peer evaluation",
        status: "Submitted",
      },
      ...prev,
    ]);
    setInnTeacher("");
    setInnSchool("");
    setInnTitle("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Split */}
      <section className="grid grid-cols-1 items-stretch gap-8 border-b border-slate-200 pb-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Strategic Objectives 03 &amp; 04 · AI Supports—Never Replaces—Teachers
            </p>
            <h1 className="font-editorial mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl [text-wrap:balance]">
              Teacher AI Assistant, Career Academy &amp; Holistic Student Portfolios
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Schools transform from examination factories into innovation centers. Teachers offload
              multilingual prep and formative rubric drafting to the AI Assistant while guiding
              hands-on community projects.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 pt-5">
            <div>
              <dt className="text-xs text-slate-500">Pedagogical Principle</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">Human-Led AI</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Career Progression</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-slate-900 tabular-nums">
                5 Competency Tiers
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Learner Assessment</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">Holistic Portfolio</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <ResilientImage
            src={GENERATED_IMAGES.teacherClassroom}
            alt="Malagasy teacher guiding students with a solar irrigation prototype and rugged classroom tablet"
            caption="Fig. 4 — Teacher-led inquiry combining offline lesson diagrams with practical solar engineering."
            aspectClass="h-full min-h-[240px]"
          />
        </div>
      </section>

      {/* Teacher AI Assistant Studio */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Module M09 · Lesson Planning, Translation &amp; Low-Resource Activities
            </p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
              Teacher AI Assistant
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setLessonOutput(OFFLINE_CACHE_PACK)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <WifiOff className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
            Load Cached Offline Pack
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <form onSubmit={handleGenerateLesson} className="space-y-4 lg:col-span-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ta-task"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Assistant Task
                </label>
                <select
                  id="ta-task"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option>Lesson Plan</option>
                  <option>Classroom Activity</option>
                  <option>Formative Assessment</option>
                  <option>Multilingual Translation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="ta-lang"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Language Mode
                </label>
                <select
                  id="ta-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option>Bilingual Malagasy &amp; Français</option>
                  <option>Malagasy</option>
                  <option>Français</option>
                  <option>Trilingual (MG / FR / EN)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ta-subj"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="ta-subj"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ta-grade"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Grade / Cycle
                </label>
                <input
                  id="ta-grade"
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ta-topic"
                className="block text-xs font-semibold text-slate-700"
              >
                Lesson Topic or Competency
              </label>
              <textarea
                id="ta-topic"
                rows={2}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
                required
              />
            </div>

            <div>
              <label
                htmlFor="ta-ctx"
                className="block text-xs font-semibold text-slate-700"
              >
                Classroom &amp; Offline Constraints
              </label>
              <textarea
                id="ta-ctx"
                rows={2}
                value={contextNote}
                onChange={(e) => setContextNote(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing Teacher Package...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Teacher Support Package
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

          {/* Lesson Output */}
          <div className="space-y-5 rounded-lg border border-slate-200 bg-slate-50 p-6 lg:col-span-7">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-medium text-blue-900">
                {taskType} · {language}
              </p>
              <h3 className="font-editorial mt-1 text-xl font-semibold text-slate-900">
                {lessonOutput.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {lessonOutput.teacherRoleSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-white p-4">
                <h4 className="text-xs font-semibold text-slate-800">Learning Objectives</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  {lessonOutput.learningObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-slate-200 bg-white p-4">
                <h4 className="text-xs font-semibold text-slate-800">
                  Low-Resource &amp; Local Materials
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-600">
                  {lessonOutput.lowResourceMaterials.map((mat, idx) => (
                    <li key={idx}>· {mat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4">
              <h4 className="text-xs font-semibold text-slate-800">
                Classroom Facilitation Sequence
              </h4>
              <div className="mt-3 divide-y divide-slate-100">
                {lessonOutput.classroomSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{step.phase}</p>
                      <p className="mt-0.5 text-xs text-slate-600">{step.activity}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap shrink-0">
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {lessonOutput.multilingualVocabulary?.length > 0 && (
              <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                    <tr>
                      <th className="px-3 py-2">Malagasy</th>
                      <th className="px-3 py-2">Français</th>
                      <th className="px-3 py-2">English</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lessonOutput.multilingualVocabulary.map((row, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 font-medium text-slate-900">{row.malagasy}</td>
                        <td className="px-3 py-2 text-slate-700">{row.french}</td>
                        <td className="px-3 py-2 text-slate-700">{row.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-white p-3.5">
                <span className="font-semibold text-slate-800">Formative Check: </span>
                <span className="text-slate-600">{lessonOutput.formativeCheck}</span>
              </div>
              <div className="rounded-md border border-slate-200 bg-white p-3.5">
                <span className="font-semibold text-slate-800">Values Integration: </span>
                <span className="text-slate-600">{lessonOutput.valuesIntegration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Teacher Academy Career Path & Innovation Fund + Student Portfolio */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Career Path & Innovation Fund */}
        <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 lg:col-span-7">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-xs font-medium text-slate-500">
              Objective 04 · National Teacher Academy &amp; Wellbeing
            </p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
              Competency Career Path &amp; Teacher Innovation Fund
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
            {TEACHER_CAREER_TIERS.map((tier, idx) => (
              <button
                key={tier.tier}
                type="button"
                onClick={() => setSelectedTierIdx(idx)}
                className={`cursor-pointer rounded-md border p-3 text-left transition-colors ${
                  selectedTierIdx === idx
                    ? "border-blue-900 bg-blue-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span className="block font-mono text-xs font-medium opacity-80">
                  Stage 0{idx + 1}
                </span>
                <span className="mt-1 block text-xs font-semibold">
                  {tier.tier.replace(/^\d+\.\s*/, "")}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {TEACHER_CAREER_TIERS[selectedTierIdx].tier}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              <strong>Competency Standard:</strong>{" "}
              {TEACHER_CAREER_TIERS[selectedTierIdx].requirement}
            </p>
            <p className="mt-1 text-xs text-emerald-800">
              <strong>Wellbeing &amp; Recognition:</strong>{" "}
              {TEACHER_CAREER_TIERS[selectedTierIdx].benefit}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Teacher Innovation Fund Submissions
            </h3>
            <div className="mt-3 space-y-2.5">
              {innovations.map((inn) => (
                <div
                  key={inn.id}
                  className="flex flex-col justify-between gap-2 rounded-md border border-slate-200 p-3.5 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {inn.teacher} · {inn.school}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{inn.title}</p>
                    <p className="mt-0.5 text-xs text-slate-600">{inn.impact}</p>
                  </div>
                  <span className="font-mono text-xs font-medium text-blue-900 whitespace-nowrap shrink-0">
                    {inn.status}
                  </span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddInnovation}
              className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-12"
            >
              <input
                type="text"
                value={innTeacher}
                onChange={(e) => setInnTeacher(e.target.value)}
                placeholder="Teacher name"
                className="rounded-md border border-slate-300 px-3 py-2 text-xs sm:col-span-3"
                required
              />
              <input
                type="text"
                value={innSchool}
                onChange={(e) => setInnSchool(e.target.value)}
                placeholder="School / Fokontany"
                className="rounded-md border border-slate-300 px-3 py-2 text-xs sm:col-span-3"
                required
              />
              <input
                type="text"
                value={innTitle}
                onChange={(e) => setInnTitle(e.target.value)}
                placeholder="Classroom innovation proposal title..."
                className="rounded-md border border-slate-300 px-3 py-2 text-xs sm:col-span-4"
                required
              />
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-blue-900 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 sm:col-span-2 whitespace-nowrap shrink-0"
              >
                Submit Grant
              </button>
            </form>
          </div>
        </div>

        {/* Holistic Student Portfolio */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-5">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-xs font-medium text-slate-500">
              Objective 03 · Beyond Examination Scores
            </p>
            <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
              Holistic Student Portfolio
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Sample verified learner profile: Rakotoarivony Aina · Grade 8 (CEG Ambohidrapeto)
            </p>
          </div>

          <dl className="mt-5 divide-y divide-slate-200">
            <div className="py-3 first:pt-0">
              <dt className="text-xs font-semibold text-slate-500">Applied Projects</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                Bamboo Solar Drip Prototype for School Nutrition Garden
              </dd>
              <p className="mt-0.5 text-xs text-slate-600">
                Verified by Science Teacher &amp; Community Farmer Mentor
              </p>
            </div>
            <div className="py-3">
              <dt className="text-xs font-semibold text-slate-500">
                Volunteer &amp; Community Service
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                24 hrs · Peer Reading Buddy for Grade 1 Learners
              </dd>
              <p className="mt-0.5 text-xs text-slate-600">
                Logged in Volunteer &amp; Community Service Registry (M15)
              </p>
            </div>
            <div className="py-3">
              <dt className="text-xs font-semibold text-slate-500">
                Environmental Stewardship &amp; Leadership
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                Fokontany Watershed Reforestation Coordinator (120 seedlings)
              </dd>
            </div>
            <div className="py-3 last:pb-0">
              <dt className="text-xs font-semibold text-slate-500">
                Digital &amp; Multilingual Certificates
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-800">
                <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                Malagasy-French Scientific Literacy Level 2
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
