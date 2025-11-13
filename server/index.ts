import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "123",
  baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from backend ");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );

  res.json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
  });
});

app.post("/chat", async (req, res) => {
  const { query } = req.body;
  const model = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(model, {
    url: "http://localhost:6333",

    collectionName: "pdf_vectors",
  });
  const retrivever = vectorStore.asRetriever({
    k: 2,
  });
  const result = await retrivever.invoke(query);
  //   const SYSTEM_PROMPT = `You are an AI assistant that answers questions strictly based on the content of the uploaded document.
  // Follow these rules:
  // - Use ONLY the information provided in the document context.
  // - If the answer is not found in the document, respond with "The document does not provide that information."
  // - Answer concisely and clearly, using bullet points or short paragraphs.
  // - Do not include external knowledge, assumptions, or examples unless explicitly stated in the document.
  // - If the question refers to a problem or topic, extract the corresponding solution, explanation, or relevant section directly from the text.

  // Your goal: provide accurate, context-grounded, and concise answers about the uploaded document.
  // Context:${JSON.stringify(result)}`;

  const context = result.map((d) => d.pageContent).join("\n");
  const response = await client.chat.completions.create({
    model: "ai/gemma3:270M-F16",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Use the following context to answer:\n${context}\n\nQuestion: ${query}`,
      },
    ],
    max_tokens: 300,
  });

  res.json({
    answer: response.choices[0].message.content,
    docs: result,
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
