import express from "express";
import cors from "cors";

const app = express();
const PORT = 3003;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend ");
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
