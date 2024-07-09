require("dotenv").config();
const connectToDB = require("./mongodb/db.js");
const express = require("express");

// Routers
const dataRouter = require("./routes/dataRoute.js");
const analyticsRouter = require("./routes/analyticsRoute.js");
const authRouter = require("./routes/authRoute.js");
const userRouter = require("./routes/users.js");
const editUserRouter = require("./routes/editUser.js");
const tableRouter = require("./routes/tableRoute.js");
const documentSessionRouter = require("./routes/documentRoute.js");

//Middlewares
const { checkToken } = require("./middleware/checkToken.js");
const { checkAdmin } = require("./middleware/checkAdmin.js");

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
app.use("/api/user", editUserRouter);
app.use("/api/data", dataRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/users", userRouter);
app.use("/table", tableRouter);
app.use("/document", documentSessionRouter);

// Protected Route
app.use("/v1/user", checkToken, checkAdmin, editUserRouter);
app.use("/v1/data", checkToken, checkAdmin, dataRouter);
app.use("/v1/analytics", checkToken, checkAdmin, analyticsRouter);
app.use("/v1/users", checkToken, checkAdmin, userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running is port ${PORT}`);
});
