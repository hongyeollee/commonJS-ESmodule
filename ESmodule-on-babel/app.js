import express from "express";
import cors from "cors";
import morgan from "morgan";
import { globalErrorHandler } from "./utils/error.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const creatApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(router);

  app.use(globalErrorHandler);

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  return app;
};

export default creatApp;
