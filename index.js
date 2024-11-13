// Archivo index.js, la raiz del proyecto y para los valores generales

const express = require("express");

const multer = require("multer");

var path = require("path");

const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 3000;

const log = console.log;

// La siguiente definición carga la librería de multer y especifica que el destino del archivo sea la carpeta pública
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/");
  },

  filename: function (req, file, callback) {
    return callback(null, file.originalname);
  },
});

var storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./private/");
  },

  filename: function (req, file, callback) {
    return callback(null, file.originalname);
  },
});

/* Establecer motor de templates */
app.set("view engine", "ejs")

app.use("", require("./routes/routes"))

/* Peticiones GET */
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// app.get("/raiz", (req, res) => {
//  res.send("Hello World");
// });

/* Peticiones POST */
app.post("/upload_file", function (req, res) {
  log("Cargando el archivo");
  // Se llama la configuración de multer, se recibe un arreglo de archivos que vienen de el index.html
  // El string 'file' es el id que otorgamos en el formulario al input en su propiedad de name
  var upload = multer({ storage: storage }).array("file", 1);

  upload(req, res, function (err) {
    //log(req.body);

    //log(req.files);

    if (err) {
      log(err);

      return res.end("Error uploading file.");
    }

    // Al llamar req.files[0] lo que estamos haciendo es llamar al archivo según hayamos subido
    // Aunque sea 1 sabemos que el primero será el de la posición 0.
    var pathDest = req.files[0].destination.slice(1);

    var finalPath = path.join(__dirname, "../../" + pathDest);

    log(finalPath);

    res.status(200).json({ code: 200, msg: "Ok" });
  });
});

// Por default la carpeta public expone los archivos dentro de esta carpeta
// Por lo general son imágenes genéricas, templates de html, css, archivos js entre otros.
// Para acceder a un archivo dentro de public: dominio/ruta_desde_public
app.use(express.static(path.join(__dirname, "public")));
// http://localhost:PUERTO/IMAGEN.png para acceder a las imagenes en la carpeta public

app.post("/upload_file_private", function (req, res) {
  log("Cargando el archivo");
  var upload = multer({ storage: storage2 }).array("file", 1);
  upload(req, res, function (err) {
    //log(req.body);
    //log(req.files);

    if (err) {
      log(err);
      return res.end("Error uploading file.");
    }

    var pathDest = req.files[0].destination.slice(1);
    var finalPath = path.join(__dirname, "../../" + pathDest);
    log(finalPath);
    res.status(200).json({ code: 200, msg: "Ok" });
  });
});

// No podemos dar acceso público a los archivos privados, pero podemos dar un acceso a través de una URL.

// Este es el proceso de control ya que al dar acceso mediante URL podemos agregar tanto procesamiento
// Adicional al archivo en caso de ser necesario o en su defecto protegerlo con el sistema de autenticación que definamos para el API.
// Con res.sendFile podemos interpretar un archivo y cargarlo del lado del cliente.
app.get("/get_private_file/:file", function (req, res) {
  var fileName = req.params.file;
  res.sendFile(path.join(__dirname, "./private", fileName));
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
