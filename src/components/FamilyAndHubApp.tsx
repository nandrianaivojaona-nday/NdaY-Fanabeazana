import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Loader2,
  Plus,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import {
  GENERATED_IMAGES,
  INITIAL_CHALLENGES,
  INITIAL_MENTORS,
  LEARNING_MARKETPLACE_COURSES,
  PARENT_CURRICULUM,
} from "../data/marshallPlanData";
import type {
  CommunityMentor,
  InnovationChallenge,
  LearningCourse,
} from "../data/marshallPlanData";
import { ResilientImage } from "./ResilientImage";

interface PassportMilestone {
  id: string;
  category:
    | "Health & Vaccination"
    | "Early Stimulation"
    | "Language Development"
    | "Reading Exposure"
    | "School Readiness";
  note: string;
  date: string;
  verifiedBy: string;
}

interface CompanionResponse {
  guidanceSummary: string;
  actionableSteps: string[];
  recommendedHubMentor: string;
  marketplaceTrack: string;
  skillsPassportCredential: string;
}

const INITIAL_MILESTONES: PassportMilestone[] = [
  {
    id: "pm-1",
    category: "Health & Vaccination",
    note: "Pentavalent & Polio 14-week schedule completed at CSB II Ambohimanga",
    date: "2026-08-12",
    verifiedBy: "Community Health Agent",
  },
  {
    id: "pm-2",
    category: "Reading Exposure",
    note: "Borrowed 4 bilingual Malagasy-French picture stories with family mentor",
    date: "2026-10-03",
    verifiedBy: "Mme. Rasoanirina (Mentor)",
  },
  {
    id: "pm-3",
    category: "Early Stimulation",
    note: "Daily 15-minute local nature naming and rhythm game logged by parents",
    date: "2026-11-02",
    verifiedBy: "Parent Self-Log",
  },
];

