import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export const loadAndSplitPDF = async (
  filePath: string
): Promise<Document[]> => {
  const loader = new PDFLoader(filePath);
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
        new Document({ pageContent: chunk, metadata: { source: filePath } })
      )
    );
  }

  return splitDocs;
};
