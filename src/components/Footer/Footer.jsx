import './Footer.css';
import useRevelar from '../../hooks/useRevelar';
import ramillete from '../../assets/fondos/ramillete-centro.webp';

function Footer() {
  const refContenido = useRevelar();

  return (
    <footer className="pie">
      <div className="pie__contenido revelar" ref={refContenido}>
        {/* Ramillete con los colores de las flores */}
        <img src={ramillete} alt="" aria-hidden="true" className="pie__ramillete" loading="lazy" />

        <p className="pie__frase titulo-script">¡Gracias por ser parte de este día!</p>

        <p className="pie__nombre">Alba</p>

        <div className="divisor-plata pie__divisor" aria-hidden="true" />

        <p className="pie__fecha">05 · 12 · 2026</p>

        <a href="#inicio" className="pie__arriba" aria-label="Volver al inicio de la invitación">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 15l6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;