import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const NavBar = () => {

  const { user, status, startLogout } = useAuthStore();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-black custom-navbar-border" style={{ borderBottom: '2px solid rgb(204 200 195)'}}>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={({isActive}) => `nav-item nav-link text-light ${isActive ? 'active' : ''}`} to="/animales">
              Animales
            </NavLink>
          </Nav>

          <Nav>
            <NavLink className={({isActive}) => `nav-item nav-link text-light (${isActive ? 'active' : ''}`} onClick={startLogout} >
                <i className="fa-regular fa-circle-user text-light"></i>  {user.nombre}
                Cerrar Sesión
            </NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
