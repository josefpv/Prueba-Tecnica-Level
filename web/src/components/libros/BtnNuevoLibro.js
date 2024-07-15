import { GridToolbarContainer } from "@mui/x-data-grid";
import React from "react";
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function BtnNuevoLibro({ handleAgregaLibro }) {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<NoteAddIcon />}
        onClick={handleAgregaLibro}
      >
        Agregar Nuevo Libro
      </Button>
    </GridToolbarContainer>
  );
}

export default BtnNuevoLibro;
