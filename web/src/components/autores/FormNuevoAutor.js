import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useDispatch } from "react-redux";
import Fn from "../../utils/rut";

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const FormNuevoAutor = ({ rut, onCreaAutor }) => {
  const dispatch = useDispatch();
  const [fechaNacimiento, setFechaNamiciento] = useState(moment());
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm();

  const submitDataCreaAutor = (data) => {
    if (!validarEmail(data.email)) {
      setError(
        "email",
        {
          type: "focus",
          message: `Email ingresado no válido`,
        },
        { shouldFocus: true }
      );
      return;
    }

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

    const dataApi = {
      ...data,
      fechaNacimiento: fechaNacimiento.format("YYYY/MM/DD"),
    };
    onCreaAutor(dataApi);
  };
  //

  return (
    <form onSubmit={handleSubmit(submitDataCreaAutor)}>
      <Grid container spacing={2}>
        <Grid md={3} xs={12}>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="rut"
            defaultValue={rut || ""}
            name="rut"
            label="RUT"
            variant="outlined"
            inputProps={{
              ...register("rutAutor", {
                required: `Ingrese el RUT del autor sin puntos y con guión`,
              }),
            }}
            helperText={errors.rutAutor && errors.rutAutor.message}
          />
        </Grid>
        <Grid md={3} xs={12}>
          <TextField
            fullWidth
            margin="dense"
            id="nombre"
            name="nombre"
            label="Nombre Completo"
            variant="outlined"
            inputProps={{
              maxlength: 60,
              ...register("nombre", {
                required: `Nombre del autor es requerido`,
              }),
            }}
            helperText={errors.nombre && errors.nombre.message}
          />
        </Grid>
        <Grid md={3} xs={12} sx={{ pt: 2 }}>
          <DatePicker
            defaultValue={fechaNacimiento}
            value={fechaNacimiento}
            onChange={(fecha) => setFechaNamiciento(fecha)}
            disableFuture
            slotProps={{
              textField: {
                helperText: `${
                  errors.fechaNacimiento
                    ? errors.fechaNacimiento.message
                    : "DD/MM/YYYY"
                }`,
                disabled: true,
                label: "Fecha Nacimiento",
                name: "fechaNacimiento",
                id: "fechaNacimiento",
              },
              openPickerButton: {
                color: "primary",
              },
            }}
          />
        </Grid>
        <Grid md={3} xs={12}>
          <TextField
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Correo Electrónico"
            variant="outlined"
            inputProps={{
              maxlength: 100,
              ...register("email", {
                required: `Email es requerido.`,
              }),
            }}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            Registrar Autor
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormNuevoAutor;
