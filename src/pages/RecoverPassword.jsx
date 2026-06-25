import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css"; // Usamos el mismo diseño que en Login

function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            // =========================================================
            // Aquí iría tu petición real al backend, por ejemplo:
            // await fetch("http://localhost:3000/api/auth/recover", ...)
            // =========================================================

            // Simulamos que el sistema procesa la solicitud
            setMessage("Si el correo ingresado está registrado, te enviaremos las instrucciones para restablecer tu contraseña.");
            setEmail(""); // Limpiamos el campo
        } catch (err) {
            setError("Error al intentar procesar la solicitud.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>Recuperar Contraseña</h2>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                    Ingresa tu correo electrónico y te enviaremos un enlace para que puedas crear una nueva contraseña.
                </p>

                {/* Mensaje de éxito en verde */}
                {message && (
                    <div style={{ background: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px" }}>
                        {message}
                    </div>
                )}

                {/* Mensaje de error en rojo */}
                {error && (
                    <div style={{ background: "#ffcccc", color: "red", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "left" }}>
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="Ej. usuario@demo.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Enviar enlace</button>
                </form>

                <div className="auth-links">
                    <p>¿Recordaste tu contraseña? <Link to="/login">Vuelve al Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RecoverPassword;