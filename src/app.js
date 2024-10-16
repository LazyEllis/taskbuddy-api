const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects/:projectId/tasks", taskRoutes);

app.use(errorHandler);

module.exports = app;
