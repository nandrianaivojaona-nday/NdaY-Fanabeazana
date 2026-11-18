export interface StrategicObjective {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  premise: string;
  pillars: string[];
  unescoPillar: "Thinking" | "Empowering" | "Governing" | "Inclusive Access";
}

export interface UnescoQuestion {
  id: string;
  pillar: "Thinking" | "Empowering" | "Governing" | "Inclusive Access";
  question: string;
  marshallPlanDirectAnswer: string;
  mechanisms: string[];
  evidenceIndicators: string[];
  phaseFocus: string;
}

export interface PlatformModule {
  id: string;
  name: string;
  objectiveRef: string;
  offlineCapable: boolean;
  description: string;
  primaryUsers: string;
}

export interface RoadmapPhase {
  phase: string;
  horizon: string;
  headline: string;
  deliverables: string[];
  unescoLink: string;
}

export interface ParentCurriculumModule {
  id: string;
  topic: string;
  ageStage: string;
  malagasyTitle: string;
  frenchTitle: string;
  englishTitle: string;
  smsDigest: string;
  radioPrompt: string;
  actionChecklist: string[];
}

export interface CommunityMentor {
  id: string;
  name: string;
  archetype:
    | "Retired Teacher"
    | "Craftsman"
    | "Farmer"
    | "Doctor"
    | "Engineer"
    | "Entrepreneur"
    | "Artist";
  fokontany: string;
  region: string;
  specialty: string;
  languages: string;
  availability: string;
}

export interface InnovationChallenge {
  id: string;
  domain:
    | "Improve Irrigation"
    | "Reduce Waste"
    | "Improve Nutrition"
    | "Improve Schools"
    | "Develop Tourism"
    | "Build Local Businesses";
  fokontany: string;
  title: string;
  summary: string;
  teamsParticipating: number;
  mentorLead: string;
}

export interface LearningCourse {
  id: string;
  domain: string;
  title: string;
  format: string;
  duration: string;
  credentialName: string;
  languages: string;
  enrolled: boolean;
}

export interface RegionalObservatoryRow {
  region: string;
  fokontanyHubsTarget: number;
  solarOfflineReadyPct: number;
  enrollmentPct: number;
  baselineDropoutRiskPct: number;
  genderParityIndex: number;
  teacherDeploymentPct: number;
  budgetExecutionPct: number;
}

export const GENERATED_IMAGES = {
  heroHub: "/src/assets/images/hero_learning_hub_1794977711140.jpg",
  parentAcademy: "/src/assets/images/parent_academy_family_1794977710817.jpg",
  teacherClassroom: "/src/assets/images/teacher_ai_classroom_1794977711693.jpg",
  communityMentor: "/src/assets/images/community_craft_mentor_1794977711732.jpg",
};

