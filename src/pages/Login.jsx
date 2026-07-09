import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Atrapamos el token de forma segura
                const tokenReal = data.token || data.data?.token;
                localStorage.setItem("token", tokenReal);

                // Atrapamos al usuario sin importar cómo le llame el backend
                const userData = data.user || data.usuario || data.data?.user || data;
                localStorage.setItem("user", JSON.stringify(userData));

                console.log("Usuario detectado:", userData);

                // Redireccionamiento oficial
                if (userData?.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (userData?.role === "coach") {
                    navigate("/coach/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            } else {
                setError(data.message || "Credenciales inválidas.");
            }

        } catch (err) {
            console.error(err);
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>Login SportClub</h2>

                {error && (
                    <div style={{ background: "#ffcccc", color: "red", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "left" }}>
                        <label>Correo</label>
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
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Ingresar</button>
                </form>

                <div className="auth-links">
                    {/* Enlace nuevo para recuperar contraseña */}
                    <p>¿Olvidaste tu contraseña? <Link to="/recover-password">Recupérala aquí</Link></p>
                    <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
                    <p><Link to="/">Volver al inicio</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;