import { createSlice } from "@reduxjs/toolkit";
import urls from "./../../urls.json";
import axios from "axios";
import { toast } from "react-toastify";

export const autoresSlice = createSlice({
  name: "autores",
  initialState: {
    autores: [],
    autoresFiltrado: [],
    autorEncontrado: [],
    autorSeleccionado: {},
    autorExiste: null,
  },
  reducers: {
    setAutores: (state, action) => {
      state.autores = action.payload;
      state.autoresFiltrado = action.payload;
    },
    setAutorEncontrado: (state, action) => {
      state.autorEncontrado = action.payload;
    },
    setSeleccionaAutor: (state, action) => {
      state.autorSeleccionado = action.payload;
    },
    setAutorExiste: (state, action) => {
      state.autorExiste = action.payload;
    },
  },
});

export const fetchAutores = () => (dispatch) => {
  //llamada a api para obtener libros
  const url = `${urls.urlBase}${urls.fetchAutores}`;
  axios
    .get(url)
    .then(({ data }) => {
      dispatch(setAutores(data));
    })
    .catch((error) => {
      console.error(error);
      toast.error("Ha ocurrido un error al intentar obtener los autores.");
    });
};

export const fetchAutorRut = (rut) => (dispatch) => {
  const url = `${urls.urlBase}${urls.fetchAutor}/${rut}`;
  axios
    .get(url)
    .then(({ data }) => {
      if (data.length > 0) {
        dispatch(setAutorEncontrado(data));
        dispatch(setAutorExiste(true));
      } else {
        dispatch(setAutorEncontrado([]));
        dispatch(setAutorExiste(false));
      }
    })
    .catch((error) => {
      toast.error("Ha ocurrido un error al intentar buscar al autor.");
      dispatch(setAutorEncontrado([]));
    });
};

export const seleccionaAutor = (autor) => (dispatch) => {
  dispatch(setSeleccionaAutor(autor));
};

export const resetFormBuscaAutor = () => (dispatch) => {
  dispatch(setAutorEncontrado([]));
  dispatch(setSeleccionaAutor({}));
  dispatch(setAutorExiste(null));
};

export const registraNuevoAutor =
  (datos, seleccion = false) =>
  (dispatch) => {
    const url = `${urls.urlBase}${urls.registraAutor}`;
    axios
      .post(url, datos)
      .then(({ data }) => {
        toast.success(data.msg);
        if (seleccion) {
          dispatch(setSeleccionaAutor(data.autor));
        }
        dispatch(fetchAutores());
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.error);
      });
  };

export const {
  setAutores,
  setAutorEncontrado,
  setSeleccionaAutor,
  setAutorExiste,
} = autoresSlice.actions;
export default autoresSlice.reducer;
