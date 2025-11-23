import express from "express";
import OpenAI from "openai";
import { getExistingVectorStore } from "../services/vectorService";
import { greetings, smallTalkResponses } from "../utils/greetings";

const router = express.Router();

const client = new OpenAI({
  apiKey: "123",
  baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

router.post("/chat", async (req, res) => {
  const { query } = req.body;
  const normalized = query.toLowerCase().trim();

  if (greetings.includes(normalized)) {
    return res.json({
      answer: "Hello! How can I help you with the document?",
      docs: [],
    });
  }

  if (smallTalkResponses[normalized]) {
    return res.json({ answer: smallTalkResponses[normalized], docs: [] });
  }

  const vectorStore = await getExistingVectorStore();
  const retriever = vectorStore.asRetriever();
  const result = await retriever.invoke(query);

  const cleanedContext = result
    .map((doc) => doc.pageContent)
    .join("\n\n---\n\n");

  const SYSTEM_PROMPT = `You are an AI assistant that answers questions strictly based on the content of the uploaded document.
  Follow these rules:
  - Use ONLY the information provided in the document context.
  - If the answer is not found in the document, respond with "The document does not provide that information."
  - Answer concisely and clearly, using bullet points or short paragraphs.
  Context:${cleanedContext}`;

  const response = await client.chat.completions.create({
    model: "ai/gemma3:270M-F16",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
    temperature: 0.2,
    max_tokens: 300,
  });

  res.json({ answer: response.choices[0].message.content, docs: result });
});

export default router;
