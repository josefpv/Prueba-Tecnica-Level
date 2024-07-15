import React from "react";
import {
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ClassIcon from "@mui/icons-material/Class";

const AutoresLibrosDrawer = ({ data, isOpen, onClose }) => {
  //no tiene libros el autor
  if (data.libros?.length === 0) {
    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Grid
          container
          width={500}
          justifyContent="center"
          alignContent="center"
        >
          <Grid md={12} xs={12} sx={{ pt: 20 }}>
            <Typography sx={{ textAlign: "center" }}>
              <AutoStoriesIcon sx={{ fontSize: 60, color: "red" }} />
            </Typography>
            <Typography
              component="p"
              variant="button"
              sx={{ textAlign: "center" }}
            >
              No hay libros registrados :(
            </Typography>
          </Grid>
        </Grid>
      </Drawer>
    );
  }

  //tiene libros el autor
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Grid container sx={{ width: 400, p: 2 }}>
        <Grid md={12} xs={12}>
          <Typography variant="button" component="p">
            Libros Registrados:
          </Typography>
        </Grid>
        {data.libros?.length === 10 ? (
          <Grid md={12} xs={12}>
            <Alert severity="warning">
              El autor ha alcanzado el máximo de libros.
            </Alert>
          </Grid>
        ) : null}
        <Grid md={12} xs={12}>
          <List dense={true}>
            {data.libros?.map((libro) => (
              <ListItem>
                <ListItemIcon>
                  <ClassIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={libro.titulo}
                  secondary={`${libro.genero} - ${libro.year}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default AutoresLibrosDrawer;
