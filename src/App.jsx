import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect } from 'react'
import { Provider } from "react-redux";
import { store } from "./store"

export const App = () => {
  useEffect(() => {
    window.AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </Provider>
  )
};