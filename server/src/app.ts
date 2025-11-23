import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload";
import chatRoutes from "./routes/chat";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", uploadRoutes);
app.use("/", chatRoutes);

export default app;
