import { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../../services/rooms.service";

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        capacity: "",
        location: "",
        status: true
    });

    const loadRooms = async () => {
        try {
            const response = await getRooms();
            if (response.ok) {
                setRooms(response.data);
            }
        } catch (error) {
            console.error("Error cargando salas:", error);
        }
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setFormData({ name: "", description: "", capacity: "", location: "", status: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleShowCreate = () => {
        setIsEditing(false);
        setFormData({ name: "", description: "", capacity: "", location: "", status: true });
        setShowModal(true);
    };

    const handleShowEdit = (room) => {
        setIsEditing(true);
        setCurrentId(room.id);
        setFormData({
            name: room.name,
            description: room.description || "",
            capacity: room.capacity,
            location: room.location || "",
            status: room.status
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.capacity) {
            return Swal.fire("Advertencia", "El nombre y la capacidad son obligatorios.", "warning");
        }

        try {
            let response;
            if (isEditing) {
                response = await updateRoom(currentId, formData);
            } else {
                response = await createRoom(formData);
            }

            if (response.ok) {
                Swal.fire("¡Éxito!", "Sala guardada correctamente.", "success");
                handleClose();
                loadRooms();
            } else {
                Swal.fire("Error", response.message || "No se pudo guardar la sala.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Error de conexión con el servidor.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar esta sala?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteRoom(id);
                if (response.ok) {
                    Swal.fire("¡Eliminada!", "La sala ha sido borrada.", "success");
                    loadRooms();
                } else {
                    Swal.fire("Error", "No se pudo eliminar la sala.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión al intentar eliminar.", "error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Salas</h2>

            <div className="d-flex mb-3 gap-2">
                <Button variant="primary" onClick={loadRooms}>Refrescar</Button>
                <Button variant="success" onClick={handleShowCreate}>+ Nueva Sala</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.name}</td>
                            <td>{room.capacity} personas</td>
                            <td>{room.location}</td>
                            <td>{room.status ? "Activa" : "Inactiva"}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEdit(room)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(room.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Editar Sala" : "Crear Nueva Sala"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Sala</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Sala de Pesas"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Capacidad (personas)</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Piso 1"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </Form.Group>

                        {!isEditing && (
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    label="Sala Activa"
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

export default RoomsPage;