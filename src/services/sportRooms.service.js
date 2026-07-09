const API_URL = `${import.meta.env.VITE_API_URL}/sport-rooms`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getSportRooms = async () => {
    const response = await fetch(API_URL, { headers: getHeaders() });
    return await response.json();
};

export const createSportRoom = async (data) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const updateSportRoom = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const deleteSportRoom = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};