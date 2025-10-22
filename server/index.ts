import express from "express";
import cors from "cors";
import multer from "multer";

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

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
