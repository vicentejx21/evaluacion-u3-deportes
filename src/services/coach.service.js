const API_URL = `${import.meta.env.VITE_API_URL}/coach`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

// Trae las asignaciones (Deporte + Sala) del coach que inició sesión
export const getMyClasses = async () => {
    const response = await fetch(`${API_URL}/my-classes`, { headers: getHeaders() });
    return await response.json();
};

// Trae los horarios exactos del coach que inició sesión
export const getMySchedules = async () => {
    const response = await fetch(`${API_URL}/my-schedules`, { headers: getHeaders() });
    return await response.json();
};