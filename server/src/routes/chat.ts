import express from "express";
import OpenAI from "openai";
import { getExistingVectorStore } from "../services/vectorService";
import { greetings, smallTalkResponses } from "../utils/greetings";

const router = express.Router();

const client = new OpenAI({
  apiKey: "dummy",
  baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

router.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;
    const normalized = query.toLowerCase().trim();

    if (greetings.includes(normalized)) {
      return res.json({
        answer: "Hello! How can I help you with the document?",
        docs: [],
      });
    }

    if (smallTalkResponses[normalized]) {
      return res.json({
        answer: smallTalkResponses[normalized],
        docs: [],
      });
    }

    const vectorStore = await getExistingVectorStore();
    const retriever = vectorStore.asRetriever({
      k: 4,
    });

    const result = await retriever.invoke(query);

    const cleanedContext = result
      .map((doc) => doc.pageContent)
      .join("\n\n---\n\n");

    const SYSTEM_PROMPT = `You are an AI assistant that answers questions strictly based on the content of the uploaded document.
    Follow these rules:
    - Use ONLY the information provided in the document context.
    - If the answer is not found in the document, respond with "The document does not provide that information."
    - Answer concisely and clearly, using bullet points or short paragraphs.
    - Do not include external knowledge, assumptions, or examples unless explicitly stated in the document.
    - If the question refers to a problem or topic, extract the corresponding solution, explanation, or relevant section directly from the text.

    Your goal: provide accurate, context-grounded, and concise answers about the uploaded document.
  Context:${cleanedContext}
  `;

    const response = await client.chat.completions.create({
      model: "ai/gemma3:270M-F16",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `CONTEXT:\n${cleanedContext}\n\nQUESTION:\n${query}`,
        },
      ],
      temperature: 0.0,
      max_tokens: 300,
    });

    res.json({
      answer: response.choices[0].message.content,
      docs: result,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
