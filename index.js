// Archivo index.js, la raiz del proyecto y para los valores generales

const express = require("express");

const multer = require("multer");

var path = require("path");

const app = express();

const port = 5000;

const log = console.log;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
