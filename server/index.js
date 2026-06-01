import "dotenv/config";
import cors from "cors";
import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { extractQuestionsFromText } from "./services/extractQuestions.js";
import { sampleQuestions } from "./data/sampleQuestions.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.get("/api/sample", (_req, res) => {
  res.json({ questions: sampleQuestions });
});

app.post("/api/extract", upload.single("pdf"), async (req, res) => {
  try {
    let text = "";

    if (req.file) {
      const parsed = await pdfParse(req.file.buffer);
      text = parsed.text?.trim() ?? "";
    } else if (typeof req.body?.text === "string") {
      text = req.body.text.trim();
    }

    if (!text) {
      return res.status(400).json({ error: "Provide a PDF file or text content." });
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
