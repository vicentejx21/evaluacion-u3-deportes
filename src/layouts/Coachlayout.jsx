import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { logout, getUser } from "../services/authService";

function CoachLayout() {
const navigate = useNavigate();
const user = getUser(); 

const handleLogout = () => {
    logout();
    navigate("/login");
};

return (
    <>
    <Navbar bg="success" variant="dark" expand="lg" className="shadow-sm mb-4">
        <Container>
        <Navbar.Brand className="fw-bold"> SportClub Coach</Navbar.Brand>
        <Navbar.Toggle aria-controls="coach-navbar" />
        <Navbar.Collapse id="coach-navbar">
            <Nav className="me-auto">
            <Link className="nav-link" to="/coach/dashboard">Mis Clases</Link>
            </Nav>
            <Nav className="align-items-center">
            <span className="text-light opacity-75 me-3 small">
                Profesor: <strong>{user?.name || user?.email || "Coach"}</strong>
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

export default CoachLayout;