export function FamilyAndHubApp() {
  const [subApp, setSubApp] = useState<"family" | "community" | "lifelong">("family");

  // Parent Academy state
  const [lang, setLang] = useState<"mg" | "fr" | "en">("mg");
  const [channel, setChannel] = useState<"app" | "sms" | "radio">("app");
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>(
    PARENT_CURRICULUM[0].id
  );

  // Home Learning Passport state
  const [milestones, setMilestones] = useState<PassportMilestone[]>(() => {
    try {
      const saved = localStorage.getItem("nday_home_passport_milestones");
      return saved ? (JSON.parse(saved) as PassportMilestone[]) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });
  const [newMilestoneCat, setNewMilestoneCat] =
    useState<PassportMilestone["category"]>("Reading Exposure");
  const [newMilestoneNote, setNewMilestoneNote] = useState("");

  // Community Hub state
  const [mentors, setMentors] = useState<CommunityMentor[]>(INITIAL_MENTORS);
  const [archetypeFilter, setArchetypeFilter] = useState<string>("All");
  const [mentorName, setMentorName] = useState("");
  const [mentorArchetype, setMentorArchetype] =
    useState<CommunityMentor["archetype"]>("Farmer");
  const [mentorFokontany, setMentorFokontany] = useState("");
  const [mentorSpecialty, setMentorSpecialty] = useState("");

  const [challenges, setChallenges] =
    useState<InnovationChallenge[]>(INITIAL_CHALLENGES);
  const [challengeDomain, setChallengeDomain] =
    useState<InnovationChallenge["domain"]>("Improve Irrigation");
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeSummary, setChallengeSummary] = useState("");

  // Lifelong Learning & AI Companion state
  const [courses, setCourses] = useState<LearningCourse[]>(LEARNING_MARKETPLACE_COURSES);
  const [companionAge, setCompanionAge] = useState("Young Adult (18–30)");
  const [companionProfession, setCompanionProfession] = useState(
    "Rural Agribusiness Apprentice"
  );
  const [companionLang, setCompanionLang] = useState("Malagasy & Français");
  const [companionGoal, setCompanionGoal] = useState(
    "Solar micro-irrigation & cooperative management"
  );
  const [companionPrompt, setCompanionPrompt] = useState(
    "How can I design a low-cost water-saving schedule for vegetable gardens in dry highlands?"
  );
  const [companionLoading, setCompanionLoading] = useState(false);
  const [companionError, setCompanionError] = useState<string | null>(null);
  const [companionResult, setCompanionResult] = useState<CompanionResponse | null>(
    null
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        "nday_home_passport_milestones",
        JSON.stringify(milestones)
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [milestones]);

  const activeModule =
    PARENT_CURRICULUM.find((c) => c.id === selectedCurriculumId) ??
    PARENT_CURRICULUM[0];

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneNote.trim()) return;
    const entry: PassportMilestone = {
      id: `pm-${Date.now()}`,
      category: newMilestoneCat,
      note: newMilestoneNote.trim(),
      date: new Date().toISOString().slice(0, 10),
      verifiedBy: "Parent + Family Mentor Sync",
    };
    setMilestones((prev) => [entry, ...prev]);
    setNewMilestoneNote("");
  };

  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorName.trim() || !mentorFokontany.trim() || !mentorSpecialty.trim()) {
      return;
    }
    const created: CommunityMentor = {
      id: `cm-${Date.now()}`,
      name: mentorName.trim(),
      archetype: mentorArchetype,
      fokontany: mentorFokontany.trim(),
      region: "Fokontany Registry",
      specialty: mentorSpecialty.trim(),
      languages: "Malagasy · Français",
      availability: "Flexible Hub Hours",
    };
    setMentors((prev) => [created, ...prev]);
    setMentorName("");
    setMentorFokontany("");
    setMentorSpecialty("");
  };

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeTitle.trim() || !challengeSummary.trim()) return;
    const created: InnovationChallenge = {
      id: `ic-${Date.now()}`,
      domain: challengeDomain,
      fokontany: "Local Fokontany Hub",
      title: challengeTitle.trim(),
      summary: challengeSummary.trim(),
      teamsParticipating: 1,
      mentorLead: mentors[0]?.name || "Community Mentor",
    };
    setChallenges((prev) => [created, ...prev]);
    setChallengeTitle("");
    setChallengeSummary("");
  };

  const handleToggleEnroll = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: !c.enrolled } : c))
    );
  };

  const handleAskCompanion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companionPrompt.trim()) return;
    setCompanionLoading(true);
    setCompanionError(null);
    try {
      const response = await fetch("/api/ai/learning-companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learnerAge: companionAge,
          profession: companionProfession,
          language: companionLang,
          goal: companionGoal,
          question: companionPrompt.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to reach AI Learning Companion.");
      }
      setCompanionResult(data as CompanionResponse);
    } catch (err) {
      setCompanionError(
        err instanceof Error ? err.message : "Failed to reach AI Learning Companion."
      );
    } finally {
      setCompanionLoading(false);
    }
  };

  const filteredMentors = mentors.filter((m) =>
    archetypeFilter === "All" ? true : m.archetype === archetypeFilter
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Workspace Header & Segmented App Switcher */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Strategic Objectives 01, 02 &amp; 06 · Citizen &amp; Fokontany Applications
          </p>
          <h1 className="font-editorial mt-1 text-3xl font-semibold text-slate-900">
            Family Education, Fokontany Hubs &amp; Lifelong Learning
          </h1>
        </div>

        <div
          role="tablist"
          aria-label="Family and community applications"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start sm:self-auto"
        >
          {(
            [
              { id: "family", label: "01. Parent Academy" },
              { id: "community", label: "02. Fokontany Hub" },
              { id: "lifelong", label: "06. Skills Passport" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={subApp === tab.id}
              onClick={() => setSubApp(tab.id)}
              className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                subApp === tab.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-APP 1: PARENT ACADEMY & HOME LEARNING PASSPORT */}
      {subApp === "family" && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      0–18 Years Curriculum · 7 Inclusive Channels
                    </p>
                    <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                      Parent Academy
                    </h2>
                  </div>

                  {/* Language Switcher */}
                  <div className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 p-1">
                    {(
                      [
                        { id: "mg", label: "Malagasy" },
                        { id: "fr", label: "Français" },
                        { id: "en", label: "English" },
                      ] as const
                    ).map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLang(l.id)}
                        className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${
                          lang === l.id
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curriculum Selector */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {PARENT_CURRICULUM.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedCurriculumId(item.id)}
                      className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        selectedCurriculumId === item.id
                          ? "border-blue-900 bg-blue-900 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {item.ageStage} · {item.topic.split(" ")[0]} {item.topic.split(" ")[1]}
                    </button>
                  ))}
                </div>

                {/* Active Module Content */}
                <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>Stage: {activeModule.ageStage}</span>
                    <div className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white p-0.5">
                      {(
                        [
                          { id: "app", label: "Mobile Guide" },
                          { id: "sms", label: "SMS / 2G Voice" },
                          { id: "radio", label: "Radio & Faith Circle" },
                        ] as const
                      ).map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setChannel(ch.id)}
                          className={`cursor-pointer rounded px-2 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${
                            channel === ch.id
                              ? "bg-blue-900 text-white"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-editorial mt-3 text-xl font-semibold text-slate-900">
                    {lang === "mg"
                      ? activeModule.malagasyTitle
                      : lang === "fr"
                      ? activeModule.frenchTitle
                      : activeModule.englishTitle}
                  </h3>

                  {channel === "app" && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {activeModule.actionChecklist.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {channel === "sms" && (
                    <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold text-slate-500">
                        Zero-Internet 2G SMS / Interactive Voice Response Preview
                      </p>
                      <p className="mt-2 font-mono text-xs leading-relaxed text-slate-800">
                        {activeModule.smsDigest}
                      </p>
                    </div>
                  )}

                  {channel === "radio" && (
                    <div className="mt-4 flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4">
                      <Radio className="mt-0.5 h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Community Radio &amp; Church / Facilitator Broadcast Script
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">
                          {activeModule.radioPrompt}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-500">
                Delivery parity: Mobile application · SMS &amp; voice messages · Community
                facilitators · Radio · Television · Faith communities · Community centers.
              </p>
            </div>

            <div className="lg:col-span-5">
              <ResilientImage
                src={GENERATED_IMAGES.parentAcademy}
                alt="Malagasy mother and father reading an illustrated bilingual book with their child using the Parent Academy"
                caption="Fig. 2 — Family-centered early stimulation and bilingual reading habits prior to primary school entry."
                aspectClass="h-full min-h-[260px]"
              />
            </div>
          </div>

          {/* Home Learning Passport (Birth to School Readiness) */}
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Citizen Learning Passport · Initiated at Birth
                </p>
                <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                  Child Home Learning Passport
                </h2>
              </div>
              <p className="font-mono text-xs text-slate-600 tabular-nums">
                Child ID: PAS-MG-2024-0418 · Mentor Paired: Mme. Rasoanirina
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <form onSubmit={handleAddMilestone} className="space-y-4 lg:col-span-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Record Developmental Milestone
                </h3>
                <div>
                  <label
                    htmlFor="milestone-cat"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Passport Domain
                  </label>
                  <select
                    id="milestone-cat"
                    value={newMilestoneCat}
                    onChange={(e) =>
                      setNewMilestoneCat(
                        e.target.value as PassportMilestone["category"]
                      )
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                  >
                    <option value="Health & Vaccination">Health &amp; Vaccination</option>
                    <option value="Early Stimulation">Early Stimulation</option>
                    <option value="Language Development">Language Development</option>
                    <option value="Reading Exposure">Reading Exposure</option>
                    <option value="School Readiness">School Readiness</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="milestone-note"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Milestone Note
                  </label>
                  <textarea
                    id="milestone-note"
                    rows={3}
                    value={newMilestoneNote}
                    onChange={(e) => setNewMilestoneNote(e.target.value)}
                    placeholder="e.g., Completed 15-word Malagasy picture story session with elder mentor..."
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Save to Home Passport
                </button>
              </form>

              <div className="lg:col-span-8">
                <div className="overflow-x-auto rounded-md border border-slate-200">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Domain</th>
                        <th className="px-4 py-3">Recorded Milestone</th>
                        <th className="px-4 py-3">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {milestones.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                            {m.date}
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-slate-800 whitespace-nowrap">
                            {m.category}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-700">{m.note}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {m.verifiedBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SUB-APP 2: FOKONTANY COMMUNITY LEARNING HUB */}
      {subApp === "community" && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ResilientImage
                src={GENERATED_IMAGES.communityMentor}
                alt="Senior Malagasy craftsman and agronomist mentoring local youth in a solar-powered Fokontany hub"
                caption="Fig. 3 — Community Knowledge Network uniting retired teachers, farmers, engineers, and artisans inside Fokontany Hubs."
                aspectClass="h-full min-h-[260px]"
              />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-7">
              <p className="text-xs font-medium text-slate-500">
                Objective 02 · Every Fokontany Becomes a Learning Community
              </p>
              <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                Community Knowledge Network &amp; Mentor Registry
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Knowledge stays within the community. Filter certified local mentors or register a
                neighborhood practitioner.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {[
                  "All",
                  "Retired Teacher",
                  "Farmer",
                  "Doctor",
                  "Engineer",
                  "Craftsman",
                  "Entrepreneur",
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setArchetypeFilter(role)}
                    className={`cursor-pointer rounded border px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${
                      archetypeFilter === role
                        ? "border-blue-900 bg-blue-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-medium text-blue-900">
                      {mentor.archetype} · {mentor.fokontany}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900">{mentor.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {mentor.specialty}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {mentor.languages} · {mentor.availability}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Register Mentor + Local Innovation Challenges */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleAddMentor}
              className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 lg:col-span-4"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-900" aria-hidden="true" />
                <h3 className="text-base font-semibold text-slate-900">
                  Register Community Mentor
                </h3>
              </div>
              <div>
                <label
                  htmlFor="mentor-name"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="mentor-name"
                  type="text"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  placeholder="e.g., M. Ratsimba Fidèle"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="mentor-role"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Mentor Archetype
                </label>
                <select
                  id="mentor-role"
                  value={mentorArchetype}
                  onChange={(e) =>
                    setMentorArchetype(
                      e.target.value as CommunityMentor["archetype"]
                    )
                  }
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                >
                  <option value="Retired Teacher">Retired Teacher</option>
                  <option value="Craftsman">Craftsman</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Artist">Artist</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="mentor-fokontany"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Fokontany
                </label>
                <input
                  id="mentor-fokontany"
                  type="text"
                  value={mentorFokontany}
                  onChange={(e) => setMentorFokontany(e.target.value)}
                  placeholder="e.g., Itaosy Centre"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="mentor-spec"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Practical Specialty
                </label>
                <input
                  id="mentor-spec"
                  type="text"
                  value={mentorSpecialty}
                  onChange={(e) => setMentorSpecialty(e.target.value)}
                  placeholder="e.g., Agroecology & youth carpentry"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Add to Hub Registry
              </button>
            </form>

            <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-8">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-medium text-slate-500">
                  Education Becomes Problem-Solving · Annual Competitions
                </p>
                <h3 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                  Local Innovation Challenges
                </h3>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {challenges.map((ch) => (
                  <article
                    key={ch.id}
                    className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-medium text-blue-900">
                      {ch.domain} · {ch.fokontany}
                    </p>
                    <h4 className="mt-1 text-sm font-semibold text-slate-900">{ch.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ch.summary}</p>
                    <p className="mt-3 font-mono text-xs text-slate-500 tabular-nums">
                      {ch.teamsParticipating} Teams · Lead: {ch.mentorLead}
                    </p>
                  </article>
                ))}
              </div>

              <form
                onSubmit={handleAddChallenge}
                className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 sm:grid-cols-12"
              >
                <select
                  aria-label="Challenge domain"
                  value={challengeDomain}
                  onChange={(e) =>
                    setChallengeDomain(
                      e.target.value as InnovationChallenge["domain"]
                    )
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 sm:col-span-3"
                >
                  <option value="Improve Irrigation">Improve Irrigation</option>
                  <option value="Reduce Waste">Reduce Waste</option>
                  <option value="Improve Nutrition">Improve Nutrition</option>
                  <option value="Improve Schools">Improve Schools</option>
                  <option value="Develop Tourism">Develop Tourism</option>
                  <option value="Build Local Businesses">Build Local Businesses</option>
                </select>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  placeholder="Propose new Fokontany challenge title..."
                  className="rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-900 sm:col-span-4"
                  required
                />
                <input
                  type="text"
                  value={challengeSummary}
                  onChange={(e) => setChallengeSummary(e.target.value)}
                  placeholder="Brief problem-solving scope..."
                  className="rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-900 sm:col-span-3"
                  required
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-md bg-blue-900 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 sm:col-span-2 whitespace-nowrap shrink-0"
                >
                  Launch
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUB-APP 3: LIFELONG LEARNING MARKETPLACE, SKILLS PASSPORT & AI COMPANION */}
      {subApp === "lifelong" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* National Learning Marketplace + Skills Passport */}
          <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 lg:col-span-7">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-medium text-slate-500">
                Objective 06 · Formal, Informal, Community &amp; Volunteer Credentials
              </p>
              <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                National Learning Marketplace &amp; Skills Passport
              </h2>
            </div>

            <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {course.domain} · {course.duration} · {course.languages}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900">{course.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <Award className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      Verified Passport Credential: {course.credentialName}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleEnroll(course.id)}
                    className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      course.enrolled
                        ? "border border-emerald-700 bg-emerald-50 text-emerald-800"
                        : "bg-blue-900 text-white hover:bg-blue-800"
                    }`}
                  >
                    {course.enrolled ? "Active in Passport" : "Enroll Track"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Adaptive AI Learning Companion */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-5">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-medium text-slate-500">
                Personal AI Tutor · Adapts to Age, Profession &amp; Language
              </p>
              <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
                AI Learning Companion
              </h2>
            </div>

            <form onSubmit={handleAskCompanion} className="mt-4 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="comp-age"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Age Profile
                  </label>
                  <select
                    id="comp-age"
                    value={companionAge}
                    onChange={(e) => setCompanionAge(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-900"
                  >
                    <option>Youth (12–17)</option>
                    <option>Young Adult (18–30)</option>
                    <option>Adult Practitioner (31–55)</option>
                    <option>Elder / Community Mentor (55+)</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="comp-lang"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Preferred Language
                  </label>
                  <select
                    id="comp-lang"
                    value={companionLang}
                    onChange={(e) => setCompanionLang(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-900"
                  >
                    <option>Malagasy &amp; Français</option>
                    <option>Malagasy</option>
                    <option>Français</option>
                    <option>English</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="comp-prof"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Profession &amp; Career Aspiration
                </label>
                <input
                  id="comp-prof"
                  type="text"
                  value={companionProfession}
                  onChange={(e) => setCompanionProfession(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="comp-goal"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Learning Goal
                </label>
                <input
                  id="comp-goal"
                  type="text"
                  value={companionGoal}
                  onChange={(e) => setCompanionGoal(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="comp-q"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Ask Your Learning Companion
                </label>
                <textarea
                  id="comp-q"
                  rows={3}
                  value={companionPrompt}
                  onChange={(e) => setCompanionPrompt(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={companionLoading}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {companionLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adapting Learning Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get Adaptive Guidance
                  </>
                )}
              </button>
            </form>

            {companionError && (
              <div
                role="alert"
                className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                {companionError}
              </div>
            )}

            {companionResult && (
              <div className="mt-5 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs leading-relaxed text-slate-800">
                  {companionResult.guidanceSummary}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {companionResult.actionableSteps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-900" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-200 pt-2.5 text-xs text-slate-600">
                  <p>
                    <strong>Fokontany Mentor:</strong> {companionResult.recommendedHubMentor}
                  </p>
                  <p className="mt-1">
                    <strong>Passport Credential:</strong>{" "}
                    {companionResult.skillsPassportCredential}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
