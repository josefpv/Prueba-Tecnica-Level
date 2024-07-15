import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { registraLibro } from "../../redux/slices/librosSlice";

const GENEROS = [
  { id: 1, label: "Fantasía" },
  { id: 2, label: "Ciencia ficción" },
  { id: 3, label: "Misterio" },
  { id: 4, label: "Romance" },
  { id: 5, label: "Terror" },
  { id: 6, label: "Aventura" },
  { id: 7, label: "Drama" },
  { id: 8, label: "Comedia" },
  { id: 9, label: "Literatura infantil" },
  { id: 10, label: "No ficción" },
  { id: 11, label: "Clásico" },
  { id: 12, label: "Poesía" },
  { id: 13, label: "Ensayo" },
  { id: 14, label: "Biografía" },
  { id: 15, label: "Autoayuda" },
  { id: 16, label: "Cocina" },
  { id: 17, label: "Viajes" },
  { id: 18, label: "Salud" },
  { id: 19, label: "Negocios" },
  { id: 20, label: "Deportes" },
];

const FormDatosLibro = ({ onSiguiente, onAnterior, pasoActivo }) => {
  const dispatch = useDispatch();

  const autorSeleccionado = useSelector(
    (state) => state.autores.autorSeleccionado
  );
  const [yearLibro, setYearLibro] = useState(moment());
  const [generos, setGeneros] = useState(GENEROS);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(1);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm();

  const handleCreaLibro = (data) => {
    if (data.paginas === 0) {
      setError(
        "paginas",
        {
          type: "focus",
          message: `Número no valido`,
        },
        { shouldFocus: true }
      );
      return;
    }

    const dataApi = {
      titulo: data.titulo,
      year: yearLibro.year(),
      genero: GENEROS[generoSeleccionado - 1].label,
      numeroPaginas: data.paginas,
      autorRut: `${autorSeleccionado.rut}-${autorSeleccionado.dv}`,
    };

    dispatch(registraLibro(dataApi));
    onSiguiente();
  };

  const handleCambioGenero = ({ target }) => {
    setGeneroSeleccionado(target.value);
  };

  return (
    <form onSubmit={handleSubmit(handleCreaLibro)}>
      <Grid container spacing={2}>
        <Grid md={5} xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            color="primary"
            label="Titulo"
            helperText={errors.titulo && errors.titulo.message}
            inputProps={{
              maxlength: 60,
              ...register("titulo", {
                required: `El titulo es requerido.`,
              }),
            }}
          />
        </Grid>
        <Grid md={3} xs={12}>
          <DatePicker
            slotProps={{
              textField: {
                fullWidth: true,
                disabled: true,
              },
              openPickerButton: {
                color: "primary",
              },
            }}
            onChange={(y) => setYearLibro(y)}
            views={["year"]}
            defaultValue={moment()}
          />
        </Grid>
        <Grid md={2} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="genero-label">Género</InputLabel>
            <Select
              labelId="genero-label"
              id="genero-select"
              value={generoSeleccionado}
              label="Género"
              onChange={handleCambioGenero}
            >
              {generos?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid md={2} xs={12}>
          <TextField
            label="N° Pág"
            defaultValue={1}
            type="number"
            color="primary"
            inputProps={{
              min: 1,
              ...register("paginas", {
                required: `N° de páginas es requerido.`,
              }),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <Grid container spacing={2}>
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
                disabled={!isValid}
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                type="submit"
              >
                Siguiente Paso
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormDatosLibro;
