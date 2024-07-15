const autoresModel = require("./../models/autoresModel");
const librosModel = require("./../models/librosModel");
const validaInputs = require("./../utils/validaInputs");
const Fn = require("./../utils/rut");

const fetchAutores = async (req, res) => {
  try {
    const autores = await autoresModel.fetchAutores();

    //obtiene los libros de cada conductor
    const autoresCompleto = await Promise.all(
      autores.map(async (autor) => {
        const libros = await librosModel.fetchLibrosAutor(autor.rut);
        return { ...autor, libros };
      })
    );

    return res.status(200).send(autoresCompleto);
  } catch (error) {
    console.error("Error en: fetchAutores() ", error);
    return res
      .status(500)
      .send({ msg: `Ha ocurrido un error al intentar obtener los autores.` });
  }
};

const fetchAutor = async (req, res) => {
  try {
    const { autorRut } = req.params;

    if (!autorRut || autorRut === "") {
      return res
        .status(400)
        .send({ error: `El parametro autorRut es requerido.` });
    }

    //valida rut
    const rutValido = Fn.validaRut(autorRut);
    if (!rutValido) {
      return res.status(400).send({ error: `El RUT ingresado no es valido.` });
    }

    const autorEncontrado = await autoresModel.fetchAutorRut(
      autorRut.split("-")[0]
    );
    return res.status(200).send(autorEncontrado);
  } catch (error) {
    console.error("Error en fetchAutor(): ", error);
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error al intentar buscar al autor." });
  }
};

const registraAutor = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({ error: `No se han recibido parametros.` });
    }

    const parametros = [
      "rut",
      "dv",
      "nombreCompleto",
      "fechaNacimiento",
      "email",
    ];

    const { rut, dv, nombreCompleto, fechaNacimiento, email } = req.body;

    const resultadoValidacion = validaInputs.validaBody(parametros, req.body);
    if (resultadoValidacion.length > 0) {
      return res.status(400).send({
        error: `Los siguientes parametros son requeridos: ${resultadoValidacion.join(
          ", "
        )}`,
      });
    }

    //validar que NO exista autor
    const autorEncontrado = await autoresModel.fetchAutorRut(rut);
    if (autorEncontrado.length > 0) {
      return res
        .status(400)
        .send({ error: `El autor que intenta registrar ya existe.` });
    }

    await autoresModel.registraAutor(
      rut,
      dv,
      nombreCompleto,
      fechaNacimiento,
      email
    );

    return res.status(200).send({
      msg: `Autor registrado correctamente.`,
      autor: {
        rut,
        dv,
        nombre_completo: nombreCompleto,
        fecha_nacimiento: fechaNacimiento,
        email,
      },
    });
  } catch (error) {
    console.error("Error en registraAutor(): ", error);
    return res
      .status(500)
      .send({ error: "Ha ocurrido un error al intentar registrar el autor." });
  }
};

module.exports = {
  fetchAutores,
  fetchAutor,
  registraAutor,
};
