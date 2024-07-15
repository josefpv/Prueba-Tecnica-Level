const librosModel = require("./../models/librosModel");
const autorModel = require("./../models/autoresModel");
const validaInputs = require("./../utils/validaInputs");

const fetchLibros = async (req, res) => {
  try {
    const libros = await librosModel.fetchLibros();
    return res.status(200).send(libros);
  } catch (error) {
    console.error("Error en fetchLibros(): ", error);
    return res
      .status(500)
      .send({ msg: "Error al intentar consultar los libros." });
  }
};

const registraLibro = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({ error: `No se han recibido parametros.` });
    }

    const parametros = [
      "titulo",
      "year",
      "genero",
      "numeroPaginas",
      "autorRut",
    ];

    const resultadoValidacion = validaInputs.validaBody(parametros, req.body);
    if (resultadoValidacion.length > 0) {
      return res.status(400).send({
        error: `Los siguientes parametros son requeridos: ${resultadoValidacion.join(
          ", "
        )}`,
      });
    }
    const { titulo, year, genero, numeroPaginas, autorRut } = req.body;

    const rutSinDV = autorRut.split("-")[0];
    //valida que el autor exista
    const autorDatos = await autorModel.fetchAutorRut(rutSinDV);
    if (!autorDatos.length) {
      return res.status(400).send({ error: `El autor ${autorRut} no existe.` });
    }

    //valida que no exceda cantidad de libros no > 10
    const cantidadLibros = await librosModel.fetchCantidadLibrosAutor(rutSinDV);
    console.log(cantidadLibros);
    if (parseInt(cantidadLibros[0].total) >= 10) {
      return res.status(400).send({
        error: `El autor ha alcanzado la cantidad máxima (10) de libros.`,
      });
    }

    const registroLibro = await librosModel.registraLibro(
      titulo,
      year,
      genero,
      numeroPaginas,
      rutSinDV
    );
    return res
      .status(200)
      .send({ msg: `Se ha registrado el libro ${titulo}.`, id: registroLibro });
  } catch (error) {}
};

const fetchCantidadLibrosAutor = async (req, res) => {
  try {
    const { rutAutor } = req.params;

    if (!rutAutor) {
      return res
        .status(400)
        .send({ error: `El parametro rutAutor es requerido.` });
    }

    const cantidadLibros = await librosModel.fetchCantidadLibrosAutor(rutAutor);
    return res.status(200).send(cantidadLibros[0] || {});
  } catch (error) {
    console.error("Error en fetchCantidadLibrosAutor: ", error);
    return res.status(500).send({
      error:
        "Ha ocurrido un error al intentar obtener la cantidad de libros del autor.",
    });
  }
};

module.exports = {
  fetchLibros,
  fetchCantidadLibrosAutor,
  registraLibro,
};
