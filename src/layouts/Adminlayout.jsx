import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { logout, getUser } from "../services/authService";

function AdminLayout() {
const navigate = useNavigate();
const user = getUser(); 

const handleLogout = () => {
    logout();
    navigate("/login");
};

return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
        <Container>
        <Navbar.Brand className="fw-bold"> SportClub Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
            
            <Nav className="me-auto">
            <Link className="nav-link" to="/admin/dashboard">Panel de Control</Link>
            
            <Link className="nav-link" to="/admin/users">Usuarios</Link>
            </Nav>

            <Nav className="align-items-center">
            <span className="text-light opacity-75 me-3 small">
                Conectado como: <strong>{user?.name || user?.email || "Admin"}</strong>
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

export default AdminLayout;