import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    animales: [],
    animalActivo: null,
    cargandoAnimal: true,
  };
  
  export const animalSlice = createSlice({
    name: 'animal',
    initialState,
    reducers: {
      onAddNewAnimal: (state, { payload }) => {
        state.animales.push(payload); 
        state.animalActivo = null;
        state.cargandoAnimal = false;
      },
      onLoadAnimals: (state, { payload }) => {
        state.cargandoAnimal = false;
        state.animales = payload;
        state.animalActivo = null;
      },
      onLoadOneAnimal: (state, { payload }) => {
        state.cargandoAnimal = false,
        state.animalActivo = payload
      },
      onUpdateAnimal: (state, { payload }) => {
        state.animalActivo = payload,
        state.cargandoAnimal = false
      },
      onDeleteAnimal: (state) => {
        if(state.activeEvent) {
          state.animales = state.animales.filter( animales => animales.id !== state.animalActivo.id );
          state.cargandoAnimal = true;
          state.animalActivo = null;
        }
      },
      onSetActiveAnimal: (state, { payload }) => {
        state.animalActivo = payload
      }
    },
  });
  
  export const { onAddNewAnimal, onLoadAnimals, onLoadOneAnimal, onUpdateAnimal, onDeleteAnimal, onSetActiveAnimal } = animalSlice.actions;
  