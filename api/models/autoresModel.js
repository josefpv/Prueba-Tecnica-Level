const pool = require("./../database");
/**
 * Obtiene listado de autores.
 * @returns {array} Array de autores
 */
const fetchAutores = async () => {
  const query = `SELECT a.rut, a.dv, a.nombre_completo, 
                  DATE_FORMAT(a.fecha_nacimiento, "%d-%m-%Y") fecha_nacimiento, 
                  a.email FROM autores a;`;
  const [rows, fields] = await pool.query(query);
  return rows;
};

/**
 * Busca un autor por rut
 * @param {string} rutAutor RUT del autor
 * @returns {array} Array del autor encontrado.
 */
const fetchAutorRut = async (rutAutor) => {
  const query = `SELECT * FROM autores WHERE rut = ?;`;
  const [rows, fields] = await pool.query(query, [rutAutor]);
  return rows;
};

/**
 * Registra un nuevo autor
 * @param {number} rut RUT del autor (sin digito verificador)
 * @param {string} dv Digito verificador
 * @param {string} nombreCompleto Nombre del autor
 * @param {strig} fechaNacimiento Fecha de bacimiento del autor
 * @param {string} email Email del autor
 * @returns
 */
const registraAutor = async (
  rut,
  dv,
  nombreCompleto,
  fechaNacimiento,
  email
) => {
  const query = `INSERT INTO autores (rut, dv, nombre_completo, fecha_nacimiento, email) 
                  VALUES (?,?,?,?,?);`;
  const [rows, fields] = await pool.query(query, [
    rut,
    dv,
    nombreCompleto,
    fechaNacimiento,
    email,
  ]);
  return rows.insertId;
};

module.exports = {
  fetchAutores,
  fetchAutorRut,
  registraAutor,
};
