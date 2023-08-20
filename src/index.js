import app from "./app.js";
const port = process.env.PORT;
const maintenanceMode = false;

app.use((req, res, next) => {
  if (!maintenanceMode) {
    next();
  } else {
    res.status(503);
    res.send("The server is temporarily down, please try again later");
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