export const STRATEGIC_OBJECTIVES: StrategicObjective[] = [
  {
    id: "obj-1",
    number: "01",
    title: "Rebuild the Foundation: Family Education",
    subtitle: "The family is the first school (0–18 years)",
    premise:
      "National policies often start too late at primary enrollment, after cognitive, emotional, linguistic, and social foundations are already shaped.",
    pillars: [
      "Parent Academy across 10 core life & child-development topics",
      "7 inclusive delivery channels: Mobile App, SMS/Voice, Radio, TV, Facilitators, Faith Communities, Centers",
      "Home Learning Passport issued at birth (health, vaccinations, reading, readiness)",
      "Community-recognized Family Mentorship pairing experienced and young parents",
    ],
    unescoPillar: "Inclusive Access",
  },
  {
    id: "obj-2",
    number: "02",
    title: "Build Learning Communities",
    subtitle: "Every Fokontany becomes a learning community",
    premise:
      "Education becomes a shared civic responsibility anchored in neighborhood solidarity and intergenerational knowledge transfer.",
    pillars: [
      "Fokontany Community Learning Hubs with adult literacy, library, internet, AI access, and innovation labs",
      "Community Knowledge Network certifying retired teachers, farmers, craftsmen, doctors, engineers, entrepreneurs, and artists",
      "Annual Local Innovation Challenges solving irrigation, waste, nutrition, school, tourism, and enterprise problems",
    ],
    unescoPillar: "Empowering",
  },
  {
    id: "obj-3",
    number: "03",
    title: "Reinvent Schools",
    subtitle: "Innovation centers, not examination factories",
    premise:
      "Every school transforms into a center of inquiry, citizenship, community service, environmental stewardship, and digital literacy.",
    pillars: [
      "Teacher AI Assistant for lesson planning, localization, translation, and formative monitoring—supporting, never replacing, educators",
      "Smart School Dashboard tracking attendance, dropouts, infrastructure, nutrition, finances, and community participation",
      "Holistic Student Portfolio recording projects, skills, volunteer work, innovation, and leadership certificates",
    ],
    unescoPillar: "Thinking",
  },
  {
    id: "obj-4",
    number: "04",
    title: "Transform the Teaching Profession",
    subtitle: "Teachers become national builders",
    premise:
      "No AI platform outperforms under-supported teachers; sustained investment in mastery, dignity, and research elevates the entire system.",
    pillars: [
      "National Teacher Academy with continuous micro-learning, peer coaching, and digital credentials",
      "Competency-based 5-tier Career Path: Teacher to Education Leader",
      "Teacher Innovation Fund backing grassroots pedagogical breakthroughs",
      "Teacher Wellbeing covering mental health, housing support, financial planning, and recognition",
    ],
    unescoPillar: "Empowering",
  },
  {
    id: "obj-5",
    number: "05",
    title: "Modernize Educational Governance",
    subtitle: "Data-informed stewardship and public accountability",
    premise:
      "Federated Digital Public Infrastructure aligns ministries, regions, and citizens around real-time preventive action and open accountability.",
    pillars: [
      "Digital Education Observatory monitoring enrollment, dropouts, gender parity, deployment, and budget execution",
      "Predictive Analytics anticipating teacher shortages, overcrowding, dropout risks, and cyclone/disaster impacts",
      "Open Education Data portal publishing transparent, anonymized national statistics",
      "National Human Development Council spanning 13 ministerial, academic, private, and civil stakeholders",
    ],
    unescoPillar: "Governing",
  },
  {
    id: "obj-6",
    number: "06",
    title: "Lifelong Learning for All",
    subtitle: "Learning never ends; every skill counts",
    premise:
      "Citizens continuously adapt across careers, climate shifts, and civic responsibilities through stackable verified credentials.",
    pillars: [
      "National Learning Marketplace spanning agriculture, AI, business, health, climate adaptation, languages, and traditional knowledge",
      "Verified Skills Passport unifying formal, informal, community, professional, and volunteer learning",
      "Personal AI Learning Companion adapting to age, profession, language, pace, and career aspirations",
    ],
    unescoPillar: "Thinking",
  },
];

