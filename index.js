// Archivo index.js, la raiz del proyecto y para los valores generales

const express = require("express");

const multer = require("multer");

var path = require("path");

const app = express();

const port = process.env.PORT || 3000;

const log = console.log;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/upload_file", function (req, res) {
  log("Cargando el archivo");
  res.status(200).json({ code: 200, msg: "Ok" });
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
