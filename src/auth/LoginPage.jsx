import { useEffect, useState } from 'react';
import { useAuthStore, useForm } from "../hooks";
import Swal from "sweetalert2";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const loginInitialValue = {
    loginEmail: '',
    loginPassword: ''
};

const registerInitialValue = {
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirmation: ''
};

export const LoginPage = () => {
    const [ isVisible, setIsVisible ] = useState(true);

    const { loginEmail, loginPassword, onInputChange: onInputLoginChange } = useForm(loginInitialValue);
    const { registerEmail, registerPassword, registerPasswordConfirmation, onInputChange: onInputRegisterChange, onResetForm } = useForm(registerInitialValue);

    const { startLogin, startRegister } = useAuthStore();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onToogleLoginRegister = () => {
        setIsVisible(!isVisible);
    };

    const onLogin = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    };

    const onRegister = (e) => {
        e.preventDefault();
        if(!emailRegex.test(registerEmail)) return Swal.fire('Error en el registro', 'Correo Inválido', 'error');
        if(registerPassword != registerPasswordConfirmation) return Swal.fire('Error en el registro', 'Contraseñas no coinciden', 'error');
        startRegister({email: registerEmail, password: registerPassword})
    };

  return (
    <>
      <div id="LoginContainer" className="container-fluid login-container" >
        <div className="row">
            
          <div className="col-md-6 login-form-1" style={{ display: isVisible ? 'block' : 'none' }} data-aos="fade-up">
            <h3>Ingresa</h3>
            <form onSubmit={onLogin}>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  name='loginEmail'
                  value={loginEmail}
                  onChange={onInputLoginChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onInputLoginChange}
                />
              </div>
              <div className="form-group mb-2 text-center">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Conectar"
                />
              </div>
            </form>

            <div className='text-end'>
                <small onClick={onToogleLoginRegister} style={{ cursor: 'pointer'}}>
                    ¿No tienes cuenta?
                </small>
            </div>
          </div>

          <div className="col-md-6 login-form-2" style={{ display: isVisible ? 'none' : 'block' }}>
            <h3>Regístrate</h3>
            <form onSubmit={onRegister}>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name='registerEmail'
                  value={registerEmail}
                  onChange={onInputRegisterChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name='registerPassword'
                  value={registerPassword}
                  onChange={onInputRegisterChange}
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name='registerPasswordConfirmation'
                  value={registerPasswordConfirmation}
                  onChange={onInputRegisterChange}
                />
              </div>

            
            <div className="form-group mb-2 text-center">
                <input
                    type="submit"
                    className="btnSubmit"
                    value="Crear Cuenta"
                />
            </div>

            <div className="form-group mb-2 text-center ">
                <input
                    type="submit"
                    className="btnSubmit "
                    value="Limpiar"
                    onClick={onResetForm}
                    style={{ background: 'gray'}}
                />
            </div>

            </form>

            <div className='text-end'>
                <small onClick={onToogleLoginRegister} style={{ cursor: 'pointer', textAlign: 'end'}}>
                    ¿Ya tienes cuenta?
                </small>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
