import { Card, Row, Col, Table, Button, Badge } from "react-bootstrap";

function CoachDashboard() {
return (
    <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel del Entrenador</h2>
        <Badge bg="success" className="px-3 py-2">Rol: Entrenador / Coach</Badge>
    </div>

    <Row className="mb-4 g-3">
        <Col md={6}>
        <Card className="shadow-sm border-0 border-start border-success border-4 h-100">
            <Card.Body>
            <Card.Title className="fw-bold text-success">Clases de Hoy</Card.Title>
            <div className="mt-3">
                <p className="mb-2"> <strong>09:00 - 10:30</strong> | Crossfit Avanzado <Badge bg="secondary">Sala A</Badge></p>
                <p className="mb-0"> <strong>18:30 - 20:00</strong> | Spinning Cardio <Badge bg="secondary">Sala B</Badge></p>
            </div>
            </Card.Body>
        </Card>
        </Col>
        <Col md={6}>
        <Card className="shadow-sm border-0 border-start border-info border-4 h-100">
            <Card.Body>
            <Card.Title className="fw-bold text-info">Alumnos Citados</Card.Title>
            <Card.Text className="display-6 fw-bold mt-2">14 Asistencias</Card.Text>
            <Card.Text className="text-muted small">8 reservas pendientes de confirmación para mañana</Card.Text>
            </Card.Body>
        </Card>
        </Col>
    </Row>

    <Card className="shadow-sm border-0">
        <Card.Header className="bg-success text-white fw-semibold">
        Control de Alumnos e Inscripciones
        </Card.Header>
        <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
            <tr>
                <th>Clase / Disciplina</th>
                <th>Horario</th>
                <th>Capacidad Máxima</th>
                <th>Inscritos</th>
                <th className="text-end">Acción rápida</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><strong>Crossfit Avanzado</strong></td>
                <td>Lun - Mie - Vie (09:00)</td>
                <td>20 alumnos</td>
                <td><Badge bg="danger">20 / 20 (Lleno)</Badge></td>
                <td className="text-end">
                <Button variant="success" size="sm">Pasar Lista</Button>
                </td>
            </tr>
            <tr>
                <td><strong>Spinning Cardio</strong></td>
                <td>Mar - Jue (18:30)</td>
                <td>15 alumnos</td>
                <td><Badge bg="primary">11 / 15</Badge></td>
                <td className="text-end">
                <Button variant="success" size="sm">Pasar Lista</Button>
                </td>
            </tr>
            </tbody>
        </Table>
        </Card.Body>
    </Card>
    </div>
);
}

export default CoachDashboard;