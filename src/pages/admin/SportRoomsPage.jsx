import { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { getSportRooms, createSportRoom, updateSportRoom, deleteSportRoom } from "../../services/sportRooms.service";
import { getSports } from "../../services/sports.service";
import { getRooms } from "../../services/rooms.service";

function SportRoomsPage() {
    const [sportRooms, setSportRooms] = useState([]);

    // Listas para los desplegables
    const [sportsList, setSportsList] = useState([]);
    const [roomsList, setRoomsList] = useState([]);
    const [coachesList, setCoachesList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        sport_id: "",
        room_id: "",
        coach_id: "",
        observation: "",
        status: true
    });

    // Cargar toda la información al iniciar
    const loadAllData = async () => {
        try {
            // 1. Cargar las asignaciones
            const srResponse = await getSportRooms();
            if (srResponse.ok) setSportRooms(srResponse.data);

            // 2. Cargar deportes activos para el select
            const sResponse = await getSports();
            if (sResponse.ok) setSportsList(sResponse.data.filter(s => s.status === true));

            // 3. Cargar salas activas para el select
            const rResponse = await getRooms();
            if (rResponse.ok) setRoomsList(rResponse.data.filter(r => r.status === true));

            // 4. Cargar usuarios y filtrar solo los que son "coach"
            const token = localStorage.getItem("token");
            const uResponse = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const uData = await uResponse.json();
            if (uResponse.ok) {
                setCoachesList(uData.data.filter(user => user.role === "coach"));
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setFormData({ sport_id: "", room_id: "", coach_id: "", observation: "", status: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleShowCreate = () => {
        setIsEditing(false);
        setFormData({ sport_id: "", room_id: "", coach_id: "", observation: "", status: true });
        setShowModal(true);
    };

    const handleShowEdit = (assignment) => {
        setIsEditing(true);
        setCurrentId(assignment.id);
        setFormData({
            sport_id: assignment.sport_id,
            room_id: assignment.room_id,
            coach_id: assignment.coach_id,
            observation: assignment.observation || "",
            status: assignment.status
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.sport_id || !formData.room_id || !formData.coach_id) {
            return Swal.fire("Advertencia", "Debe seleccionar un Deporte, una Sala y un Coach.", "warning");
        }

        try {
            let response;
            if (isEditing) {
                response = await updateSportRoom(currentId, formData);
            } else {
                response = await createSportRoom(formData);
            }

            if (response.ok) {
                Swal.fire("¡Éxito!", "Asignación guardada correctamente.", "success");
                handleClose();
                loadAllData(); // Refrescar tabla automáticamente
            } else {
                Swal.fire("Error", response.message || "No se pudo guardar la asignación.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Error de conexión con el servidor.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar esta asignación?",
            text: "Se borrarán los horarios vinculados a ella.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteSportRoom(id);
                if (response.ok) {
                    Swal.fire("¡Eliminada!", "La asignación ha sido borrada.", "success");
                    loadAllData();
                } else {
                    Swal.fire("Error", "No se pudo eliminar.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión.", "error");
            }
        }
    };

    // Funciones de ayuda para mostrar los nombres en la tabla en lugar de los números ID
    const getSportName = (id) => sportsList.find(s => s.id === id)?.name || "Desconocido";
    const getRoomName = (id) => roomsList.find(r => r.id === id)?.name || "Desconocida";
    const getCoachName = (id) => coachesList.find(c => c.id === id)?.full_name || "Desconocido";

    return (
        <div className="container mt-4">
            <h2>Asignación de Deportes a Salas</h2>

            <div className="d-flex mb-3 gap-2">
                <Button variant="primary" onClick={loadAllData}>Refrescar</Button>
                <Button variant="success" onClick={handleShowCreate}>+ Nueva Asignación</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Deporte</th>
                        <th>Sala</th>
                        <th>Coach Asignado</th>
                        <th>Observación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sportRooms.map((assignment) => (
                        <tr key={assignment.id}>
                            {/* Dependiendo de cómo devuelva los datos tu API, si devuelve el objeto completo o solo el ID, usamos las funciones de ayuda */}
                            <td>{assignment.sport?.name || getSportName(assignment.sport_id)}</td>
                            <td>{assignment.room?.name || getRoomName(assignment.room_id)}</td>
                            <td>{assignment.coach?.full_name || getCoachName(assignment.coach_id)}</td>
                            <td>{assignment.observation || "-"}</td>
                            <td>{assignment.status ? "Activa" : "Inactiva"}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEdit(assignment)}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(assignment.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Editar Asignación" : "Nueva Asignación"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Seleccionar Deporte</Form.Label>
                            <Form.Select
                                value={formData.sport_id}
                                onChange={(e) => setFormData({ ...formData, sport_id: Number(e.target.value) })}
                            >
                                <option value="">-- Elija un Deporte --</option>
                                {sportsList.map(sport => (
                                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Seleccionar Sala</Form.Label>
                            <Form.Select
                                value={formData.room_id}
                                onChange={(e) => setFormData({ ...formData, room_id: Number(e.target.value) })}
                            >
                                <option value="">-- Elija una Sala --</option>
                                {roomsList.map(room => (
                                    <option key={room.id} value={room.id}>{room.name} (Capacidad: {room.capacity})</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Asignar Coach</Form.Label>
                            <Form.Select
                                value={formData.coach_id}
                                onChange={(e) => setFormData({ ...formData, coach_id: Number(e.target.value) })}
                            >
                                <option value="">-- Elija un Entrenador --</option>
                                {coachesList.map(coach => (
                                    <option key={coach.id} value={coach.id}>{coach.full_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Observaciones (Opcional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Llevar implementos extra..."
                                value={formData.observation}
                                onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                            />
                        </Form.Group>

                        {!isEditing && (
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    label="Asignación Activa"
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

export default SportRoomsPage;