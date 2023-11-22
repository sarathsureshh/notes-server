var bodyParser = require("body-parser");
const express = require("express");
const envPort = process.env.PORT || 3000;

const mongoUtil = require("./src/utils/mongoUtils");
var notesService = require("./src/services/notesServices");

const app = express();
var routePath = express.Router();
app.use(bodyParser.json());

//Initiate all the services
notesService.services(routePath);

app.use("/services", routePath);

mongoUtil.connectToServer(function (err) {
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
