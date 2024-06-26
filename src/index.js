import { connectToDB } from "./mongodb/db.js";
import express from "express";
import dataRouter from "./routes/route.js";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDB();
app.get("/", (_, res) => {
  return res.send("<h1>Working</h1>");
});

app.use("/api/data", dataRouter);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running is port ${PORT}`);
});
