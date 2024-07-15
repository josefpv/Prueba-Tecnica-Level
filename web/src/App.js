import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ec9536",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
function App() {
  return (
    <NavBar>
      <p>contenido</p>
    </NavBar>
  );
}

export default App;
