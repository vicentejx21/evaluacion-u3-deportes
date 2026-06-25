import { Card, Row, Col, Table, Button, Badge } from "react-bootstrap";

function AdminDashboard() {
return (
    <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración Global</h2>
        <Badge bg="dark" className="px-3 py-2">Rol: Administrador</Badge>
    </div>

    <Row className="mb-4 g-3">
        <Col md={4}>
        <Card className="shadow-sm border-0 bg-light text-dark h-100">
            <Card.Body>
            <Card.Title className="text-muted small text-uppercase">Total Usuarios</Card.Title>
            <Card.Text className="display-5 fw-bold">1,240</Card.Text>
            <Card.Footer className="bg-transparent border-0 px-0 text-success small">
                ▲ +12% este mes
            </Card.Footer>
            </Card.Body>
        </Card>
        </Col>
        <Col md={4}>
        <Card className="shadow-sm border-0 bg-light text-dark h-100">
            <Card.Body>
            <Card.Title className="text-muted small text-uppercase">Entrenadores Activos</Card.Title>
            <Card.Text className="display-5 fw-bold">18</Card.Text>
            <Card.Footer className="bg-transparent border-0 px-0 text-primary small">
                2 nuevas solicitudes
            </Card.Footer>
            </Card.Body>
        </Card>
        </Col>
        <Col md={4}>
        <Card className="shadow-sm border-0 bg-light text-dark h-100">
            <Card.Body>
            <Card.Title className="text-muted small text-uppercase">Ingresos Mensuales</Card.Title>
            <Card.Text className="display-5 fw-bold">$4.5M</Card.Text>
            <Card.Footer className="bg-transparent border-0 px-0 text-success small">
                Meta del mes alcanzada
            </Card.Footer>
            </Card.Body>
        </Card>
        </Col>
    </Row>

    <Card className="shadow-sm border-0">
        <Card.Header className="bg-dark text-white fw-semibold">
        Últimos Usuarios Registrados
        </Card.Header>
        <Card.Body className="p-0">
        <Table responsive hover striped className="mb-0 align-middle">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Plan contratado</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Carlos Mendoza</td>
                <td>carlos@mail.com</td>
                <td>Premium Anual</td>
                <td><Badge bg="success">Activo</Badge></td>
                <td className="text-end">
                <Button variant="outline-dark" size="sm" className="me-2">Editar</Button>
                </td>
            </tr>
            <tr>
                <td>Sofía Valenzuela</td>
                <td>sofia.v@mail.com</td>
                <td>Mensual Básico</td>
                <td><Badge bg="warning" text="dark">Pendiente</Badge></td>
                <td className="text-end">
                <Button variant="outline-dark" size="sm" className="me-2">Editar</Button>
                </td>
            </tr>
            </tbody>
        </Table>
        </Card.Body>
    </Card>
    </div>
);
}

export default AdminDashboard;