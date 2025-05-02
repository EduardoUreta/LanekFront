import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewAnimal, onLoadOneAnimal, onLoadAnimals, onSetActiveAnimal, onUpdateAnimal } from "../store/animal/animalSlice";

const { VITE_API_URL } = getEnvVariables();

export const useAnimalStore = () => {
    
  const dispatch = useDispatch();

  const startAddNewAnimal = async({animalFavorito, imagen_url, UsuarioId}) => {
    try {
      const formData = new FormData();
      formData.append('animalFavorito', animalFavorito);
      formData.append('imagen_url', imagen_url);
      formData.append('UsuarioId', UsuarioId);

      const response = await fetch(`${VITE_API_URL}/animales/`, {
        method: "POST",
        body: formData, 
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Error al crear el animal');
      }
        
      if(response.ok) {
        dispatch(onAddNewAnimal({ animalFavorito, imagen_url }));
        console.log(imagen_url);
        
        Swal.fire({
            icon: "success",
            title: "Has cargado el animal correctamente",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al cargar el animal",
        });
      }
    } catch (error) {
      console.error("Error cargando el animal: ", error);
    }
  };

  const startLoadAnimals = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/animales`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadAnimals(data));
      }

    } catch (error) {
      console.error("Error cargando animales: ", error);
    }
  };

  const startLoadOneAnimal = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/animales/${id}`, {
        method: "GET",
        credentials: 'include',
      });

      if(response.ok) {
        const data = await response.json();
        dispatch(onLoadOneAnimal(data));
      }
    } catch (error) {
      console.error("Error cargando el animal: ", error);
    }
  };

  const startUpdateAnimal = async ({id, animalFavorito, imagen_url}) => {
    try {
      const responseGet = await fetch(`${VITE_API_URL}/animales/${id}`, {
        method: "GET",
        credentials: 'include',
      });

      const dataGet = await responseGet.json();
      
      const formData = new FormData();
      formData.append('animalFavorito', animalFavorito || dataGet.animalFavorito);

      if (imagen_url) {
        formData.append("imagen_url", imagen_url);
      } else {
        formData.append('imagen_url', dataGet.imagen_url);
      };
     

      try {
        const responsePut = await fetch(`${VITE_API_URL}/animales/${id}`, {
          method: "PUT",
          body: formData,
          credentials: 'include',
        });     
        
        if(responsePut.ok) {
          const data = await responsePut.json();
          console.log(data);
          dispatch(onUpdateAnimal(data));
          Swal.fire({
            icon: "success",
            title: "Has actualizado el animal correctamente",
          });
        }
      } catch (error) {
        console.error("Error actualizando el animal: ", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el animal",
        });
      }

    } catch (error) {
      console.error("Error cargando el animal: ", error);
    }
  };

  const startDeleteAnimal = async(id) => {
    try {
      await fetch(`${VITE_API_URL}/animales/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

    } catch (error) {
      console.error("Error eliminado al animal: ", error);
    }
  };

  const startActiveAnimal = async(Animal) => {
    dispatch(onSetActiveAnimal(Animal));
  }


  return {
    startAddNewAnimal,
    startLoadAnimals,
    startLoadOneAnimal,
    startUpdateAnimal,
    startDeleteAnimal,
    startActiveAnimal
  }
}
