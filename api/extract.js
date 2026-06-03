import pdfParse from "pdf-parse";
import { extractQuestionsFromText } from "../server/services/extractQuestions.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let text = "";

    if (typeof req.body?.text === "string") {
      text = req.body.text.trim();
    } else if (typeof req.body?.pdfBase64 === "string") {
      const buffer = Buffer.from(req.body.pdfBase64, "base64");
      const parsed = await pdfParse(buffer);
      text = parsed.text?.trim() ?? "";
    }

    if (!text) {
      return res.status(400).json({ error: "Provide text or a PDF file." });
    }

    const questions = await extractQuestionsFromText(text);
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to extract questions.",
    });
  }
}
