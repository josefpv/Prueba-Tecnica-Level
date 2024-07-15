const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

//rutas en api
const librosRouter = require("./routes/librosRoute");
const autoresRouter = require("./routes/autoresRoute");

//endpoints
app.use("/api/v1/libros", librosRouter);
app.use("/api/v1/autores", autoresRouter);

//inicializacion
app.listen(port, () => {
  console.log(`API en ejecucion en purto: ${port}.`);
});
