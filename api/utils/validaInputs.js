const validaBody = (parametros, body) => {
  let resultado = [];
  parametros.forEach((params) => {
    if (!Object.keys(body).includes(params)) {
      resultado.push(params);
    }
  });

  return resultado;
};

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = {
  validaBody,
  validarEmail,
};
