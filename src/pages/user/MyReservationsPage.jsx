import { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { getMyReservations, cancelReservation } from "../../services/reservations.service";

function MyReservationsPage() {
    const [reservations, setReservations] = useState([]);

    const loadReservations = async () => {
        try {
            const response = await getMyReservations();
            if (response.ok) setReservations(response.data);
        } catch (error) {
            console.error("Error cargando reservas:", error);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const getDayName = (dayNumber) => {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        return days[dayNumber - 1] || "Día";
    };

    const handleCancel = async (reservationId) => {
        const result = await Swal.fire({
            title: "¿Cancelar tu reserva?",
            text: "Liberarás tu cupo en esta clase.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "Volver"
        });

        if (result.isConfirmed) {
            try {
                const response = await cancelReservation(reservationId);
                if (response.ok) {
                    Swal.fire("¡Cancelada!", "Tu reserva ha sido anulada.", "success");
                    loadReservations(); // Refresca en vivo
                } else {
                    Swal.fire("Error", "No se pudo cancelar.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión.", "error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Mis Reservas</h2>
            <Button variant="primary" onClick={loadReservations} className="mb-3">Actualizar</Button>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Deporte</th>
                        <th>Sala</th>
                        <th>Fecha/Hora</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-4">Aún no tienes reservas.</td></tr>
                    ) : (
                        reservations.map((res) => {
                            const schedule = res.class_schedule;
                            const isActive = res.status !== "cancelled";

                            return (
                                <tr key={res.id}>
                                    <td>{schedule?.sport_room?.sport?.name || "-"}</td>
                                    <td>{schedule?.sport_room?.room?.name || "-"}</td>
                                    <td>
                                        {getDayName(schedule?.day_of_week)} <br />
                                        <small className="text-muted">{schedule?.start_time} - {schedule?.end_time}</small>
                                    </td>
                                    <td>
                                        <Badge bg={isActive ? "success" : "secondary"}>
                                            {isActive ? "Confirmada" : "Cancelada"}
                                        </Badge>
                                    </td>
                                    <td>
                                        {isActive && (
                                            <Button variant="outline-danger" size="sm" onClick={() => handleCancel(res.id)}>
                                                Cancelar
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default MyReservationsPage;