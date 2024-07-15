import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Divider, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { fetchLibros, filtraLibro } from "../../redux/slices/librosSlice";
import BtnNuevoLibro from "./BtnNuevoLibro";
import FormNuevoLibro from "./FormNuevoLibro";

const Libros = () => {
  const librosFiltrado = useSelector((state) => state.libros.librosFiltrado);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (!librosFiltrado.length) {
      dispatch(fetchLibros());
    }

    return () => {
      dispatch(filtraLibro(""));
    };
  }, []);

  const handleAgregaLibro = () => {
    setIsModalOpen(true);
  };

  const handleFiltraBusqueda = ({ target }) => {
    setFiltro(target.value);
    dispatch(filtraLibro(target.value));
  };

  const cols = [
    { field: "titulo", headerName: "Titulo", width: 300 },
    { field: "year", headerName: "Año" },
    { field: "genero", headerName: "Género", width: 200 },
    { field: "numero_paginas", headerName: "# Pág" },
    { field: "nombre_completo", headerName: "Autor", width: 300 },
  ];

  return (
    <Grid container sx={{ p: 2 }} justifyContent="center">
      <FormNuevoLibro
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Grid md={12} xs={12}>
        <Typography variant="h2" component="p">
          Listado de Libros
        </Typography>
      </Grid>
      <Grid md={12} xs={12}>
        <Divider sx={{ mb: 4 }} />
      </Grid>
      <Grid md={8} xs={12}>
        <TextField
          value={filtro}
          onChange={handleFiltraBusqueda}
          fullWidth
          color="primary"
          label="Buscar por RUT autor, autor, titulo o año..."
        />
      </Grid>
      <Grid md={8} xs={12} sx={{ height: 600, pt: 2 }}>
        <DataGrid
          rows={librosFiltrado}
          getRowId={(row) => row.id}
          columns={cols}
          slots={{
            toolbar: BtnNuevoLibro,
          }}
          slotProps={{ toolbar: { handleAgregaLibro } }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  );
};

export default Libros;
