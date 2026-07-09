import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getMySchedules } from "../../services/coach.service";

function MySchedulesPage() {
    const [schedules, setSchedules] = useState([]);

    const loadSchedules = async () => {
        try {
            const response = await getMySchedules();
            if (response.ok) {
                setSchedules(response.data);
            }
        } catch (error) {
            console.error("Error cargando mi horario:", error);
        }
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    // Función para convertir el número del día a texto
    const getDayName = (dayNumber) => {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        return days[dayNumber - 1] || "Desconocido";
    };

    return (
        <div className="container mt-4">
            <h2>Mi Horario Semanal</h2>

            <Button variant="primary" onClick={loadSchedules} className="mb-3">
                Actualizar Horario
            </Button>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Día</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Clase (Deporte)</th>
                        <th>Sala</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                                No tienes horarios asignados actualmente.
                            </td>
                        </tr>
                    ) : (
                        schedules.map((sched) => (
                            <tr key={sched.id}>
                                <td className="fw-bold">{getDayName(sched.day_of_week)}</td>
                                <td>{sched.start_time}</td>
                                <td>{sched.end_time}</td>
                                <td>{sched.sport_room?.sport?.name || "Desconocido"}</td>
                                <td>{sched.sport_room?.room?.name || "Desconocida"}</td>
                                <td>
                                    <span className={sched.status ? "badge bg-success" : "badge bg-danger"}>
                                        {sched.status ? "Activo" : "Cancelado"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default MySchedulesPage;