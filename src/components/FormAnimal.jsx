import { useAuthStore, useForm } from "../hooks";
import Swal from "sweetalert2";
import { useAnimalStore } from "../hooks/useAnimalStore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getEnvVariables } from "../helpers";
import { Link, useNavigate } from "react-router-dom";

const respuesta = {
    respuestaAnimal: '',
    respuestaImagen: ''
};

export const FormAnimal = () => {

    const { respuestaAnimal, respuestaImagen, onInputChange, onResetForm} = useForm(respuesta);

    const { animalActivo } = useSelector(store => store.animal);
    const { startAddNewAnimal, startLoadOneAnimal, startDeleteAnimal, startActiveAnimal } = useAnimalStore();
    const { user } = useAuthStore();

    const { VITE_URL } = getEnvVariables();
    
    const onHandleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            Swal.fire("Solo se permiten archivos de imagen", "Favor, volver a intentar", "error");
            e.target.value = null;
            return;
        }
        onInputChange({ target: { name: 'respuestaImagen', value: file } });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!respuestaAnimal) return Swal.fire('¡No ingresaste un animal!', 'Favor, volver a intentar', 'error');
        if(!respuestaImagen) return Swal.fire('¡No ingresaste una imagen!', 'Favor, volver a intentar', 'error');
        startAddNewAnimal({ animalFavorito: respuestaAnimal, imagen_url: respuestaImagen, UsuarioId: user._id});
    };

    const onHandleEliminar = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar tu animal favorito?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteAnimal(id);
                startActiveAnimal(null);
            }
        });
    };

    useEffect(() => {
        startLoadOneAnimal(user._id);
    }, []);

  return (
    <>
        {
            (!animalActivo) ? 
            (
                <form className="animal-form" data-aos="zoom-in">
                    <div className="form-group mb-2">
                        <label className="text-dark">¿Cúal es tu animal favorito?</label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu animal favorito"
                        name='respuestaAnimal'
                        value={respuestaAnimal}
                        onChange={onInputChange}
                        />
                    </div>
        
                    <div className="form-group mb-2">
                    <label className="text-dark">Agrega su imagen: </label>
                    <input
                        type="file"
                        className="form-control"
                        name='respuestaImagen'
                        onChange={onHandleFile}
                    />
                    </div>          
        
                    <div className="d-flex justify-content-between">
                        <button type="button" className="p-2 rounded-3 bg-warning" onClick={onResetForm}>
                            Limpiar
                        </button>
                        <button className="p-2 rounded-3" onClick={onSubmit}>
                            Enviar
                        </button>
                    </div>
                </form>
            ) 
            : 
            (
                <div className="card animal-form mt-2 animal-list" data-aos="zoom-in">
                    <div className="text-center">
                        <img 
                            src={`${VITE_URL}/${animalActivo.imagen_url}`} 
                            className="card-img-top img-fluid img-thumbnail w-50" 
                            alt={animalActivo.nombre} 
                        />
                    </div>
                    <div className="card-body">
                        <h6 className="card-title text-center">Tu animal favorito es:</h6>
                        <h4 className="card-title text-center text-warning">{animalActivo.animalFavorito}</h4>
                        <div className="d-flex justify-content-center mt-4">
                            <button onClick={() => onHandleEliminar(animalActivo.id)} className=" btn btn-danger text-light mb-1">
                                <i className="fa-solid fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>

                </div>
            )
        }

    </>
  )
}
