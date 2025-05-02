import { Navigate, Route, Routes } from "react-router"
import { HomePage, AnimalPage } from "../pages/"
import { LoginPage } from "../auth/LoginPage"
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRoutes = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[]);

  return (
      <>

        <Routes>
        {
            (status === 'auth') ? 
            ( 
                <>
                    <Route path="/animales" element={<AnimalPage/>}/>
                    <Route path="/login" element={<Navigate to="/animales"/>}/>
                    <Route path="/*" element={<Navigate to="/animales"/>}/>
                </>
            ) : 
            (
                <>
                    <Route path="/login" element={<LoginPage/>}/>         
                    <Route path="/*" element={<Navigate to="/login"/>}/>
                </>
            )
        }

        </Routes>
    </>
  )
}
