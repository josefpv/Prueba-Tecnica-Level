import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Typography } from "@mui/material";

const ResultadoGuardado = ({ resultado }) => {
  if ("error" in resultado) {
    return (
      <Grid container justifyContent="center">
        <Grid md={4} xs={12}>
          <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
            <AnnouncementIcon
              sx={{ color: "#fc1303", fontSize: 80, textAlign: "center" }}
            />
          </Typography>
          <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
            No se pudo registrar el libro
          </Typography>
          <Typography
            variant="caption"
            component="p"
            sx={{ textAlign: "center" }}
          >
            {resultado.error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid md={4} xs={12}>
        <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
          <TaskAltIcon
            sx={{ color: "#ec9536", fontSize: 80, textAlign: "center" }}
          />
        </Typography>
        <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
          ¡Se ha registrado el libro!
        </Typography>
        <Typography
          variant="caption"
          component="p"
          sx={{ textAlign: "center" }}
        >
          Puedes hacer clic en cerrar para continuar...
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ResultadoGuardado;
