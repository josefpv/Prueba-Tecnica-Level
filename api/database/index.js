var mysql = require("mysql2");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 3,
  host: "localhost",
  user: "level",
  password: "level123",
  database: "test_tecnico",
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("La conexion a la base de datos ha sido desconectada.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("Hay demasiadas conexiones en la base de datos.");
    }
    if (err.code === "ECONNREFUSED") {
      console.log("La conexion a la base de datos ha sido rechazada.");
    }
  }

  if (connection) {
    console.log("Conectado a la base de datos.");
  }

  if (connection) connection.release();
  return;
});

module.exports = pool.promise();
