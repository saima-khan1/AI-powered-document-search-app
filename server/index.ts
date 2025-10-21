import express from "express";
import cors from "cors";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from backend ");
});

// app.post("/uploads/pdf", upload.single("pdf"), (req, res) => {
//   if (!req.pdf) {
//     res.status(400).send("No file uploaded.");
//     res.send(`File uploaded: ${req.pdf.filename}`);
//   }
//   //   res.send();
// });
// app.get("/upload", (req, res) => {
//   res.status(200).send("uploaded file");
// });
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.send(`File uploaded: ${req.file.filename}`);
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