export const UNESCO_QUESTIONS: UnescoQuestion[] = [
  {
    id: "uq-thinking",
    pillar: "Thinking",
    question:
      "How does NdaY'Fanabeazana rethink pedagogy, critical thinking, and curriculum in the age of AI rather than automating rote memorization?",
    marshallPlanDirectAnswer:
      "NdaY'Fanabeazana explicitly rejects schools as examination factories (Objective 3). Instead of using AI for test drilling, it pairs a Holistic Student Portfolio (projects, volunteer service, environmental stewardship, leadership) with Fokontany Local Innovation Challenges where learners apply AI tools and traditional knowledge to solve real community problems—from solar irrigation and waste reduction to nutrition and local enterprise.",
    mechanisms: [
      "Student Portfolio & Assessment Engine shifting evaluation toward project mastery and civic values",
      "Adaptive AI Learning Companion (Objective 6) customized to age, speed, language, and livelihood goals",
      "Cross-cutting Values & Research Network integrating ethics, integrity, and local evidence",
    ],
    evidenceIndicators: [
      "100% of pilot schools adopting project & service portfolios alongside academic records",
      "Annual Fokontany innovation challenges active across 6 community problem domains",
    ],
    phaseFocus: "Phase I–III (Years 1–12)",
  },
  {
    id: "uq-empowering",
    pillar: "Empowering",
    question:
      "How does the platform empower teachers, parents, and local mentors as active co-creators rather than passive technology consumers?",
    marshallPlanDirectAnswer:
      "Human agency anchors every layer of the Marshall Plan. The Teacher AI Assistant handles lesson preparation, multilingual translation, and differentiation so teachers focus on mentorship and classroom creativity—explicitly designed so AI supports, not replaces, teachers (Objective 3). Simultaneously, the National Teacher Academy, Teacher Innovation Fund, and Wellbeing program elevate teacher dignity (Objective 4), while the Parent Academy and Community Knowledge Network mobilize parents, retired teachers, farmers, doctors, and craftsmen as certified educators (Objectives 1 & 2).",
    mechanisms: [
      "Teacher AI Assistant + 5-tier competency career path + Teacher Innovation Fund",
      "Parent Academy & Family Mentorship empowering households from birth (0–18)",
      "Community Knowledge Network certifying 7 local mentor archetypes inside every Fokontany Hub",
    ],
    evidenceIndicators: [
      "Competency credentials issued via National Teacher Academy & Mentor Registry",
      "Teacher-led innovation grants funded annually per region",
    ],
    phaseFocus: "Phase I–II (Years 1–7)",
  },
  {
    id: "uq-governing",
    pillar: "Governing",
    question:
      "What governance, data ethics, and institutional architecture prevent vendor lock-in and ensure transparent, accountable AI in education?",
    marshallPlanDirectAnswer:
      "NdaY'Fanabeazana is engineered as federated Human Development Digital Public Infrastructure (HD-DPI) governed by a multi-stakeholder National Human Development Council spanning 13 sectors—Education, Higher Education, TVET, Health, Youth, Digital Transformation, Culture, Local Government, Private Sector, Civil Society, Faith-Based Organizations, Universities, and Development Partners. Operational transparency is enforced through the Digital Education Observatory, Predictive Analytics (for early dropout, overcrowding, and disaster intervention), and an Open Education Data portal publishing anonymized public statistics.",
    mechanisms: [
      "16 interoperable, non-proprietary HD-DPI modules sharing open citizen passport standards",
      "National Human Development Council preventing single-ministry silos",
      "Digital Education Observatory + Open Data Portal + Predictive Crisis Analytics",
    ],
    evidenceIndicators: [
      "13 cross-sectoral institutional seats in active governance charter",
      "Real-time regional tracking of budget execution, teacher deployment, and gender parity",
    ],
    phaseFocus: "Phase I–IV (Years 1–20)",
  },
  {
    id: "uq-inclusive",
    pillar: "Inclusive Access",
    question:
      "How does NdaY'Fanabeazana guarantee inclusive access to AI-driven learning for marginalized, rural, low-connectivity, and linguistic minority communities?",
    marshallPlanDirectAnswer:
      "Digital inclusion is built into the infrastructure layer rather than treated as an afterthought. Every Fokontany Community Learning Hub is designed around solar power, offline-first local caching, community Wi-Fi, low-cost devices, and disability accessibility. For households without smartphones or broadband, the Parent Academy delivers curricula through 2G SMS, voice messages, community radio, television, and trained faith/community facilitators. Content preserves Malagasy, French, English, and local regional dialects with AI translation bridging linguistic barriers.",
    mechanisms: [
      "Solar-powered Fokontany Community Learning Hubs with offline-first local synchronization",
      "Multi-channel Parent Academy: Mobile, SMS/Voice, Radio, TV, and in-person facilitators",
      "Multilingual AI translation preserving Malagasy and regional dialects alongside French and English",
    ],
    evidenceIndicators: [
      "7 parallel delivery channels operational for non-broadband households",
      "4+ language and dialect tracks supported across all foundational modules",
    ],
    phaseFocus: "Phase I Priority (Years 1–3)",
  },
];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: "m01",
    name: "Citizen Learning Passport",
    objectiveRef: "Objective 1 & 6",
    offlineCapable: true,
    description: "Lifelong digital record initiated at birth unifying health, readiness, formal schooling, and community learning.",
    primaryUsers: "Citizens & Parents",
  },
  {
    id: "m02",
    name: "Parent Academy",
    objectiveRef: "Objective 1",
    offlineCapable: true,
    description: "0–18 parenting curriculum across 10 core topics delivered via mobile, SMS/voice, radio, TV, and facilitators.",
    primaryUsers: "Parents & Caregivers",
  },
  {
    id: "m03",
    name: "Teacher Academy",
    objectiveRef: "Objective 4",
    offlineCapable: true,
    description: "Continuous certification, micro-learning, peer coaching, and 5-tier career progression registry.",
    primaryUsers: "Teachers & Principals",
  },
  {
    id: "m04",
    name: "School Management",
    objectiveRef: "Objective 3",
    offlineCapable: true,
    description: "Smart School Dashboard tracking attendance, dropouts, nutrition, infrastructure, and finances.",
    primaryUsers: "School Directors",
  },
  {
    id: "m05",
    name: "Community Learning Hub",
    objectiveRef: "Objective 2",
    offlineCapable: true,
    description: "Solar-powered Fokontany neighborhood hub workspace for literacy, homework, AI access, and innovation labs.",
    primaryUsers: "Fokontany Communities",
  },
  {
    id: "m06",
    name: "Mentor Registry",
    objectiveRef: "Objective 1 & 2",
    offlineCapable: true,
    description: "Directory certifying retired teachers, craftsmen, farmers, doctors, engineers, entrepreneurs, and artists.",
    primaryUsers: "Community Mentors",
  },
  {
    id: "m07",
    name: "Curriculum & Competency Framework",
    objectiveRef: "Objective 3 & 6",
    offlineCapable: true,
    description: "National open competency graph connecting early stimulation, school subjects, values, and vocational crafts.",
    primaryUsers: "Curriculum Designers",
  },
  {
    id: "m08",
    name: "Digital Library",
    objectiveRef: "Cross-Cutting",
    offlineCapable: true,
    description: "Multilingual open repository in Malagasy, French, English, and local dialects cached at community hubs.",
    primaryUsers: "All Learners",
  },
  {
    id: "m09",
    name: "AI Tutor & Teacher Assistant",
    objectiveRef: "Objective 3 & 6",
    offlineCapable: false,
    description: "Dual-mode AI: pedagogical co-pilot for teachers and adaptive lifelong learning companion for citizens.",
    primaryUsers: "Teachers & Learners",
  },
  {
    id: "m10",
    name: "Assessment Engine",
    objectiveRef: "Objective 3",
    offlineCapable: true,
    description: "Formative competency checks, multilingual rubrics, and project portfolio verification tools.",
    primaryUsers: "Teachers & Examiners",
  },
  {
    id: "m11",
    name: "Skills Passport",
    objectiveRef: "Objective 6",
    offlineCapable: true,
    description: "Verifiable digital credentials recognizing formal, informal, community, professional, and volunteer mastery.",
    primaryUsers: "Youth & Workers",
  },
  {
    id: "m12",
    name: "Education Observatory",
    objectiveRef: "Objective 5",
    offlineCapable: false,
    description: "Real-time national dashboard and predictive analytics engine for dropout, shortage, and disaster prevention.",
    primaryUsers: "Policymakers",
  },
  {
    id: "m13",
    name: "Open Data Portal",
    objectiveRef: "Objective 5",
    offlineCapable: false,
    description: "Transparent, anonymized national education statistics accessible to citizens, journalists, and researchers.",
    primaryUsers: "General Public",
  },
  {
    id: "m14",
    name: "Scholarship & Opportunity Portal",
    objectiveRef: "Objective 6",
    offlineCapable: true,
    description: "Equitable matching of merit, community service, and need-based scholarships and apprenticeships.",
    primaryUsers: "Students & Youth",
  },
  {
    id: "m15",
    name: "Volunteer & Community Service Registry",
    objectiveRef: "Objective 1, 2 & 3",
    offlineCapable: true,
    description: "Verifies civic participation, family mentoring hours, and environmental stewardship projects.",
    primaryUsers: "Citizens & Schools",
  },
  {
    id: "m16",
    name: "Education Innovation Marketplace",
    objectiveRef: "Objective 2 & 4",
    offlineCapable: false,
    description: "Hosts Teacher Innovation Fund grants, Fokontany challenges, and national education research collaborations.",
    primaryUsers: "Innovators & Researchers",
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Phase I",
    horizon: "Years 1–3",
    headline: "Digital Foundation & Inclusive Pilots",
    deliverables: [
      "Establish federated HD-DPI core standards & Citizen Learning Passport",
      "Launch Parent Academy via mobile, SMS/voice, and community radio",
      "Equip pilot solar-powered Fokontany Community Learning Hubs",
      "Deploy Teacher AI Assistant & launch Digital Education Observatory",
    ],
    unescoLink: "Demonstrates offline-first inclusive AI access for marginalized communities.",
  },
  {
    phase: "Phase II",
    horizon: "Years 4–7",
    headline: "National Scale & Interoperable Systems",
    deliverables: [
      "Scale interoperable Smart School Dashboards nationwide",
      "Operationalize National Teacher Academy & 5-tier Career Path",
      "Connect Home Learning Passports seamlessly into Skills Passports",
      "Expand Community Knowledge Network & Local Innovation Challenges",
    ],
    unescoLink: "Validates teacher empowerment & multi-stakeholder governance at national scale.",
  },
  {
    phase: "Phase III",
    horizon: "Years 8–12",
    headline: "Lifelong AI Companions & Predictive Governance",
    deliverables: [
      "Roll out personal AI Learning Companions across regional dialects",
      "Activate full predictive analytics for disaster, dropout & staffing resilience",
      "Integrate Skills Passport directly with employment & local entrepreneurship",
      "Strengthen National Education Research Network evidence cycles",
    ],
    unescoLink: "Bridges AI-enhanced lifelong thinking with resilient public governance.",
  },
  {
    phase: "Phase IV",
    horizon: "Years 13–20",
    headline: "Madagascar as a Learning Society",
    deliverables: [
      "Universal birth-to-lifelong learning continuity for every citizen",
      "Full cross-sectoral synergy linking education with health, agriculture & climate",
      "Recognized community, traditional, and formal competencies across all regions",
      "Self-sustaining national culture of ethical, data-informed public service",
    ],
    unescoLink: "Establishes a replicable Global South reference model for HD-DPI.",
  },
];

