import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const MODEL_NAME = "gemini-4-hydrogen";

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const err = new Error("GEMINI_API_KEY is not configured in environment secrets.");
    (err as Error & { statusCode?: number }).statusCode = 400;
    throw err;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function handleGeminiError(res: Response, error: unknown): void {
  const err = error as { status?: number; statusCode?: number; message?: string };
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Upstream AI service error.";

  if (status === 403) {
    res.status(403).json({
      error: "API key permission denied. Please verify your GEMINI_API_KEY in Settings > Secrets.",
    });
    return;
  }
  if (status === 429) {
    res.status(429).json({
      error: "Rate limit or quota reached. Please wait a moment and try again.",
    });
    return;
  }
  if (status === 400) {
    res.status(400).json({ error: message });
    return;
  }
  res.status(500).json({ error: message });
}

const SYSTEM_GROUNDING = `You are the technical and policy co-architect for NdaY'Fanabeazana, the Human Development Digital Public Infrastructure (HD-DPI) Marshall Plan authored by Individual Enterprise NdaY' for Madagascar.
Core philosophy: "It takes a nation to educate a child, and an educated child to transform a nation."
Core pillars:
1. Rebuild the Foundation: Family Education (Parent Academy 0-18 via mobile, SMS/voice, radio, TV, faith & community centers; Home Learning Passport from birth; Family Mentorship).
2. Build Learning Communities (Fokontany Community Learning Hubs, Community Knowledge Network of retired teachers, craftsmen, farmers, doctors, engineers, entrepreneurs, artists; Local Innovation Challenges).
3. Reinvent Schools (Innovation centers not exam factories; Teacher AI Assistant that supports—never replaces—teachers; Smart School Dashboard; Holistic Student Portfolio).
4. Transform the Teaching Profession (National Teacher Academy, 5-tier career path Teacher -> Senior -> Mentor -> Master -> Education Leader, Teacher Innovation Fund, Teacher Wellbeing).
5. Modernize Educational Governance (Digital Education Observatory, Predictive Analytics for dropout/teacher shortages/disasters, Open Education Data).
6. Lifelong Learning for All (National Learning Marketplace, Verified Skills Passport for formal/informal/volunteer learning, Adaptive AI Learning Companion).
Cross-cutting: Digital Inclusion (solar-powered hubs, offline-first apps, 2G/SMS, accessibility), Language Preservation (Malagasy, French, English, local dialects), Values Education, Research & Innovation.
Governance: National Human Development Council (13 cross-sectoral ministries & civil/private/faith/university partners).
Roadmap: Phase I (Years 1-3), Phase II (Years 4-7), Phase III (Years 8-12), Phase IV (Years 13-20).`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true, service: "nday-fanabeazana-hd-dpi" });
  });

  app.post("/api/ai/teacher-assist", async (req: Request, res: Response) => {
    try {
      const { taskType, subject, gradeLevel, language, contextNote, topic } = req.body as {
        taskType?: string;
        subject?: string;
        gradeLevel?: string;
        language?: string;
        contextNote?: string;
        topic?: string;
      };

      if (!topic || !subject) {
        res.status(400).json({ error: "Subject and topic are required." });
        return;
      }

      const ai = getGeminiClient();
      const prompt = `Generate a teacher-centered pedagogical package under NdaY'Fanabeazana Strategic Objective 3 (Reinvent Schools — AI supports, never replaces, the teacher).
Task Type: ${taskType || "Lesson Plan"}
Subject: ${subject}
Grade Level: ${gradeLevel || "Primary Cycle"}
Target Language / Bilingual Mode: ${language || "Malagasy & French"}
Topic: ${topic}
Classroom & Offline Context: ${contextNote || "Solar-powered rural Fokontany school with limited connectivity and local natural materials."}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: `${SYSTEM_GROUNDING}\nRespond concisely in valid JSON matching the schema. Write practical, locally grounded content suitable for Malagasy classrooms with zero-connectivity fallback materials.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              teacherRoleSummary: { type: Type.STRING },
              learningObjectives: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              lowResourceMaterials: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              classroomSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    activity: { type: Type.STRING },
                  },
                },
              },
              multilingualVocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    malagasy: { type: Type.STRING },
                    french: { type: Type.STRING },
                    english: { type: Type.STRING },
                  },
                },
              },
              formativeCheck: { type: Type.STRING },
              valuesIntegration: { type: Type.STRING },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (error) {
      handleGeminiError(res, error);
    }
  });

  app.post("/api/ai/unesco-draft", async (req: Request, res: Response) => {
    try {
      const { pillar, question, responseLanguage, audienceFocus } = req.body as {
        pillar?: string;
        question?: string;
        responseLanguage?: string;
        audienceFocus?: string;
      };

      if (!question) {
        res.status(400).json({ error: "A UNESCO Call for Proposals question is required." });
        return;
      }

      const ai = getGeminiClient();
      const prompt = `Draft an institutional submission response for the UNESCO Digital Learning Week 2027 Call for Proposals ("Education in the age of AI: Thinking, Empowering, Governing and facilitating inclusive access to technology-driven learning platforms for marginalized communities") on behalf of Individual Enterprise NdaY' for the NdaY'Fanabeazana HD-DPI project.

UNESCO Sub-Theme Pillar: ${pillar || "All 4 Pillars"}
Proposal Question to Answer: ${question}
Output Language: ${responseLanguage || "English"}
Target Reviewer Focus: ${audienceFocus || "UNESCO Policy & Technical Selection Committee"}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: `${SYSTEM_GROUNDING}\nProduce an authoritative, evidence-grounded policy and implementation response in valid JSON. Reference concrete NdaY'Fanabeazana mechanisms (Parent Academy, Home Learning Passport, Fokontany Hubs, Teacher AI Assistant, National Human Development Council, 20-year phases) without exaggerating or inventing external statistics.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              executiveAnswer: { type: Type.STRING },
              marshallPlanMechanisms: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    moduleName: { type: Type.STRING },
                    concreteAction: { type: Type.STRING },
                    inclusionGuarantee: { type: Type.STRING },
                  },
                },
              },
              governanceAndSafeguards: { type: Type.STRING },
              phasedMilestones: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (error) {
      handleGeminiError(res, error);
    }
  });

  app.post("/api/ai/learning-companion", async (req: Request, res: Response) => {
    try {
      const { learnerAge, profession, language, goal, question } = req.body as {
        learnerAge?: string;
        profession?: string;
        language?: string;
        goal?: string;
        question?: string;
      };

      if (!question) {
        res.status(400).json({ error: "A learning question or topic is required." });
        return;
      }

      const ai = getGeminiClient();
      const prompt = `Act as the NdaY'Fanabeazana AI Learning Companion (Strategic Objective 6: Lifelong Learning for All).
Learner Profile:
- Age Group: ${learnerAge || "Young Adult (18-30)"}
- Occupation / Context: ${profession || "Rural Agribusiness Apprentice"}
- Preferred Language: ${language || "Malagasy & French"}
- Career / Community Goal: ${goal || "Climate-resilient irrigation & local enterprise"}
Learner Inquiry: ${question}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: `${SYSTEM_GROUNDING}\nProvide practical, encouraging, culturally grounded guidance in valid JSON. Suggest concrete micro-modules from the National Learning Marketplace, community mentor archetypes to consult at the nearest Fokontany Hub, and verifiable Skills Passport competencies.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              guidanceSummary: { type: Type.STRING },
              actionableSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendedHubMentor: { type: Type.STRING },
              marketplaceTrack: { type: Type.STRING },
              skillsPassportCredential: { type: Type.STRING },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (error) {
      handleGeminiError(res, error);
    }
  });

  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NdaY'Fanabeazana HD-DPI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
