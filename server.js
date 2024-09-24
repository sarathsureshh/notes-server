import express, { Router } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { initiateDb } from "./src/utils/mongoUtils.js";
import { notesServices } from "./src/services/notesServices.js";
import { authServices } from "./src/services/authService.js";

const app = express();
const routePath = Router();
const envPort = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      `Status: ${tokens.status(req, res)}`,
      `Response time: ${tokens["response-time"](req, res)} ms`,
      `Client IP: ${tokens["remote-addr"](req, res)}`,
      `User-agent: ${tokens["user-agent"](req, res)}`,
      `Content length: ${tokens.res(req, res, "content-length") || 0} bytes`,
    ].join(" | ");
  })
);

authServices(routePath);
notesServices(routePath);

app.use("/services", routePath);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "An internal server error occurred.",
    error: err.message,
  });
});

const startServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      initiateDb((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const server = app.listen(envPort, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`Server listening at http://${host}:${port}`);
    });
  } catch (err) {
    console.error("Failed to initiate DB or start server:", err.stack);
    process.exit(1);
  }
};

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.stack);
});

startServer();
