import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { animalSlice } from "./animal/animalSlice";
import { usuarioSlice } from "./usuario/usuarioSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    animal: animalSlice.reducer,
    usuario: usuarioSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
