import { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2"; // Librería obligatoria para alertas
import {
    getSports,
    createSport,
    updateSport,
    deleteSport,
    updateSportStatus
} from "../../services/sports.service";

function SportsPage() {
    const [sports, setSports] = useState([]);

    // Estados para controlar el Modal (ventana emergente)
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: "",
        objective: "",
        duration: "",
        status: true
    });

    // 1. Cargar datos
    const loadSports = async () => {
        try {
            const response = await getSports();
            if (response.ok) {
                setSports(response.data);
            }
        } catch (error) {
            console.error("Error cargando deportes:", error);
        }
    };

    useEffect(() => {
        loadSports();
    }, []);

    // Formato de fecha exacto
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('es-ES', { month: 'long' });
        const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
        const year = date.getFullYear();
        return `${day} de ${monthCapitalized} de ${year}`;
    };

    // 2. Cambiar Estado en vivo
    const handleStatusChange = async (id, currentStatus) => {
        try {
            const response = await updateSportStatus(id, !currentStatus);
            if (response.ok) {
                loadSports(); // Actualización automática
            }
        } catch (error) {
            console.error("Error al cambiar estado:", error);
        }
    };

    // 3. Funciones para abrir/cerrar Modal
    const handleClose = () => {
        setShowModal(false);
        setFormData({ name: "", objective: "", duration: "", status: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleShowCreate = () => {
        setIsEditing(false);
        setFormData({ name: "", objective: "", duration: "", status: true });
        setShowModal(true);
    };

    const handleShowEdit = (sport) => {
        setIsEditing(true);
        setCurrentId(sport.id);
        setFormData({
            name: sport.name,
            objective: sport.objective,
            duration: sport.duration,
            status: sport.status
        });
        setShowModal(true);
    };

    // 4. Crear o Editar Deporte
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones estrictas
        if (!formData.name) {
            return Swal.fire("Advertencia", "El nombre del deporte es obligatorio.", "warning");
        }
        if (!formData.duration || formData.duration <= 0) {
            return Swal.fire("Advertencia", "La duración es obligatoria y debe ser mayor a 0.", "warning");
        }
        if (!formData.objective) {
            return Swal.fire("Advertencia", "El objetivo es obligatorio.", "warning");
        }

        try {
            let response;
            if (isEditing) {
                response = await updateSport(currentId, formData);
            } else {
                response = await createSport(formData);
            }

            if (response.ok) {
                Swal.fire("¡Éxito!", response.message || "Operación realizada correctamente.", "success");
                handleClose();
                loadSports(); // Actualiza la tabla sin recargar la página
            } else {
                Swal.fire("Error", response.message || "No se pudo guardar la información.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Hubo un problema de conexión con el servidor.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Está seguro de eliminar este deporte?",
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
                const response = await deleteSport(id);
                if (response.ok) {
                    Swal.fire("¡Eliminado!", "El deporte ha sido borrado.", "success");
                    loadSports(); // Actualiza la tabla automáticamente
                } else {
                    Swal.fire("Error", "No se pudo eliminar el deporte.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Error de conexión al intentar eliminar.", "error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Deportes</h2>

            <div className="d-flex mb-3 gap-2">
                <Button variant="primary" onClick={loadSports}>Refrescar</Button>
                <Button variant="success" onClick={handleShowCreate}>+ Nuevo Deporte</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Objetivo</th>
                        <th>Duración</th>
                        <th>Estado</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sports.map((sport) => (
                        <tr key={sport.id}>
                            <td>{sport.name}</td>
                            <td>{sport.objective}</td>
                            <td>{sport.duration} min</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id={`switch-${sport.id}`}
                                    label={sport.status ? "Activo" : "Inactivo"}
                                    checked={sport.status}
                                    onChange={() => handleStatusChange(sport.id, sport.status)}
                                />
                            </td>
                            <td>{formatDate(sport.created_at)}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEdit(sport)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(sport.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Editar Deporte" : "Crear Nuevo Deporte"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Deporte</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. CrossFit"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Objetivo</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Ej. Mejorar fuerza y resistencia..."
                                value={formData.objective}
                                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Duración (en minutos)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ej. 60"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </Form.Group>

                        {!isEditing && (
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    label="Deporte Activo"
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

export default SportsPage;