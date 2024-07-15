import React from "react";
import { useRouteError } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Grid container sx={{ p: 5 }}>
      <Grid md={12} xs={12}>
        <Typography variant="h1">Oops!</Typography>
      </Grid>
      <Grid md={12} xs={12}>
        <Typography variant="h4">Ha ocurrido un error inesperado.</Typography>
      </Grid>
      <Grid md={12} xs={12}>
        <Typography variant="subtitle1">
          {error.statusText || error.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
