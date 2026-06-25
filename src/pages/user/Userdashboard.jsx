import { Card, Row, Col, Table, Button, Badge, ProgressBar } from "react-bootstrap";

function UserDashboard() {
return (
    <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mi Plan Deportivo</h2>
        <Badge bg="primary" className="px-3 py-2">Plan Activo: VIP</Badge>
    </div>

    <Row className="mb-4 g-3">
        <Col md={8}>
        <Card className="shadow-sm border-0 h-100">
            <Card.Body>
            <Card.Title className="fw-bold text-primary">Progreso de mi Rutina Mensual</Card.Title>
            <Card.Text className="text-muted small mt-1">Has completado 3 de tus 4 semanas de entrenamiento enfocado.</Card.Text>
            <div className="my-4">
                <div className="d-flex justify-content-between small fw-bold mb-1">
                <span>Objetivo de Fuerza</span>
                <span>75% completado</span>
                </div>
                <ProgressBar animated now={75} variant="primary" style={{ height: "12px" }} />
            </div>
            <Button variant="outline-primary" size="sm">Ver plan semanal completo</Button>
            </Card.Body>
        </Card>
        </Col>
        
        <Col md={4}>
        <Card className="shadow-sm border-0 bg-primary text-white h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
            <div>
                <Card.Title className="fw-bold">Tu Próxima Clase</Card.Title>
                <Card.Text className="h4 mt-3"> Spinning Cardio</Card.Text>
                <Card.Text className="small opacity-75">Hoy a las 18:30 hrs con Coach</Card.Text>
            </div>
            <Button variant="light" size="sm" className="text-primary fw-bold mt-3">Ver código de acceso</Button>
            </Card.Body>
        </Card>
        </Col>
    </Row>

    <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white fw-semibold">
        Mis Reservas de Clases
        </Card.Header>
        <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
            <tr>
                <th>Actividad</th>
                <th>Fecha y Hora</th>
                <th>Profesor</th>
                <th>Estado de Asistencia</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><strong>Crossfit Avanzado</strong></td>
                <td>Ayer - 09:00 hrs</td>
                <td>Prof. Gómez</td>
                <td><Badge bg="success">Asistido</Badge></td>
            </tr>
            <tr>
                <td><strong>Spinning Cardio</strong></td>
                <td>Hoy - 18:30 hrs</td>
                <td>Prof. Gómez</td>
                <td><Badge bg="warning" text="dark">Confirmada</Badge></td>
            </tr>
            </tbody>
        </Table>
        </Card.Body>
    </Card>
    </div>
);
}

export default UserDashboard;