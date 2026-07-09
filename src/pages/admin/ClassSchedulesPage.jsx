import { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { getClassSchedules, createClassSchedule, updateClassSchedule, deleteClassSchedule } from "../../services/classSchedules.service";
import { getSportRooms } from "../../services/sportRooms.service";
import { getSports } from "../../services/sports.service";

function ClassSchedulesPage() {
    const [schedules, setSchedules] = useState([]);
    const [sportRoomsList, setSportRoomsList] = useState([]);
    const [sportsList, setSportsList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        sport_room_id: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        status: true
    });

    const loadAllData = async () => {
        try {
            // Cargar horarios
            const schedResponse = await getClassSchedules();
            if (schedResponse.ok) setSchedules(schedResponse.data);

            // Cargar asignaciones (SportRooms)
            const srResponse = await getSportRooms();
            if (srResponse.ok) setSportRoomsList(srResponse.data.filter(sr => sr.status === true));

            // Cargar deportes para poder mostrar el nombre bonito en el select
            const sResponse = await getSports();
            if (sResponse.ok) setSportsList(sResponse.data);

        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setFormData({ sport_room_id: "", day_of_week: "", start_time: "", end_time: "", status: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleShowCreate = () => {
        setIsEditing(false);
        setFormData({ sport_room_id: "", day_of_week: "", start_time: "", end_time: "", status: true });
        setShowModal(true);
    };

    const handleShowEdit = (schedule) => {
        setIsEditing(true);
        setCurrentId(schedule.id);
        setFormData({
            sport_room_id: schedule.sport_room_id,
            day_of_week: schedule.day_of_week,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            status: schedule.status
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.sport_room_id || !formData.day_of_week || !formData.start_time || !formData.end_time) {
            return Swal.fire("Advertencia", "Todos los campos son obligatorios.", "warning");
        }

        try {
            let response;
            if (isEditing) {
                response = await updateClassSchedule(currentId, formData);
            } else {
                response = await createClassSchedule(formData);
            }

            if (response.ok) {
                Swal.fire("¡Éxito!", "Horario guardado correctamente.", "success");
                handleClose();
                loadAllData();
            } else {
                Swal.fire("Error", response.message || "No se pudo guardar.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Error de conexión con el servidor.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar este horario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteClassSchedule(id);
                if (response.ok) {
                    Swal.fire("¡Eliminado!", "El horario ha sido borrado.", "success");
                    loadAllData();
                } else {
                    Swal.fire("Error", "No se pudo eliminar.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión.", "error");
            }
        }
    };

    // Convertir número de día a texto
    const getDayName = (dayNumber) => {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        return days[dayNumber - 1] || "Desconocido";
    };

    // Obtener nombre del deporte basado en la asignación
    const getAssignmentName = (sportRoomId) => {
        const sr = sportRoomsList.find(item => item.id === sportRoomId);
        if (!sr) return "Asignación no encontrada";
        const sportName = sportsList.find(s => s.id === sr.sport_id)?.name || "Deporte";
        return `${sportName} (Sala ID: ${sr.room_id})`;
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Horarios</h2>

            <div className="d-flex mb-3 gap-2">
                <Button variant="primary" onClick={loadAllData}>Refrescar</Button>
                <Button variant="success" onClick={handleShowCreate}>+ Nuevo Horario</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Clase (Deporte/Sala)</th>
                        <th>Día</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.sport_room?.sport?.name || getAssignmentName(schedule.sport_room_id)}</td>
                            <td>{getDayName(schedule.day_of_week)}</td>
                            <td>{schedule.start_time}</td>
                            <td>{schedule.end_time}</td>
                            <td>{schedule.status ? "Activo" : "Inactivo"}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEdit(schedule)}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(schedule.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Editar Horario" : "Nuevo Horario"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Seleccionar Asignación (Clase)</Form.Label>
                            <Form.Select
                                value={formData.sport_room_id}
                                onChange={(e) => setFormData({ ...formData, sport_room_id: Number(e.target.value) })}
                            >
                                <option value="">-- Elija una clase --</option>
                                {sportRoomsList.map(sr => (
                                    <option key={sr.id} value={sr.id}>
                                        {getAssignmentName(sr.id)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Día de la semana</Form.Label>
                            <Form.Select
                                value={formData.day_of_week}
                                onChange={(e) => setFormData({ ...formData, day_of_week: Number(e.target.value) })}
                            >
                                <option value="">-- Seleccione un día --</option>
                                <option value="1">Lunes</option>
                                <option value="2">Martes</option>
                                <option value="3">Miércoles</option>
                                <option value="4">Jueves</option>
                                <option value="5">Viernes</option>
                                <option value="6">Sábado</option>
                                <option value="7">Domingo</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hora de Inicio</Form.Label>
                            <Form.Control
                                type="time"
                                value={formData.start_time}
                                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hora de Fin</Form.Label>
                            <Form.Control
                                type="time"
                                value={formData.end_time}
                                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                            />
                        </Form.Group>

                        {!isEditing && (
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    label="Horario Activo"
                                    checked={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                                />
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ClassSchedulesPage;