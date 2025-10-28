import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { QdrantVectorStore } from "@langchain/qdrant";

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

app.get("/chat", async (req, res) => {
  const userQuery = "What are Saima Khan's main skills?";
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
  const result = await retrivever.invoke(userQuery);
  return res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
