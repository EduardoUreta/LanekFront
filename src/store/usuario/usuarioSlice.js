import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarios: [],
  };
  
  export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
      onLoadUsuarios: (state, { payload }) => {
        state.usuarios = payload;
      }
    },
  });
  
  export const { onLoadUsuarios } = usuarioSlice.actions;
  