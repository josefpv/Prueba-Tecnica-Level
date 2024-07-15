import { GridToolbarContainer } from "@mui/x-data-grid";
import React from "react";
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function BtnNuevoAutor({ handleAgregaAutor }) {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<NoteAddIcon />}
        onClick={handleAgregaAutor}
      >
        Agregar Nuevo Autor
      </Button>
    </>
  );
}

export default BtnNuevoAutor;
