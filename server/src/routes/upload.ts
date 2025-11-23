import express from "express";
import multer from "multer";
import { fileUploadQueue } from "../queue";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  await fileUploadQueue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      path: req.file.path,
      destination: req.file.destination,
    })
  );

  res.json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
  });
});

export default router;
