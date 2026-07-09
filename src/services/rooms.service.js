const API_URL = `${import.meta.env.VITE_API_URL}/rooms`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getRooms = async () => {
    const response = await fetch(API_URL, { headers: getHeaders() });
    return await response.json();
};

export const createRoom = async (roomData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(roomData)
    });
    return await response.json();
};

export const updateRoom = async (id, roomData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(roomData)
    });
    return await response.json();
};

export const deleteRoom = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};