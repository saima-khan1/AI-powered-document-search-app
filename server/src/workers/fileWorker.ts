import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { QdrantVectorStore } from "@langchain/qdrant";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import * as dotenv from "dotenv";

dotenv.config();
console.log("🚀 Worker ready...");

const embeddingModel = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log(`Processing job:`, job.data);
    const data = JSON.parse(job.data);

    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({
      chunkSize: 700,
      chunkOverlap: 0,
    });
    const splitDocs: Document[] = [];

    for (const doc of docs) {
      const chunks = await splitter.splitText(doc.pageContent);
      chunks.forEach((chunk) =>
        splitDocs.push(
          new Document({ pageContent: chunk, metadata: { source: data.path } })
        )
      );
    }

    console.log(`✅ Created ${splitDocs.length} chunks`);

    // const embeddings = new HuggingFaceTransformersEmbeddings({
    //   model: "Xenova/all-MiniLM-L6-v2",
    // });

    const vectorStore = new QdrantVectorStore(embeddingModel, {
      url: "http://localhost:6333",
      collectionName: "pdf_vectors",
    });
    const batchSize = 30;

    console.log("⏳ Embedding and storing chunks...");

    for (let i = 0; i < splitDocs.length; i += batchSize) {
      const batch = splitDocs.slice(i, i + batchSize);
      await vectorStore.addDocuments(batch);
      console.log(`✔️ Stored ${i + batch.length}/${splitDocs.length}`);
    }

    console.log("🎉 All chunks stored in Qdrant!");
  },

  {
    connection: { host: "localhost", port: 6379 },
    concurrency: 1,
    lockDuration: 600000,
  }
);

export default worker;
