const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const reportJsonSchema = {
  type: "object",

  properties: {
    score: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },

    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          intention: {
            type: "string",
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "intention", "answer"],
        additionalProperties: false,
      },
    },

    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          intention: {
            type: "string",
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "intention", "answer"],
        additionalProperties: false,
      },
    },

    skillsGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
          },
          importance: {
            type: "string",
            enum: ["low", "medium", "high"],
          },
        },
        required: ["skill", "importance"],
        additionalProperties: false,
      },
    },

    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "number",
          },
          focus: {
            type: "string",
          },
          tasks: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["day", "focus", "tasks"],
        additionalProperties: false,
      },
    },

    feedback: {
      type: "string",
    },

    suggestions: {
      type: "string",
    },
  },

  required: [
    "score",
    "technicalQuestions",
    "behavioralQuestions",
    "skillsGaps",
    "preparationPlan",
    "feedback",
    "suggestions",
  ],

  additionalProperties: false,
};

async function generateReport({ resume, selfDescription, jobDescription }) {
  const systemInstruction = `You are an expert technical recruiter and interview coach.
Your task is to analyze a candidate's Resume and Self Description against a Job Description to generate a comprehensive, deeply analytical Interview Report.

CRITICAL INSTRUCTIONS:
- Be brutally honest about skill gaps. If the job description requires 3 years of Kubernetes and the candidate has none, that is a 'high' severity gap.
- Tailor the questions. Do not give generic JavaScript or coding questions; look at exactly what this company asks for and what this candidate might struggle with.
- The preparation plan must directly address the identified skill gaps.`;

  const prompt = `Please analyze the following candidate data against the target job requirements and output the report matching the requested JSON schema.

[TARGET JOB DESCRIPTION]
${jobDescription}

[CANDIDATE RESUME]
${resume}

[CANDIDATE SELF DESCRIPTION / CONTEXT]
${selfDescription || "No additional context provided by the candidate."}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseJsonSchema: reportJsonSchema,
        temperature: 0.3,
      },
    });
    const result = JSON.parse(response.text);
    console.log(response.text);
    return result;
  } catch (error) {
    console.error("Failed to generate or parse interview report:", error);
    throw error;
  }
}

module.exports = {generateReport};