import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { logout, getUser } from "../services/authService";

function UserLayout() {
const navigate = useNavigate();
const user = getUser(); 

const handleLogout = () => {
    logout();
    navigate("/login");
};

return (
    <>
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm mb-4">
        <Container>
        <Navbar.Brand className="fw-bold"> Mi SportClub</Navbar.Brand>
        <Navbar.Toggle aria-controls="user-navbar" />
        <Navbar.Collapse id="user-navbar">
            <Nav className="me-auto">
            <Link className="nav-link" to="/user/dashboard">Mi Progreso</Link>
            </Nav>
            <Nav className="align-items-center">
            <span className="text-light opacity-75 me-3 small">
                Hola, <strong>{user?.name || user?.email || "Usuario"}</strong>
            </span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Cerrar sesión
            </Button>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    
    <Container>
        <Outlet />
    </Container>
    </>
);
}

export default UserLayout;