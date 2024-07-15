import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import {
  fetchAutores,
  registraNuevoAutor,
} from "../../redux/slices/autoresSlice";
import FormNuevoAutor from "./FormNuevoAutor";
import BtnNuevoAutor from "./BtnNuevoAutor";
import _ from "lodash";
import AutoresLibrosDrawer from "./AutoresLibrosDrawer";

const BarraBusquedaAutor = () => {
  return (
    <Box sx={{ p: 0.5, pb: 0, pt: 2 }}>
      <GridToolbarQuickFilter
        sx={{ width: "100%" }}
        placeholder="Buscar por RUT o nombre de autor..."
      />
    </Box>
  );
};

const getAplicaFiltro = (value) => {
  console.log("value:", value);
  if (!value || value == "") {
    //el filtro está vacio, en ese caso no se aplica filtro
    return null;
  }

  //determina si se filtra por el rut o nombre
  if (isNaN(value)) {
    //no es numero, filtra por nombre
    return (cellValue) => {
      return _.startsWith(
        cellValue.toString().toLowerCase(),
        value.toLowerCase()
      );
    };
  } else {
    return (cellValue) => {
      return _.startsWith(cellValue, value);
    };
  }
};

const Autores = () => {
  const autoresLista = useSelector((state) => state.autores.autores);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [autorSeleccionado, setAutorSeleccionado] = useState({});

  useEffect(() => {
    dispatch(fetchAutores());
  }, []);

  const handleAgregaAutor = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreaAutor = (data) => {
    const dataApi = {
      rut: data.rutAutor.split("-")[0],
      dv: data.rutAutor.split("-")[1],
      nombreCompleto: data.nombre,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
    };

    dispatch(registraNuevoAutor(dataApi));
    handleCloseModal();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setAutorSeleccionado({});
  };

  const handleOpenDrawer = (autor) => {
    setAutorSeleccionado(autor);
    setIsDrawerOpen(true);
  };

  const cols = [
    {
      field: "rut",
      headerName: "RUT",
      width: 140,
      renderCell: ({ row }) => {
        return `${row.rut}-${row.dv}`;
      },
      getApplyQuickFilterFn: getAplicaFiltro,
    },
    {
      field: "nombre_completo",
      headerName: "Nombres",
      width: 300,
      getApplyQuickFilterFn: getAplicaFiltro,
    },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha Nacimiento",
      width: 200,
      getApplyQuickFilterFn: undefined,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      getApplyQuickFilterFn: undefined,
    },
    {
      field: "",
      headerName: "Opciones",
      width: 150,
      getApplyQuickFilterFn: undefined,
      renderCell: ({ row }) => (
        <Button variant="contained" onClick={() => handleOpenDrawer(row)}>
          Ver Libros
        </Button>
      ),
    },
  ];

  return (
    <Grid container sx={{ p: 2 }} justifyContent="center">
      <AutoresLibrosDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={autorSeleccionado}
      />
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <DialogTitle>Nuevo Autor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos del nuevo autor a continuación:
          </DialogContentText>
          <FormNuevoAutor
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreaAutor={handleCreaAutor}
          />
        </DialogContent>
      </Dialog>
      <Grid md={12} xs={12}>
        <Typography variant="h2" component="p">
          Listado de Autores
        </Typography>
      </Grid>
      <Grid md={12} xs={12}>
        <Divider sx={{ mb: 4 }} />
      </Grid>
      <Grid md={8} xs={12}>
        <BtnNuevoAutor handleAgregaAutor={handleAgregaAutor} />
      </Grid>
      <Grid md={8} xs={12} sx={{ height: 600, pt: 2 }}>
        <DataGrid
          rows={autoresLista}
          getRowId={(row) => row.rut}
          columns={cols}
          slots={{
            toolbar: BarraBusquedaAutor,
          }}
          slotProps={{ toolbar: {} }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  );
};

export default Autores;
