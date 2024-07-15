import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FormNuevoAutor from "../autores/FormNuevoAutor";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Fn from "../../utils/rut";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAutorRut,
  resetFormBuscaAutor,
  seleccionaAutor,
} from "../../redux/slices/autoresSlice";
import AutorCard from "./AutorCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { registraNuevoAutor } from "../../redux/slices/autoresSlice";

const FormBuscaAutor = ({ onSiguiente, onAnterior, pasoActivo }) => {
  const dispatch = useDispatch();
  const autorEncontrado = useSelector((state) => state.autores.autorEncontrado);
  const autorSeleccionado = useSelector(
    (state) => state.autores.autorSeleccionado
  );
  const autorExiste = useSelector((state) => state.autores.autorExiste);

  const [estaCreando, setEstaCreando] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const handleBuscaAutor = (data) => {
    //valida rut
    const rutValido = Fn.validaRut(data.rutAutor.replace(".", ""));
    if (!rutValido) {
      setError(
        "rutAutor",
        {
          type: "focus",
          message: `RUT no válido. Ingrese el RUT del autor sin puntos y con guión`,
        },
        { shouldFocus: true }
      );
      return;
    }
    //busca autor
    dispatch(fetchAutorRut(data.rutAutor));
  };

  const handleSeleccionaAutor = (autor) => {
    dispatch(seleccionaAutor(autor));
  };

  const handleCancelCrearAutor = () => {
    setEstaCreando(false);
    dispatch(resetFormBuscaAutor());
  };

  const handleConfirmaCrearAutor = () => {
    setEstaCreando(true);
    dispatch(resetFormBuscaAutor());
  };

  const handleRegistraAutor = (data) => {
    const dataApi = {
      rut: data.rutAutor.split("-")[0],
      dv: data.rutAutor.split("-")[1],
      nombreCompleto: data.nombre,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
    };

    setEstaCreando(false);
    dispatch(registraNuevoAutor(dataApi, true));
  };

  return (
    <Grid container spacing={2}>
      {!Object.keys(autorSeleccionado).length ? (
        <Grid md={6} xs={12}>
          <form onSubmit={handleSubmit(handleBuscaAutor)}>
            <TextField
              disabled={estaCreando}
              fullWidth
              variant="outlined"
              color="primary"
              label="RUT Autor"
              helperText={errors.rutAutor && errors.rutAutor.message}
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="buscar" type="submit">
                    <SearchIcon color="primary" />
                  </IconButton>
                ),
              }}
              inputProps={{
                ...register("rutAutor", {
                  required: `Ingrese el RUT del autor sin puntos y con guión`,
                }),
              }}
            />
          </form>
        </Grid>
      ) : null}
      {!Object.keys(autorSeleccionado).length && autorEncontrado.length ? (
        <Grid md={6} xs={12}>
          <Typography component="p" sx={{ fontWeight: "bold" }}>
            Autor Encontrado:
          </Typography>
          <AutorCard
            data={autorEncontrado[0]}
            onSeleccion={handleSeleccionaAutor}
          />
        </Grid>
      ) : null}

      {Object.keys(autorSeleccionado).length ? (
        <Grid md={6} xs={12}>
          <Typography component="p" sx={{ fontWeight: "bold" }}>
            Autor Seleccionado:
          </Typography>

          <Typography component="p">{`${autorSeleccionado.rut}-${autorSeleccionado.dv}`}</Typography>
          <Typography component="p">
            {autorSeleccionado.nombre_completo}
          </Typography>
        </Grid>
      ) : null}

      {autorExiste !== null && !autorExiste ? (
        <Grid md={6} xs={12}>
          <Typography component="p" sx={{ fontWeight: "bold" }}>
            Autor no existe, ¿desea crear?
          </Typography>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={handleConfirmaCrearAutor}
          >
            Sí
          </Button>
          <Button variant="outlined" onClick={handleCancelCrearAutor}>
            No
          </Button>
        </Grid>
      ) : null}

      {estaCreando ? (
        <Grid md={12} xs={12}>
          <Divider sx={{ mb: 2 }}>Nuevo Autor</Divider>
          <FormNuevoAutor
            rut={getValues("rutAutor")}
            onCreaAutor={handleRegistraAutor}
          />
        </Grid>
      ) : null}

      <Grid md={12} xs={12}>
        <Grid container spacing={1}>
          <Grid md={6} xs={12}>
            <Button
              disabled={pasoActivo === 0}
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIosIcon />}
              onClick={onAnterior}
            >
              Paso Anterior
            </Button>
          </Grid>
          <Grid md={6} xs={12}>
            <Button
              disabled={!Boolean(Object.keys(autorSeleccionado).length)}
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              onClick={onSiguiente}
            >
              Siguiente Paso
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormBuscaAutor;