export const COUNCIL_STAKEHOLDERS: { sector: string; role: string }[] = [
  { sector: "Ministry of National Education", role: "Primary & secondary curriculum, Smart School rollout, Teacher Academy" },
  { sector: "Higher Education & Research", role: "National Education Research Network & teacher college integration" },
  { sector: "Technical & Vocational Education (TVET)", role: "Skills Passport competency standards & apprenticeships" },
  { sector: "Public Health", role: "Birth-to-school Home Learning Passport vaccinations & nutrition" },
  { sector: "Youth & Sports", role: "Volunteer Service Registry, civic leadership & youth challenges" },
  { sector: "Digital Transformation", role: "Federated DPI interoperability, connectivity & open data standards" },
  { sector: "Culture & Heritage", role: "Malagasy language & regional dialect preservation, traditional knowledge" },
  { sector: "Local Government & Fokontany", role: "Community Learning Hub land, maintenance & local governance" },
  { sector: "Private Sector", role: "Solar hardware, low-cost devices, entrepreneurship & marketplace jobs" },
  { sector: "Civil Society", role: "Parent mentorship mobilization, accessibility & accountability audits" },
  { sector: "Faith-Based Organizations", role: "Trusted family outreach channels for Parent Academy delivery" },
  { sector: "Universities", role: "Predictive analytics validation, Malagasy NLP & pedagogy studies" },
  { sector: "Development Partners & UNESCO", role: "Co-financing, open standards exchange & South-South knowledge sharing" },
];

