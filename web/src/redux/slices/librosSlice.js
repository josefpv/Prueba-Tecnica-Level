import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "./../../urls.json";
import { toast } from "react-toastify";
import _ from "lodash";

const resultadoFiltro = (filtro, array) => {
  let resultado = [];

  resultado = _.filter(array, (i) => {
    return (
      _.startsWith(i.rut, parseInt(filtro)) ||
      _.includes(i.nombre_completo.toLowerCase(), filtro.toLowerCase()) ||
      _.includes(i.titulo.toLowerCase(), filtro.toLowerCase()) ||
      i.year === parseInt(filtro)
    );
  });

  return resultado.length ? resultado : [];
};

export const librosSlice = createSlice({
  name: "libros",
  initialState: {
    libros: [],
    librosFiltrado: [],
    resultadoGuardado: {},
  },
  reducers: {
    setLibros: (state, action) => {
      state.libros = action.payload;
      state.librosFiltrado = action.payload;
    },
    setResultadoGuardado: (state, action) => {
      state.resultadoGuardado = action.payload;
    },
    setFiltradoLibro: (state, action) => {
      state.librosFiltrado = action.payload;
    },
  },
});

export const fetchLibros = () => (dispatch) => {
  //llamada a api para obtener libros
  const url = `${urls.urlBase}${urls.fetchLibros}`;

  axios
    .get(url)
    .then(({ data }) => {
      dispatch(setLibros(data));
    })
    .catch((error) => {
      toast.error("Ha ocurrodo un error al cargar los libros.");
    });
};

export const registraLibro = (data) => (dispatch) => {
  const url = `${urls.urlBase}${urls.registraLibro}`;
  axios
    .post(url, data)
    .then(({ data }) => {
      toast.success(data.msg);
      dispatch(fetchLibros());
      dispatch(setResultadoGuardado(data));
    })
    .catch((error) => {
      console.error(error.response.data);
      toast.error(error.response.data.error);
      dispatch(setResultadoGuardado(error.response.data));
    });
};

export const filtraLibro = (filtro) => (dispatch, getState) => {
  const originalListaLibros = [...getState().libros.libros];
  //no se esta filtrando
  if (filtro === "") {
    dispatch(setFiltradoLibro(originalListaLibros));
  }

  const res = resultadoFiltro(filtro, originalListaLibros);
  dispatch(setFiltradoLibro(res));
};

export const { setLibros, setResultadoGuardado, setFiltradoLibro } =
  librosSlice.actions;
export default librosSlice.reducer;
