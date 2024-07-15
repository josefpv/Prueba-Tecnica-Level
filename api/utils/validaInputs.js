const validaBody = (parametros, body) => {
  let resultado = [];
  parametros.forEach((params) => {
    if (!Object.keys(body).includes(params)) {
      resultado.push(params);
    }
  });

  return resultado;
};

module.exports = {
  validaBody,
};
