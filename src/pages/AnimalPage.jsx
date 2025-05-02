import { FormAnimal } from "../components/FormAnimal"
import { ListAnimals } from "../components/ListAnimals";
import { NavBar } from "../components/Navbar"
import { useAuthStore } from "../hooks";

export const AnimalPage = () => {

    const { user } = useAuthStore();

  return (
    <div id="ContainerPrincipal" >
        <div>
            <NavBar/>
        </div>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="row">
                {
                    (user.rol === 'Admin') ?
                    (
                        <ListAnimals/>
                    )
                    : 
                    (
                        <FormAnimal />
                    )
                }
            </div>
        </div>
    </div>
  )
}
