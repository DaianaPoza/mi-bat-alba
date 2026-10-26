import './Hero.css';
import floresArribaV from '../../assets/fondos/hero-arriba-v.webp';
import floresArribaH from '../../assets/fondos/hero-arriba-h.webp';
import floresAbajoV from '../../assets/fondos/hero-abajo-v.webp';
import floresAbajoH from '../../assets/fondos/hero-abajo-h.webp';

/* Pantallas apaisadas (más anchas que altas) usan las imágenes horizontales */
const APAISADO = '(min-aspect-ratio: 1/1)';

function Hero() {
  return (
    <header className="hero" id="inicio">
      {/* Flores de la esquina superior derecha */}
      <picture className="hero__flores-arriba" aria-hidden="true">
        <source media={APAISADO} srcSet={floresArribaH} />
        <img src={floresArribaV} alt="" />
      </picture>

      <div className="contenido hero__contenido">
        <p className="hero__subtitulo titulo-script anim-entrada" style={{ '--delay': '0.3s' }}>
          Mi Bat
        </p>

        <h1 className="hero__nombre anim-entrada" style={{ '--delay': '0.6s' }}>
          Alba
        </h1>

        <div className="divisor-plata anim-entrada" style={{ '--delay': '0.9s' }} />

        <div className="hero__fecha anim-entrada" style={{ '--delay': '1.1s' }}>
          <span className="hero__fecha-lado">Sábado</span>
          <span className="hero__fecha-dia">
            <span className="hero__fecha-numero">05</span>
            <span className="hero__fecha-mes">Diciembre</span>
          </span>
          <span className="hero__fecha-lado">19 hs</span>
        </div>

        <p className="etiqueta hero__anio anim-entrada" style={{ '--delay': '1.25s' }}>
          2026
        </p>
      </div>

      {/* Flores de abajo: van DEBAJO del texto, nunca encima */}
      <picture className="hero__flores-abajo" aria-hidden="true">
        <source media={APAISADO} srcSet={floresAbajoH} />
        <img src={floresAbajoV} alt="" />
      </picture>

      <a href="#cuenta-regresiva" className="hero__deslizar" aria-label="Ir a la siguiente sección">
        <span>Deslizá</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}

export default Hero;