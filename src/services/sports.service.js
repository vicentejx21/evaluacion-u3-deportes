const API_URL = `${import.meta.env.VITE_API_URL}/sports`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getSports = async () => {
    const response = await fetch(API_URL, { headers: getHeaders() });
    return await response.json();
};

export const getSportById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { headers: getHeaders() });
    return await response.json();
};

export const createSport = async (sportData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sportData)
    });
    return await response.json();
};

export const updateSport = async (id, sportData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(sportData)
    });
    return await response.json();
};

export const deleteSport = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};

export const updateSportStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });
    return await response.json();
};