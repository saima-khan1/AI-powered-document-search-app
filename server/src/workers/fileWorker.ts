import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { QdrantVectorStore } from "@langchain/qdrant";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import * as dotenv from "dotenv";

dotenv.config();

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

    const embeddings = new HuggingFaceTransformersEmbeddings({
      model: "Xenova/all-MiniLM-L6-v2",
    });

    await QdrantVectorStore.fromDocuments(splitDocs, embeddings, {
      url: "http://localhost:6333",
      collectionName: "pdf_vectors",
    });

    console.log("✅ Stored embeddings in Qdrant");
  },
  { connection: { host: "localhost", port: 6379 }, concurrency: 100 }
);

export default worker;
