const express = require("express");
const autoresController = require("./../controllers/autoresController");

const router = express.Router();

router.get("/", autoresController.fetchAutores);
router.get("/:autorRut", autoresController.fetchAutor);
router.post("/nuevo", autoresController.registraAutor);

module.exports = router;