export const PARENT_CURRICULUM: ParentCurriculumModule[] = [
  {
    id: "pc-1",
    topic: "Child Development (0–5 Years) & Early Stimulation",
    ageStage: "0–5 Years",
    malagasyTitle: "Fanabeazana sy fampivelarana ny zaza vao teraka ka hatramin'ny 5 taona",
    frenchTitle: "Développement de la petite enfance et stimulation précoce",
    englishTitle: "Early Childhood Cognitive & Sensory Stimulation",
    smsDigest: "SMS #04: Miresaha sy mihira isan'andro amin'ny zanakao na dia mbola tsy miteny aza izy. Manampy ny atidohany hitombo izany.",
    radioPrompt: "15-min Radio Drama: How grandfather stories and naming everyday crops build vocabulary before age 3.",
    actionChecklist: [
      "Speak, sing, and name objects in Malagasy for 15 minutes daily",
      "Track motor & language milestones in the Home Learning Passport",
      "Ensure play with safe natural household materials",
    ],
  },
  {
    id: "pc-2",
    topic: "Nutrition & Preventive Health",
    ageStage: "0–12 Years",
    malagasyTitle: "Sakafo ara-pahasalamana sy fisorohana aretina",
    frenchTitle: "Nutrition équilibrée et santé préventive",
    englishTitle: "Balanced Household Nutrition & Vaccination Continuity",
    smsDigest: "SMS #09: Ny legioma maitso, voamaina ary voankazo eo an-toerana dia miaro ny zaza amin'ny tsy fanjarian-tsakafo sy manampy azy hifantoka any an-tsekoly.",
    radioPrompt: "Community Nurse Q&A: Preparing iron-rich local greens and recording immunization dates in the Passport.",
    actionChecklist: [
      "Combine local grains, legumes, and leafy greens in daily meals",
      "Verify routine immunization dates with Fokontany health worker",
      "Prepare clean drinking water before school departure",
    ],
  },
  {
    id: "pc-3",
    topic: "Positive Discipline & Emotional Intelligence",
    ageStage: "3–18 Years",
    malagasyTitle: "Fitaizana am-pitiavana sy fifehezana ny fihetseham-po",
    frenchTitle: "Discipline positive et intelligence émotionnelle",
    englishTitle: "Non-Violent Guidance & Emotional Regulation",
    smsDigest: "SMS #14: Rehefa tezitra ny ankizy, henoy aloha izy vao manitsy. Ny fifampiresahana tony dia manangana fahatokisan-tena.",
    radioPrompt: "Faith & Community Circle Guide: Replacing harsh punishment with clear expectations and restorative dialogue.",
    actionChecklist: [
      "Acknowledge the child's emotion before setting a firm boundary",
      "Establish predictable evening routines for rest and homework",
      "Practice weekly family listening circles",
    ],
  },
  {
    id: "pc-4",
    topic: "Reading Habits & Bilingual Curiosity",
    ageStage: "3–14 Years",
    malagasyTitle: "Fitiavana mamaky teny sy fahaizana fiteny maro",
    frenchTitle: "Habitudes de lecture et curiosité bilingue",
    englishTitle: "Daily Reading Routines & Mother-Tongue Literacy",
    smsDigest: "SMS #21: Manokàna 10 minitra isan-kariva hamakiana tantara na hifampizarana angano eo anivon'ny fianakaviana.",
    radioPrompt: "Storytime Broadcast: Read-along oral storytelling in regional dialects paired with Fokontany library lending.",
    actionChecklist: [
      "Borrow one illustrated book per week from the Fokontany Hub",
      "Ask open-ended 'why' and 'what happens next' questions",
      "Celebrate oral storytelling from elders alongside written books",
    ],
  },
  {
    id: "pc-5",
    topic: "Digital Parenting, Financial & Civic Stewardship",
    ageStage: "10–18 Years",
    malagasyTitle: "Fampiasana am-pahendrena ny nomerika, toe-karena ary olom-pirenena vanona",
    frenchTitle: "Parentalité numérique, responsabilité financière et civique",
    englishTitle: "Safe Digital Literacy, Household Budgeting & Civic Ethics",
    smsDigest: "SMS #33: Ampianaro ny tanora hanamarina vaovao alohan'ny hizara azy, sy hitantana tahiry kely ho an'ny tetikasam-pianarana.",
    radioPrompt: "Youth & Parent Workshop: Understanding AI tools honestly, saving for school tools, and environmental care.",
    actionChecklist: [
      "Set shared household rules for screen balance and source verification",
      "Involve adolescents in transparent family agricultural or craft budgeting",
      "Encourage participation in one Fokontany environmental service day",
    ],
  },
];

