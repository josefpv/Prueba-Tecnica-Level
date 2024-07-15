const express = require("express");
const librosController = require("./../controllers/librosController");

const router = express.Router();

router.get("/", librosController.fetchLibros);
router.get(
  "/cantidad/autor/:rutAutor",
  librosController.fetchCantidadLibrosAutor
);
router.post("/nuevo", librosController.registraLibro);

module.exports = router;
