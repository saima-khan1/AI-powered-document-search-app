🧠 AI-Powered Document Search App

A powerful Retrieval-Augmented Generation (RAG) platform that allows users to upload documents (PDFs) and ask natural-language questions.
The system retrieves the most relevant text chunks using Qdrant Vector Database and generates accurate answers using a local LLM (Gemma 3 270M F16) running inside Docker with llama.cpp Model Runner.

This ensures privacy, zero external API calls, and fully local inference.

🚀 Features

📄 Upload PDF documents

🔍 Semantic search with Qdrant vector DB

🧠 Local LLM-powered responses using Gemma 3 (270M F16)

⚡ High-speed vector search + embeddings

🧩 Automatic text extraction, chunking & embedding using LangChain

🧠 RAG pipeline fully powered by LangChain retrievers, loaders & embeddings

📨 Background job processing using BullMQ

⚡ Valkey used for queue storage

🐳 Fully containerized with Docker

🎛️ Local inference using llama.cpp Model Runner

🏗️ Tech Stack
Backend

Node.js (TypeScript)

Express.js

LangChain (@langchain/core, @langchain/community)

Qdrant (local vector DB)

Valkey (in-memory store)

BullMQ (job queues)

Multer for file uploads

PDF Loader

Docker + llama.cpp Model Runner (LOCAL LLM)

Frontend

Next.js

TypeScript

File uploader + chat UI

TailwindCSS & shadcn/ui

AI Stack

| Component                           | Used For                               |
| ----------------------------------- | -------------------------------------- |
| **Gemma 3 270M F16 (Local LLM)**    | Final answer generation                |
| **llama.cpp Model Runner (Docker)** | Running local model inference          |
| **LangChain**                       | Embeddings, retrievers, RAG pipeline   |
| **Qdrant**                          | Storing embeddings & similarity search |

📦 Docker Setup

You use Docker to run:

✔ Valkey (Redis alternative for BullMQ)
✔ Qdrant (Vector database)
✔ llama.cpp Model-Runner (Local Gemma 3 LLM)

⚙️ How It Works (RAG Pipeline)

1. Upload Document

User uploads a PDF → sent to backend → saved locally → added to BullMQ queue.

2. BullMQ Worker (Background Processor)

The worker:

Extracts text from the PDF

Splits text into chunks

Creates embeddings (LangChain)

Stores vectors in Qdrant

Saves metadata like filename, chunk text, page numbers

3. User Asks a Question

Frontend sends a query to backend /ask endpoint.

4. Retrieving Relevant Context

LangChain uses:

Qdrant vector store

Maximum similarity score

Fetches top relevant chunks

5. Passing Everything to the Local LLM

Your backend sends:

user question

retrieved document chunks

instructions

…to the local Gemma 3 model running in Docker.

6. Final Answer

The local LLM returns an answer based only on document content.

If no relevant info is found:

"The document does not provide that information."

🛠️ Installation & Setup

1. Clone repo
   git clone https://github.com/saima-khan1/AI-powered-document-search-app.git
   cd AI-powered-document-search-app

2. Backend Setup
   cd server
   npm install

Add a .env file:

QDRANT_URL=http://localhost:6333
VALKEY_HOST=localhost
VALKEY_PORT=6379
LLM_API_URL=http://localhost:8000/completion

Start backend:

npm run dev

Start BullMQ worker:

npm run worker

3. Frontend Setup
   cd ../client
   npm install
   npm run dev

🖥️ Example Usage

Upload a PDF

Ask any question

System retrieves top chunks

Gemma LLM generates a precise answer

No internet — everything runs locally

🔮 Future Enhancements

Multi-file search

Embedding refactor for multiple models

Support PDF + TXT

📜 License

MIT License
