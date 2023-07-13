import express from "express";
import cors from "cors";
import morgan from "morgan";
import { globalErrorHandler } from "./utils/error.js";

const creatApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(globalErrorHandler);

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  return app;
};

export default creatApp;
