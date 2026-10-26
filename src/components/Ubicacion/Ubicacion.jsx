import './Ubicacion.css';
import useRevelar from '../../hooks/useRevelar';
import ramita from '../../assets/fondos/ramita-celeste.webp';

/* ---- Datos del salón ---- */
const SALON = 'Punto Alem Eventos';
const DIRECCION = 'Avenida Alem 862';
/* Ideal: pegar acá el link de "Compartir" del salón en Google Maps */
const LINK_MAPS =
'https://www.google.com/maps/place/Punto+Alem+Eventos/@-38.7063668,-62.2772917,15z/data=!3m1!4b1!4m6!3m5!1s0x95edbb55b84f5edf:0xa7ff388c796f4ab6!8m2!3d-38.706384!4d-62.266992!16s%2Fg%2F11b77dm26x';
  encodeURIComponent(`${SALON}, ${DIRECCION}`);

function Ubicacion() {
  const refContenido = useRevelar();

  return (
    <section className="seccion ubicacion" id="ubicacion">
      <img src={ramita} alt="" aria-hidden="true" className="ubicacion__ramita ubicacion__ramita--arriba" />
      <img src={ramita} alt="" aria-hidden="true" className="ubicacion__ramita ubicacion__ramita--abajo" />

      <div className="contenido revelar" ref={refContenido}>
        <svg className="ubicacion__icono" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>

        <h2 className="titulo-script">Ubicación</h2>

        <div className="divisor-plata" />

        <p className="etiqueta">La fiesta será en</p>
        <p className="ubicacion__salon">{SALON}</p>
        <p className="ubicacion__direccion">{DIRECCION}</p>

        <a
          className="boton"
          href={LINK_MAPS}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
          Cómo llegar
        </a>
      </div>
    </section>
  );
}

export default Ubicacion;