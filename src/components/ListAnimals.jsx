import React, { useEffect } from 'react'
import { useAnimalStore } from '../hooks/useAnimalStore';
import { useSelector } from 'react-redux';
import { getEnvVariables } from '../helpers';
import { useUsuariosStore } from '../hooks';

export const ListAnimals = () => {

    const { startLoadAnimals } = useAnimalStore();
    const { startLoadUsuarios } = useUsuariosStore();
    const { animales } = useSelector(state => state.animal)
    const { usuarios } = useSelector(state => state.usuario);

    const { VITE_URL, VITE_API_URL } = getEnvVariables();

    useEffect(() => {
        startLoadAnimals();
        startLoadUsuarios();
    }, []);

  return (
    <>
        <h1 className='text-center mt-4'>Lista de Animales</h1>
        <div className="row mt-4" data-aos="zoom-out-up">
            {
                (animales.length != 0) ? 
                (
                    animales.map((animal) => {
                        const nombreArchivo = animal.imagen_url.replace('assets/animales/', '');
                        const correoUsuario = usuarios.find((usuario) => usuario.id == animal.UsuarioId);
                        return (
                        <div key={animal.id} className="col-sm-12 col-md-6 col-lg-6 mb-4">
                            <div className="card h-100 animal-list mx-auto">
                                <img 
                                    src={`${VITE_URL}/${animal.imagen_url}`} 
                                    className="card-img-top img-fluid img-thumbnail object-fit-cover" 
                                    alt={animal.animalFavorito} 
                                    style={{ height: "300px" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-center text-warning">
                                        {animal.animalFavorito}
                                    </h5>
                                    <h6 className='card-title text-center'>
                                        El animal favorito del <br/>usuario "{correoUsuario?.email   }"
                                    </h6>
                                </div>
                                <div>
                                    <div className='d-flex justify-content-center'>
                                        <a
                                            href={`${VITE_API_URL}/animales/descargar/${nombreArchivo}`}
                                            className="btn btn-success downloadButton"
                                            rel="noopener noreferrer"
                                        >
                                        <i className="fa-solid fa-file-arrow-down"></i> DESCARGAR IMAGEN
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    )
                )
                :
                (
                    <h3>Aún no hay usuarios registrados</h3>
                )
            }

        </div>
    </>
  )
}
