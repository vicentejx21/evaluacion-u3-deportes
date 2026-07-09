const API_URL_MEMBER = `${import.meta.env.VITE_API_URL}/member`;
const API_URL_RESERVATIONS = `${import.meta.env.VITE_API_URL}/reservations`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

// Flujo 6: Ver clases disponibles
export const getAvailableClasses = async () => {
    const response = await fetch(`${API_URL_MEMBER}/classes`, { headers: getHeaders() });
    return await response.json();
};

// Flujo 7: Crear reserva enviando el ID del horario
export const createReservation = async (class_schedule_id) => {
    const response = await fetch(API_URL_RESERVATIONS, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ class_schedule_id })
    });
    return await response.json();
};

// Flujo 8.1: Ver mis reservas
export const getMyReservations = async () => {
    const response = await fetch(`${API_URL_RESERVATIONS}/my-reservations`, { headers: getHeaders() });
    return await response.json();
};

// Flujo 8.2: Cancelar reserva
export const cancelReservation = async (id) => {
    const response = await fetch(`${API_URL_RESERVATIONS}/${id}/cancel`, {
        method: "PATCH",
        headers: getHeaders()
    });
    return await response.json();
};