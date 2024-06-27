require("dotenv").config()
const connectToDB = require("./mongodb/db.js");
const express = require("express");
const dataRouter = require("./routes/route.js");
const cors = require("cors");

const app = express();
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