export const INITIAL_MENTORS: CommunityMentor[] = [
  {
    id: "cm-1",
    name: "Mme. Rasoanirina Voahangy",
    archetype: "Retired Teacher",
    fokontany: "Ambohimanga Rova",
    region: "Analamanga",
    specialty: "Early Malagasy & French literacy coaching, reading circles",
    languages: "Malagasy · Français",
    availability: "Tue & Thu afternoons",
  },
  {
    id: "cm-2",
    name: "M. Rakotoarisoa Jean-Claude",
    archetype: "Farmer",
    fokontany: "Antanifotsy Sud",
    region: "Vakinankaratra",
    specialty: "Gravity-fed micro-irrigation & soil conservation composting",
    languages: "Malagasy (Merina) · Français",
    availability: "Sat mornings",
  },
  {
    id: "cm-3",
    name: "Dr. Andriamanantena Hery",
    archetype: "Doctor",
    fokontany: "Tanambao V",
    region: "Atsinanana",
    specialty: "Maternal nutrition, first aid & adolescent health workshops",
    languages: "Malagasy (Betsimisaraka) · Français · English",
    availability: "Wed evenings",
  },
  {
    id: "cm-4",
    name: "Ing. Rabemananjara Tiana",
    archetype: "Engineer",
    fokontany: "Mahajanga Be",
    region: "Boeny",
    specialty: "Off-grid solar battery maintenance & community mesh Wi-Fi",
    languages: "Malagasy (Sakalava) · Français · English",
    availability: "Fri afternoons",
  },
  {
    id: "cm-5",
    name: "M. Randriamampionona Solo",
    archetype: "Craftsman",
    fokontany: "Ambositra Centre",
    region: "Amoron'i Mania",
    specialty: "Sustainable woodcraft joinery, geometric measurement & enterprise",
    languages: "Malagasy (Betsileo) · Français",
    availability: "Mon & Wed afternoons",
  },
  {
    id: "cm-6",
    name: "Mme. Raveloson Mireille",
    archetype: "Entrepreneur",
    fokontany: "Toliara I",
    region: "Atsimo-Andrefana",
    specialty: "Solar food drying, cooperative bookkeeping & ecotourism",
    languages: "Malagasy (Vezo/Mahafaly) · Français",
    availability: "Thu mornings",
  },
];

