import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import FormBuscaAutor from "../autores/FormBuscaAutor";
import FormDatosLibro from "./FormDatosLibro";
import { useDispatch, useSelector } from "react-redux";
import { resetFormBuscaAutor } from "../../redux/slices/autoresSlice";
import ResultadoGuardado from "./ResultadoGuardado";

const PASOS = ["Buscar autor", "Datos del libro", "Confirmar"];

const FormNuevoLibro = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resultadoGuardado = useSelector(
    (state) => state.libros.resultadoGuardado
  );

  const [pasoActivo, setPasoActivo] = useState(0);

  const handleSiguiente = () => {
    setPasoActivo((prev) => prev + 1);
  };
  const handleAnterior = () => {
    setPasoActivo((prev) => prev - 1);
  };

  const resetPasos = () => {
    setPasoActivo(0);
  };

  const handleCloseModal = () => {
    resetPasos();
    onClose();
    dispatch(resetFormBuscaAutor());
  };

  const renderPaso = () => {
    if (pasoActivo === 0) {
      return (
        <FormBuscaAutor
          onSiguiente={handleSiguiente}
          onAnterior={handleAnterior}
          pasoActivo={pasoActivo}
        />
      );
    }

    if (pasoActivo === 1) {
      return (
        <FormDatosLibro
          onSiguiente={handleSiguiente}
          onAnterior={handleAnterior}
          pasoActivo={pasoActivo}
        />
      );
    }

    if (pasoActivo === 2) {
      return <ResultadoGuardado resultado={resultadoGuardado} />;
    }
  };

  return (
    <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleCloseModal}>
      <DialogTitle>Nuevo Libro</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Sigue los pasos a continuación para registrar un nuevo libro...
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid md={12} xs={12}>
            <Stepper activeStep={pasoActivo}>
              {PASOS.map((paso, index) => (
                <Step key={paso}>
                  <StepLabel>{paso}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid md={12} xs={12}>
            {renderPaso()}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormNuevoLibro;
