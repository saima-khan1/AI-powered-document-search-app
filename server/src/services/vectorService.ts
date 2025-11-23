import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";

export const createVectorStore = async (documents: Document[]) => {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });

  return QdrantVectorStore.fromDocuments(documents, embeddings, {
    url: "http://localhost:6333",
    collectionName: "pdf_vectors",
  });
};

export const getExistingVectorStore = async () => {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });
  return QdrantVectorStore.fromExistingCollection(embeddings, {
    url: "http://localhost:6333",
    collectionName: "pdf_vectors",
  });
};