export const INITIAL_CHALLENGES: InnovationChallenge[] = [
  {
    id: "ic-1",
    domain: "Improve Irrigation",
    fokontany: "Antanifotsy Sud",
    title: "Solar-Assisted Drip Irrigation for School Nutrition Gardens",
    summary: "Youth & farmer mentors designing bamboo drip lines powered by a 12V hub battery to keep school vegetable plots productive in dry months.",
    teamsParticipating: 6,
    mentorLead: "M. Rakotoarisoa Jean-Claude",
  },
  {
    id: "ic-2",
    domain: "Reduce Waste",
    fokontany: "Tanambao V",
    title: "Market Organic Waste to Classroom Bio-Compost",
    summary: "Secondary student teams mapping organic market waste streams and producing nutrient-rich compost for community reforestation.",
    teamsParticipating: 4,
    mentorLead: "Dr. Andriamanantena Hery",
  },
  {
    id: "ic-3",
    domain: "Improve Schools",
    fokontany: "Mahajanga Be",
    title: "Cyclone-Resilient Solar Lighting & Offline Cache Box",
    summary: "Engineering students assembling sealed, solar-charged Raspberry/local-cache servers keeping textbooks available when grids fail.",
    teamsParticipating: 5,
    mentorLead: "Ing. Rabemananjara Tiana",
  },
  {
    id: "ic-4",
    domain: "Build Local Businesses",
    fokontany: "Toliara I",
    title: "Youth Solar-Dried Seaweed & Fruit Cooperative",
    summary: "Vocational learners building low-cost solar dehydrators and tracking unit economics through the Skills Passport finance track.",
    teamsParticipating: 7,
    mentorLead: "Mme. Raveloson Mireille",
  },
];

