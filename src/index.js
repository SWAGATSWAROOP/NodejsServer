require("dotenv").config();
const connectToDB = require("./mongodb/db.js");
const express = require("express");

// Routers
const dataRouter = require("./routes/dataRoute.js");
const analyticsRouter = require("./routes/analyticsRoute.js");
const authRouter = require("./routes/authRoute.js");
const userRouter = require("./routes/getUsers.js");
const editUserRouter = require("./routes/editUser.js");

//Middlewares
const { checkToken } = require("./middleware/checkToken.js");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.get("/", (_, res) => {
  return res.send("<h1>Working</h1>");
});

app.use("/home", (_, res) => {
  return res.send("Working");
});

// Unprotected Routes
app.use("/auth", authRouter);

// Protected Route
app.use("/api/user", checkToken, editUserRouter);
app.use("/api/data", checkToken, dataRouter);
app.use("/api/analytics", checkToken, analyticsRouter);
app.use("/users", checkToken, userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running is port ${PORT}`);
});
