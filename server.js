import bodyParser from "body-parser";
import express, { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const envPort = process.env.PORT || 3000;

import { connectToServer } from "./src/utils/mongoUtils.js";
import { services } from "./src/services/notesServices.js";

const { json } = bodyParser;
const app = express();
var routePath = Router();
app.use(json());

//Initiate all the services
services(routePath);

app.use("/services", routePath);

connectToServer(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }
  var server = app.listen(envPort, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server listening at http://${host}:${port}`);
  });
});

process.on("uncaughtException", function (err) {
  console.error(err.stack);
});
