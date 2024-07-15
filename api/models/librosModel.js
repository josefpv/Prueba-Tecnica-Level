const pool = require("./../database");

/**
 * Obtiene listado de libros registrados
 * @returns {array} Array de libros encontrados
 */
const fetchLibros = async () => {
  const query = `SELECT 
                    l.id,
                    l.titulo,
                    l.year,
                    l.genero,
                    l.numero_paginas,
                    a.nombre_completo,
                    a.rut,
                    a.dv
                FROM
                    libros l
                        LEFT JOIN
                    autores a ON a.rut = l.autor_rut ORDER BY l.year DESC;`;

  const [rows, fields] = await pool.query(query);
  return rows;
};

/**
 * Registra nuevo libro
 * @param {string} titulo Titulo del libro
 * @param {number} year Año del libro
 * @param {String} genero Género del libro
 * @param {number} numeroPaginas Número de páginas del libro
 * @param {number} autorRut RUT del autor sin digito verificador
 * @returns {number} ID del nuevo libro
 */
const registraLibro = async (titulo, year, genero, numeroPaginas, autorRut) => {
  const query = `INSERT INTO libros (titulo, year, genero, numero_paginas, autor_rut) VALUES (?,?,?,?,?);`;

  const [rows, fields] = await pool.query(query, [
    titulo,
    year,
    genero,
    numeroPaginas,
    autorRut,
  ]);
  return rows.insertId;
};

/**
 * Obtiene cantidad de libros para un autor
 * @param {number} autorRut RUT autor sin digito verificador
 * @returns {array} Array con cantidad total de libros encontrados
 */
const fetchCantidadLibrosAutor = async (autorRut) => {
  const query = `SELECT COUNT(*) total FROM test_tecnico.libros WHERE autor_rut = ?;`;
  const [rows, fields] = await pool.query(query, [autorRut]);
  return rows;
};

/**
 * Obtiene libros para un autor especifico
 * @param {number} rut RUT del autor sin digito verificador
 * @returns {arrya} Array de libros del autor encontrados
 */
const fetchLibrosAutor = async (rut) => {
  const query = `SELECT 
                    l.id,
                    l.titulo,
                    l.year,
                    l.genero,
                    l.numero_paginas,
                    a.nombre_completo,
                    a.rut,
                    a.dv
                FROM
                    libros l
                        LEFT JOIN
                    autores a ON a.rut = l.autor_rut WHERE l.autor_rut = ? ORDER BY l.year DESC;`;

  const [rows, fields] = await pool.query(query, [rut]);
  return rows;
};

module.exports = {
  fetchLibros,
  registraLibro,
  fetchCantidadLibrosAutor,
  fetchLibrosAutor,
};
