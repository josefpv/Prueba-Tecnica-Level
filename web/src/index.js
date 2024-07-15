import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Libros from "./components/libros/Libros";
import Autores from "./components/autores/Autores";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";
import ErrorPage from "./components/error/ErrorPage";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ec9536",
    },
    secondary: {
      main: "#ffffff",
    },
    danger: {
      main: "#f04022",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Libros />,
      },
      {
        path: "/libros",
        element: <Libros />,
      },
      {
        path: "/autores",
        element: <Autores />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
        <ThemeProvider theme={themeOptions}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
