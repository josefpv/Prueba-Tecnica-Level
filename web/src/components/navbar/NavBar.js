import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import DrawIcon from "@mui/icons-material/Draw";
import { Outlet, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuActivo, setMenuActivo] = useState("libros");

  const handleCambiaMenu = (e, menu) => {
    setMenuActivo(menu);
    navigate(`/${menu}`);
  };

  return (
    <Grid container sx={{ m: 0, p: 0, height: "100vh" }}>
      <Grid md={12} xs={12}>
        <Outlet />
      </Grid>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: "100%" }}
          showLabels
          value={menuActivo}
          onChange={handleCambiaMenu}
        >
          <BottomNavigationAction
            icon={<AutoStoriesRoundedIcon />}
            label="Libros"
            value="libros"
          />
          <BottomNavigationAction
            icon={<DrawIcon />}
            label="Autores"
            value="autores"
          />
        </BottomNavigation>
      </Paper>
    </Grid>
  );
};

export default NavBar;
