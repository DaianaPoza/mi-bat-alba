import './Album.css';
import useRevelar from '../../hooks/useRevelar';
import ramillete from '../../assets/fondos/ramillete-centro.webp';

/* Pegar acá el link del álbum compartido */
const LINK_ALBUM = 'PEGAR_LINK_DEL_ALBUM';

function Album() {
  const refContenido = useRevelar();

  return (
    <section className="seccion album" id="album">
      {/* Ramillete centrado: uno cuelga desde arriba y otro crece desde abajo */}
      <img src={ramillete} alt="" aria-hidden="true" className="album__ramillete album__ramillete--arriba" />
      <img src={ramillete} alt="" aria-hidden="true" className="album__ramillete album__ramillete--abajo" />

      <div className="contenido revelar" ref={refContenido}>
        {/* Cámara de fotos */}
        <svg className="album__icono" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h3l1.6-2.2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          <circle cx="12" cy="13.2" r="3.6" />
          <circle cx="18" cy="10.4" r="0.4" />
        </svg>

        <h2 className="titulo-script">Álbum compartido</h2>

        <div className="divisor-plata" />

        <p className="album__texto">
          Queremos guardar cada momento de esta noche... <br /> Subí tus fotos 
          al álbum <br />y revivamos juntos la fiesta
        </p>

        <a
          className="boton"
          href={LINK_ALBUM}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16V4" />
            <path d="M7 9l5-5 5 5" />
            <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
          </svg>
          Subir fotos
        </a>
      </div>
    </section>
  );
}

export default Album;