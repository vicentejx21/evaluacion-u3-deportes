const API_URL = "http://localhost:3000/api/auth"; 

export async function loginUser(credentials) {
const response = await fetch(`${API_URL}/login`, { 
    method: "POST", 
    headers: {
    "Content-Type": "application/json", 
    },
    body: JSON.stringify(credentials), 
});

const data = await response.json(); 

if (!response.ok) { 
    throw new Error(data.message || "Error al iniciar sesión"); 
}

return data; 
}

export async function registerUser(data) {
const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

const responseData = await response.json();

if (!response.ok) {
    throw new Error(responseData.message || "Error al registrar usuario");
}

return responseData;
}

export function saveSession(token, user) {
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
return localStorage.getItem("token");
}

export const getUser = () => {
try {
    const userString = localStorage.getItem("user");
    
    // Si la memoria está vacía o tiene la palabra "undefined", no intentamos leerla
    if (!userString || userString === "undefined") {
    return null;
    }
    
    return JSON.parse(userString);
} catch (error) {
    // Si algo sale mal al leer la memoria, la limpiamos automáticamente
    console.error("Error leyendo el usuario, limpiando memoria...");
    localStorage.removeItem("user");
    return null;
}
};

export function isAuthenticated() {
return Boolean(getToken());
}

export function logout() {
localStorage.removeItem("token");
localStorage.removeItem("user");
}