export const LEARNING_MARKETPLACE_COURSES: LearningCourse[] = [
  {
    id: "lc-1",
    domain: "Agriculture & Climate Adaptation",
    title: "Climate-Resilient Rice & Agroforestry Water Stewardship",
    format: "Offline Hub Video + Field Practicum",
    duration: "4 Weeks · 12 hrs",
    credentialName: "Community Agro-Stewardship Level 1",
    languages: "Malagasy · Français",
    enrolled: true,
  },
  {
    id: "lc-2",
    domain: "AI & Digital Skills",
    title: "Responsible AI Literacy & Critical Fact-Checking for Citizens",
    format: "Interactive Offline Module + Mentor Circle",
    duration: "3 Weeks · 8 hrs",
    credentialName: "Civic AI Fluency Badge",
    languages: "Malagasy · Français · English",
    enrolled: true,
  },
  {
    id: "lc-3",
    domain: "Business & Entrepreneurship",
    title: "Micro-Cooperative Accounting & Digital Savings Discipline",
    format: "Mobile + SMS Workbook",
    duration: "4 Weeks · 10 hrs",
    credentialName: "Fokontany Micro-Enterprise Certificate",
    languages: "Malagasy · Français",
    enrolled: false,
  },
  {
    id: "lc-4",
    domain: "Health & Family Care",
    title: "Community First Aid, Clean Water & Childhood Nutrition",
    format: "Fokontany Hub Workshop + Audio",
    duration: "2 Weeks · 6 hrs",
    credentialName: "Community Health Responder Credential",
    languages: "Malagasy · Local Dialects",
    enrolled: false,
  },
  {
    id: "lc-5",
    domain: "Traditional Knowledge & Leadership",
    title: "Fihavanana Civic Mediation & Local Heritage Documentation",
    format: "Intergenerational Audio Archive",
    duration: "3 Weeks · 9 hrs",
    credentialName: "Civic Heritage & Leadership Steward",
    languages: "Malagasy · Français · English",
    enrolled: false,
  },
];

export const REGIONAL_OBSERVATORY_DATA: RegionalObservatoryRow[] = [
  {
    region: "Analamanga",
    fokontanyHubsTarget: 420,
    solarOfflineReadyPct: 68,
    enrollmentPct: 91.4,
    baselineDropoutRiskPct: 7.2,
    genderParityIndex: 1.01,
    teacherDeploymentPct: 93.0,
    budgetExecutionPct: 88.5,
  },
  {
    region: "Vakinankaratra",
    fokontanyHubsTarget: 310,
    solarOfflineReadyPct: 54,
    enrollmentPct: 84.2,
    baselineDropoutRiskPct: 12.8,
    genderParityIndex: 0.97,
    teacherDeploymentPct: 81.4,
    budgetExecutionPct: 82.0,
  },
  {
    region: "Atsinanana",
    fokontanyHubsTarget: 265,
    solarOfflineReadyPct: 49,
    enrollmentPct: 82.7,
    baselineDropoutRiskPct: 14.5,
    genderParityIndex: 0.96,
    teacherDeploymentPct: 79.2,
    budgetExecutionPct: 79.4,
  },
  {
    region: "Haute Matsiatra",
    fokontanyHubsTarget: 240,
    solarOfflineReadyPct: 51,
    enrollmentPct: 83.9,
    baselineDropoutRiskPct: 13.1,
    genderParityIndex: 0.98,
    teacherDeploymentPct: 80.5,
    budgetExecutionPct: 81.2,
  },
  {
    region: "Boeny",
    fokontanyHubsTarget: 195,
    solarOfflineReadyPct: 44,
    enrollmentPct: 78.6,
    baselineDropoutRiskPct: 16.4,
    genderParityIndex: 0.94,
    teacherDeploymentPct: 75.8,
    budgetExecutionPct: 76.9,
  },
  {
    region: "Atsimo-Andrefana",
    fokontanyHubsTarget: 280,
    solarOfflineReadyPct: 38,
    enrollmentPct: 69.5,
    baselineDropoutRiskPct: 22.9,
    genderParityIndex: 0.91,
    teacherDeploymentPct: 68.4,
    budgetExecutionPct: 74.1,
  },
  {
    region: "Diana",
    fokontanyHubsTarget: 160,
    solarOfflineReadyPct: 57,
    enrollmentPct: 86.1,
    baselineDropoutRiskPct: 11.0,
    genderParityIndex: 0.99,
    teacherDeploymentPct: 84.6,
    budgetExecutionPct: 84.0,
  },
  {
    region: "Sava",
    fokontanyHubsTarget: 210,
    solarOfflineReadyPct: 46,
    enrollmentPct: 81.0,
    baselineDropoutRiskPct: 15.2,
    genderParityIndex: 0.95,
    teacherDeploymentPct: 77.9,
    budgetExecutionPct: 78.3,
  },
];
