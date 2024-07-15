import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AutorCard = ({ data, onSeleccion }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton onClick={() => onSeleccion(data)} color="primary">
            <CheckIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#ec9536" }} alt={data.nombre_completo}>
            {data.nombre_completo.split(" ")[0][0]}
            {data.nombre_completo.split(" ")[1][0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={data.nombre_completo} secondary={data.email} />
      </ListItem>
    </List>
  );
};

export default AutorCard;
