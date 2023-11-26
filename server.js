import bodyParser from "body-parser";
import express, { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const envPort = process.env.PORT || 3000;

import { initiateDb } from "./src/utils/mongoUtils.js";
import { notesServices } from "./src/services/notesServices.js";
import { authServices } from "./src/services/authService.js";

const { json } = bodyParser;
const app = express();
var routePath = Router();
app.use(json());

//Initiate all the services
authServices(routePath);
notesServices(routePath);

//Appends /services to all the routes that come in
app.use("/services", routePath);

initiateDb(function (err) {
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
