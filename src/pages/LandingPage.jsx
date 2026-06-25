import { Link } from "react-router-dom";
import "./LandingPage.css"; // Enlazamos los estilos nuevos aquí

function LandingPage() {
  // ... todo tu código existente del componente ...

return (
    <div className="landing-page">
    <header>
        <img src="/img/logo.png" alt="Logo" width="400" />
        <nav>
        <a href="#nosotros">Nosotros</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#vision">Visión</a>
        
        <Link to="/login">
            <button className="btn btn-primary">Iniciar Sesión</button>
        </Link>
        </nav>
    </header>

    <main>
        <section className="hero">
        <h1>EL LÍMITE SÓLO EXISTE EN TU MENTE</h1>
        <p>No entrenamos cuerpos, forjamos voluntades. Únete a la comunidad que redefine el movimiento.</p>
        <button className="cta-button">Comenzar Ahora</button>
        </section>

        <section id="nosotros">
        <h2>Sobre SportClub</h2>
        <p>Somos más que un gimnasio; somos un centro de alto rendimiento diseñado para personas que buscan excelencia. Con instalaciones de vanguardia y un equipo de profesionales dedicados, SportClub es el lugar donde el esfuerzo se convierte en resultados tangibles.</p>
        </section>

        <section id="beneficios">
        <h2>¿Por qué entrenar con nosotros?</h2>
        <div className="card-container">
            <div className="card">
            <h3>Personalización</h3>
            <p>Planes adaptados a tu condición física y objetivos específicos.</p>
            </div>
            <div className="card">
            <h3>Comunidad</h3>
            <p>Un ambiente motivador rodeado de personas con tu misma disciplina.</p>
            </div>
            <div className="card">
            <h3>Tecnología</h3>
            <p>Seguimiento digital de tus avances mediante nuestra plataforma exclusiva.</p>
            </div>
        </div>
        </section>

        <section id="vision" className="vision-section">
        <h2>Hacia dónde vamos</h2>
        <p>Nuestra visión es convertirnos en el referente nacional de bienestar integral, expandiendo nuestras sedes y digitalizando la experiencia deportiva para que el entrenamiento no tenga fronteras.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 SportClub - Todos los derechos reservados.</p>
    </footer>
    </div>
);
}

export default LandingPage;