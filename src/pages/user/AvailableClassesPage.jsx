import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAvailableClasses, createReservation } from "../../services/reservations.service";

function AvailableClassesPage() {
    const [classes, setClasses] = useState([]);

    const loadClasses = async () => {
        try {
            const response = await getAvailableClasses();
            if (response.ok) setClasses(response.data);
        } catch (error) {
            console.error("Error cargando clases:", error);
        }
    };

    useEffect(() => {
        loadClasses();
    }, []);

    const getDayName = (dayNumber) => {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        return days[dayNumber - 1] || "Día";
    };

    const handleReserve = async (scheduleId) => {
        const result = await Swal.fire({
            title: "¿Deseas reservar esta clase?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, reservar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const response = await createReservation(scheduleId);
                if (response.ok) {
                    Swal.fire("¡Reservada!", "Tu cupo está asegurado.", "success");
                } else {
                    Swal.fire("Error", response.message || "No se pudo realizar la reserva.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión al intentar reservar.", "error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Clases Disponibles</h2>
            <Button variant="primary" onClick={loadClasses} className="mb-3">Actualizar</Button>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Deporte</th>
                        <th>Sala</th>
                        <th>Día</th>
                        <th>Horario</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-4">No hay clases disponibles.</td></tr>
                    ) : (
                        classes.map((cls) => (
                            <tr key={cls.id}>
                                <td>{cls.sport_room?.sport?.name || "Deporte"}</td>
                                <td>{cls.sport_room?.room?.name || "Sala"}</td>
                                <td className="fw-bold">{getDayName(cls.day_of_week)}</td>
                                <td>{cls.start_time} - {cls.end_time}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleReserve(cls.id)}>
                                        Reservar Cupo
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default AvailableClassesPage;