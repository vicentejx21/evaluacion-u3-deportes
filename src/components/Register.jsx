import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Register({ onSwitchView }) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const response = await authService.register(name, email, password);
    setMessage(response.message);

    setName('');
    setEmail('');
    setPassword('');
    } catch (err) {
    setMessage('Hubo un error al registrar.');
    } finally {
    setLoading(false);
    }
};

return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', margin: 'auto' }}>
    <h3 className="text-center mb-4">Crear Cuenta</h3>

    {message && <div className="alert alert-info">{message}</div>}

    <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Nombre Completo</label>
        <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        </div>

        <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </div>

        <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
        </button>
    </form>

    <div className="text-center mt-3">
        <p className="small mb-0">
        ¿Ya tienes cuenta?{' '}
        <button className="btn btn-link p-0 small" onClick={onSwitchView}>
            Inicia sesión
        </button>
        </p>
    </div>
    </div>
);
}