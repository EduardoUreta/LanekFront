import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import { onLoadUsuarios } from "../store/usuario/usuarioSlice";

const { VITE_API_URL } = getEnvVariables();

export const useUsuariosStore = () => {
    
  const dispatch = useDispatch();

  const startLoadUsuarios = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/usuarios`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadUsuarios(data));
      }

    } catch (error) {
      console.error("Error cargando animales: ", error);
    }
  };

  return {
    startLoadUsuarios
  }
}
