import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensajeExito("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // AQUÍ ESTÁ LA MAGIA: Le pasamos "full_name" en vez de "name" o "nombre"
                body: JSON.stringify({ full_name: nombre, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMensajeExito("¡Usuario creado con éxito! Redirigiendo al Login...");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                // Si sigue habiendo un error, esta línea nos mostrará exactamente qué campo falta
                console.log("Errores del backend:", data.errors);
                setError(data.message || "No se pudo registrar. Revisa los datos.");
            }

        } catch (err) {
            console.error(err);
            setError("Error al conectar con el servidor. ¿Está encendido el backend?");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>Únete a SportClub</h2>

                {error && (
                    <div style={{ background: "#ffcccc", color: "red", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                        {error}
                    </div>
                )}

                {mensajeExito && (
                    <div style={{ background: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontWeight: "bold" }}>
                        {mensajeExito}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "left" }}>
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            placeholder="Ej. Juan Pérez"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ textAlign: "left", marginTop: "10px" }}>
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ textAlign: "left", marginTop: "10px" }}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Crea una contraseña segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Crear cuenta</button>
                </form>

                <div className="auth-links">
                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                    <p><Link to="/">Volver al inicio</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;