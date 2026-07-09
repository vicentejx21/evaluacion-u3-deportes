const API_URL = `${import.meta.env.VITE_API_URL}/class-schedules`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getClassSchedules = async () => {
    const response = await fetch(API_URL, { headers: getHeaders() });
    return await response.json();
};

export const createClassSchedule = async (data) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const updateClassSchedule = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const deleteClassSchedule = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};