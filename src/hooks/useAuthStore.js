import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { userToken, getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const { VITE_API_URL } = getEnvVariables();


    const startLogin = async ({email, password}) => {
        dispatch(onChecking());
        try {
          const response = await fetch(`${VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password }),
            credentials: 'include',
          });

          const data = await response.json();

          if(response.ok && data.token){
            localStorage.setItem('token', data.token)
            const user = userToken();
            
            dispatch(onLogin({rol: user.rol, _id: user._id, nombre: user.nombre}))
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "Serás redirigido a la página de inicio",
            });
          } else {
              dispatch(onLogout('Credenciales Inválidas'));
              Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
              });
              setTimeout(() => {
                  dispatch(clearErrorMessage());
              }, 50);
          };

        } catch (error) {
          console.error("Error: ", error);
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
          });
        };
    };

    const startRegister = async({ email, password }) => {
      dispatch(onChecking());
      try {
        const response = await fetch(`${VITE_API_URL}/usuarios/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
            const loginResponse = await fetch(`${VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), 
                credentials: 'include', 
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok) {
                const user = userToken();  
                dispatch(onLogin({ rol: user.rol, _id: user._id })); 
                Swal.fire({
                    icon: "success",
                    title: "Te has registrado y autenticado correctamente",
                    text: "Serás redirigido a la página de inicio"
                });
            } else {
                dispatch(onLogout(loginData?.message || 'Error al iniciar sesión'));
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 50);
            }
        } else {
            dispatch(onLogout(data?.message || 'Error al registrar un usuario'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 50);
        }
      } catch (error) {
          console.error("error:", error);
          Swal.fire({
            icon: "error",
            title: "Error al registrarte",
            text: "Por favor, intenta más tarde"
          });
      };
   };

   const checkAuthToken = async() => {
    const token = Cookies.get('Bearer');
    if (!token) return dispatch(onLogout());
      try {
          const user = userToken();  
          dispatch(onLogin({ rol: user.rol, _id: user._id, nombre: user.nombre })); 
      } catch (error) {
          dispatch(onLogout(error));
      }
  };

  const startLogout = async() => {
    try {
      await fetch(`${VITE_API_URL}/auth/logout`, {
          method: "DELETE",
          credentials: "include", 
      });

      localStorage.removeItem('token');
      dispatch(onLogout());
      Swal.fire({
        icon: "success",
        title: "Sesión Cerrada",
      });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
  };

  return {
    status, user, errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}
