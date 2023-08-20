import express from "express";
import "./db/mongoose.js";
import taskRouter from "./routers/task.js";
import userRouter from "./routers/user.js";

const app = express();
const maintenanceMode = false;

app.use((req, res, next) => {
  if (!maintenanceMode) {
    next();
  } else {
    res.status(503);
    res.send("The server is temporarily down, please try again later");
  }
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export default app;
