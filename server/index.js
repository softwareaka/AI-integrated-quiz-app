import "dotenv/config";
import cors from "cors";
import express from "express";
import pdfParse from "pdf-parse";
import { extractQuestionsFromText } from "./services/extractQuestions.js";
import { sampleQuestions } from "./data/sampleQuestions.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "12mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.get("/api/sample", (_req, res) => {
  res.json({ questions: sampleQuestions });
});

app.post("/api/extract", async (req, res) => {
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
    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to extract questions.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Quiz API running on http://localhost:${PORT}`);
});
