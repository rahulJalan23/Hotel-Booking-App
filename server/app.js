import express from "express";
const app = express();
import { MONGODB_URI } from "./utils/config";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
const morgan = require("morgan");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("There is an error with database Connection");
  });
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("I am the best");
});
export default app;
