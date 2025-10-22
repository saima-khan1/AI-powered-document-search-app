import { Worker } from "bullmq";

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log(`Job:`, job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
    concurrency: 100,
  }
);
