import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getMyClasses } from "../../services/coach.service";

function MyClassesPage() {
    const [classes, setClasses] = useState([]);

    const loadClasses = async () => {
        try {
            const response = await getMyClasses();
            if (response.ok) {
                setClasses(response.data);
            }
        } catch (error) {
            console.error("Error cargando mis clases:", error);
        }
    };

    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Mis Clases Asignadas</h2>

            <Button variant="primary" onClick={loadClasses} className="mb-3">
                Actualizar
            </Button>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Deporte</th>
                        <th>Sala</th>
                        <th>Observaciones</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted py-4">
                                No tienes clases asignadas en este momento.
                            </td>
                        </tr>
                    ) : (
                        classes.map((c) => (
                            <tr key={c.id}>
                                {/* Mostramos los nombres que vienen desde el backend */}
                                <td>{c.sport?.name || "Desconocido"}</td>
                                <td>{c.room?.name} (Cap.: {c.room?.capacity})</td>
                                <td>{c.observation || "-"}</td>
                                <td>
                                    <span className={c.status ? "badge bg-success" : "badge bg-danger"}>
                                        {c.status ? "Activa" : "Inactiva"}
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

export default MyClassesPage;