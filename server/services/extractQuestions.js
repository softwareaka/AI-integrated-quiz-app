import OpenAI from "openai";
import { sampleQuestions } from "../data/sampleQuestions.js";

const SYSTEM_PROMPT = `You are an expert teacher and exam evaluator.

Analyze the provided text and extract all multiple-choice questions.

For each question:
1. Extract the question text.
2. Extract all options exactly as written.
3. Determine the most correct answer (must match one option exactly).
4. Explain in detail why the correct answer is correct.
5. Explain why each incorrect option is incorrect.

Return ONLY valid JSON with this exact shape:
{
  "questions": [
    {
      "question": "",
      "options": [],
      "correctAnswer": "",
      "correctExplanation": "",
      "incorrectExplanations": {
        "option1": "",
        "option2": ""
      }
    }
  ]
}

Keys in incorrectExplanations must be the exact incorrect option strings as values, not "option1" labels.
If no questions are found, return { "questions": [] }.`;

function parseJsonResponse(content) {
  const trimmed = content.trim();
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI did not return valid JSON.");
  const parsed = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(parsed.questions)) {
    throw new Error("Invalid response: missing questions array.");
  }
  return parsed.questions;
}

function normalizeQuestion(q) {
  const incorrectExplanations = q.incorrectExplanations ?? {};
  const normalizedIncorrect = {};

  for (const [key, value] of Object.entries(incorrectExplanations)) {
    const optionKey = q.options?.includes(key) ? key : q.options?.find((o) => o === key) ?? key;
    if (optionKey !== q.correctAnswer) {
      normalizedIncorrect[optionKey] = value;
    }
  }

  for (const opt of q.options ?? []) {
    if (opt !== q.correctAnswer && !normalizedIncorrect[opt]) {
      normalizedIncorrect[opt] = "This option is not the best answer for this question.";
    }
  }

  return {
    question: q.question ?? "",
    options: q.options ?? [],
    correctAnswer: q.correctAnswer ?? "",
    correctExplanation: q.correctExplanation ?? "",
    incorrectExplanations: normalizedIncorrect,
  };
}

export async function extractQuestionsFromText(text) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set — using sample questions for demo.");
    return sampleQuestions;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `PDF CONTENT:\n\n${text.slice(0, 120000)}` },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from AI.");

  const questions = parseJsonResponse(content).map(normalizeQuestion);

  if (questions.length === 0) {
    throw new Error("No multiple-choice questions found in the provided content.");
  }

  return questions;
}
