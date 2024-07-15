import { configureStore } from "@reduxjs/toolkit";
import librosSlice from "./slices/librosSlice";
import autoresSlice from "./slices/autoresSlice";

export default configureStore({
  reducer: {
    libros: librosSlice,
    autores: autoresSlice,
  },
});
