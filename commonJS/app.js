const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { globalErrorHandler } = require("./utils/error");

const createApp = () => {
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

module.exports = { createApp };
