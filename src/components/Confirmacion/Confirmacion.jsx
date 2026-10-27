import { useEffect, useRef, useState } from 'react';
import './Confirmacion.css';
import useRevelar from '../../hooks/useRevelar';
import ramo from '../../assets/fondos/ramo-celeste.webp';
import ramita from '../../assets/fondos/ramita-celeste.webp';

/* Pegar acá la URL de la aplicación web de Google Apps Script (termina en /exec) */
const URL_APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbx5HBYYJER3zYhI7eIMrfzvOXGMXzlKn14SFmjNwQHuR_Ae7qF211sPBhefP8et_v8/exec';

const MAX_PERSONAS = 8;

/* Tienen que ser IGUALES a las del Apps Script */
const RESTRICCIONES = ['Sin gluten (celíaco/a)', 'Vegetariano/a', 'Vegano/a', 'Alergia', 'Otra'];

/* Texto corto que se ve en cada botón */
const ETIQUETA_CORTA = {
  'Sin gluten (celíaco/a)': 'Sin gluten',
  'Vegetariano/a': 'Vegetariano',
  'Vegano/a': 'Vegano',
  Alergia: 'Alergia',
  Otra: 'Otra',
};

const personaVacia = () => ({
  nombre: '',
  tieneRestriccion: 'no', // 'si' | 'no'
  restricciones: [],
  alergia: '',
  otra: '',
});

const tituloPersona = (i) => (i === 0 ? 'Tus datos' : `Acompañante ${i}`);

function Confirmacion() {
  const refContenido = useRevelar();
  const refGracias = useRef(null);

  const [nombre, setNombre] = useState('');
  const [asistencia, setAsistencia] = useState(''); // 'si' | 'no'
  const [personas, setPersonas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  /* Al enviar, lleva la pantalla al mensaje de éxito (después se puede seguir scrolleando) */
  useEffect(() => {
    if (resultado && refGracias.current) {
      refGracias.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      refGracias.current.focus({ preventScroll: true });
    }
  }, [resultado]);

  /* Al cambiar la cantidad, ajusta las tarjetas de personas (conserva lo ya completado) */
  const cambiarCantidad = (valor) => {
    const n = Number(valor) || 0;
    setPersonas((prev) => Array.from({ length: n }, (_, i) => prev[i] || personaVacia()));
  };

  const cambiarPersona = (indice, cambios) => {
    setPersonas((prev) => prev.map((p, i) => (i === indice ? { ...p, ...cambios } : p)));
  };

  const alternarRestriccion = (indice, restriccion) => {
    const actuales = personas[indice].restricciones;
    cambiarPersona(indice, {
      restricciones: actuales.includes(restriccion)
        ? actuales.filter((r) => r !== restriccion)
        : [...actuales, restriccion],
    });
  };

  const validar = () => {
    if (!nombre.trim()) return 'Por favor, escribí tu nombre y apellido.';
    if (!asistencia) return 'Contanos si vas a asistir.';
    if (asistencia === 'no') return '';
    if (personas.length === 0) return 'Elegí cuántas personas asistirán.';

    for (let i = 0; i < personas.length; i++) {
      const p = personas[i];
      const quien = i === 0 ? 'vos' : `Acompañante ${i}`;

      if (i > 0 && !p.nombre.trim()) return `Escribí el nombre y apellido de Acompañante ${i}.`;
      if (p.tieneRestriccion === 'si') {
        if (p.restricciones.length === 0) return `Elegí al menos una restricción para ${quien}.`;
        if (p.restricciones.includes('Alergia') && !p.alergia.trim())
          return `Contanos a qué es alérgico/a (${quien}).`;
        if (p.restricciones.includes('Otra') && !p.otra.trim())
          return `Contanos cuál es la otra restricción (${quien}).`;
      }
    }
    return '';
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (enviando) return; // evita envíos dobles

    const problema = validar();
    setError(problema);
    if (problema) return;

    const datos = {
      nombre: nombre.trim(),
      asistencia,
      personas:
        asistencia === 'si'
          ? personas.map((p, i) => {
              const tiene = p.tieneRestriccion === 'si';
              return {
                nombre: i === 0 ? nombre.trim() : p.nombre.trim(),
                restricciones: tiene ? p.restricciones : [],
                alergia: tiene && p.restricciones.includes('Alergia') ? p.alergia.trim() : '',
                otra: tiene && p.restricciones.includes('Otra') ? p.otra.trim() : '',
              };
            })
          : [],
      mensaje: mensaje.trim(),
    };

    setEnviando(true);
    try {
      const respuesta = await fetch(URL_APPS_SCRIPT, {
        method: 'POST',
        /* text/plain evita el bloqueo de CORS con Apps Script */
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(datos),
      });
      const json = await respuesta.json();
      if (!json.ok) throw new Error(json.error);

      setResultado(datos);
    } catch {
      setError('No pudimos enviar tu confirmación. Revisá tu conexión y probá de nuevo.');
    } finally {
      setEnviando(false);
    }
  };



  return (
    <section className="seccion confirmacion" id="confirmacion">
      <img src={ramo} alt="" aria-hidden="true" className="confirmacion__ramo" />
      <img src={ramita} alt="" aria-hidden="true" className="confirmacion__ramita" />

      <div className="contenido revelar" ref={refContenido}>
        {/* Sobre / carta */}
        <svg className="confirmacion__icono" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="1.5" />
          <path d="M3.5 7 12 13.2 20.5 7" />
        </svg>

        <h2 className="titulo-script">Confirmá tu asistencia</h2>

        <div className="divisor-plata" />

        {resultado ? (
          /* ---------- Mensaje de éxito ---------- */
          <div className="gracias" ref={refGracias} tabIndex={-1} role="status">
            <span className="gracias__check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.2 4.2L19 7" />
              </svg>
            </span>

            <p className="gracias__titulo">¡Listo, {resultado.nombre.split(' ')[0]}!</p>
            <p className="gracias__principal">Tu confirmación fue enviada con éxito.</p>

            <p className="gracias__detalle">
              {resultado.asistencia === 'si'
                ? `Registramos ${resultado.personas.length} ${
                    resultado.personas.length === 1 ? 'persona' : 'personas'
                  }. ¡Te esperamos para celebrar juntos!`
                : 'Registramos que no vas a poder asistir. ¡Te vamos a extrañar!'}
            </p>

          
          </div>
        ) : (
          <>
            <p className="confirmacion__intro">
              Nos encantaría que seas parte de este día. Contanos si podés acompañarnos.
            </p>

            <form className="formulario" onSubmit={enviar} noValidate>
              {/* Nombre de quien completa */}
              <div className="campo">
                <label className="campo__etiqueta" htmlFor="rsvp-nombre">
                  Tu nombre y apellido
                </label>
                <input
                  id="rsvp-nombre"
                  className="campo__control"
                  type="text"
                  placeholder="Ej.: Laura Gómez"
                  autoComplete="name"
                  maxLength={100}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              {/* Asistencia */}
              <fieldset className="campo">
                <legend className="campo__etiqueta">¿Vas a asistir?</legend>
                <div className="opciones">
                  <button
                    type="button"
                    className={`opcion ${asistencia === 'si' ? 'opcion--activa' : ''}`}
                    aria-pressed={asistencia === 'si'}
                    onClick={() => setAsistencia('si')}
                  >
                    Sí, asistiré
                  </button>
                  <button
                    type="button"
                    className={`opcion ${asistencia === 'no' ? 'opcion--activa' : ''}`}
                    aria-pressed={asistencia === 'no'}
                    onClick={() => setAsistencia('no')}
                  >
                    No podré asistir
                  </button>
                </div>
              </fieldset>

              {asistencia === 'si' && (
                <>
                  {/* Cantidad */}
                  <div className="campo">
                    <label className="campo__etiqueta" htmlFor="rsvp-cantidad">
                      ¿Cuántas personas asistirán en total?
                    </label>
                    <span className="campo__ayuda">Incluyéndote a vos</span>
                    <select
                      id="rsvp-cantidad"
                      className="campo__control campo__select"
                      value={personas.length || ''}
                      onChange={(e) => cambiarCantidad(e.target.value)}
                    >
                      <option value="">Elegí una opción</option>
                      {Array.from({ length: MAX_PERSONAS }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n === 1
                            ? '1 persona (solo yo)'
                            : `${n} personas (yo + ${n - 1} ${
                                n - 1 === 1 ? 'acompañante' : 'acompañantes'
                              })`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Una tarjeta por persona */}
                  {personas.map((p, i) => (
                    <fieldset className="persona" key={i}>
                      <legend className="persona__titulo">{tituloPersona(i)}</legend>

                      {/* Nombre */}
                      {i === 0 ? (
                        <div className="persona__campo">
                          <span className="campo__etiqueta">Nombre y apellido</span>
                          <p className={`persona__nombre ${nombre.trim() ? '' : 'persona__nombre--vacio'}`}>
                            {nombre.trim() || 'Completá tu nombre arriba'}
                          </p>
                        </div>
                      ) : (
                        <div className="persona__campo">
                          <label className="campo__etiqueta" htmlFor={`rsvp-persona-${i}`}>
                            Nombre y apellido
                          </label>
                          <input
                            id={`rsvp-persona-${i}`}
                            className="campo__control"
                            type="text"
                            placeholder="Nombre y apellido"
                            maxLength={100}
                            value={p.nombre}
                            onChange={(e) => cambiarPersona(i, { nombre: e.target.value })}
                          />
                        </div>
                      )}

                      {/* ¿Tiene restricciones? */}
                      <div className="persona__campo">
                        <span className="campo__etiqueta" id={`rsvp-tiene-${i}`}>
                          ¿Tiene restricciones alimentarias?
                        </span>
                        <div className="opciones opciones--chicas" role="group" aria-labelledby={`rsvp-tiene-${i}`}>
                          {['si', 'no'].map((valor) => (
                            <button
                              key={valor}
                              type="button"
                              className={`opcion ${p.tieneRestriccion === valor ? 'opcion--activa' : ''}`}
                              aria-pressed={p.tieneRestriccion === valor}
                              onClick={() => cambiarPersona(i, { tieneRestriccion: valor })}
                            >
                              {valor === 'si' ? 'Sí' : 'No'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cuáles (se pueden elegir varias) */}
                      {p.tieneRestriccion === 'si' && (
                        <div className="persona__campo">
                          <span className="campo__etiqueta" id={`rsvp-cuales-${i}`}>
                            Elegí una o varias opciones
                          </span>
                          <div className="chips" role="group" aria-labelledby={`rsvp-cuales-${i}`}>
                            {RESTRICCIONES.map((r) => (
                              <button
                                key={r}
                                type="button"
                                className={`chip ${p.restricciones.includes(r) ? 'chip--activa' : ''}`}
                                aria-pressed={p.restricciones.includes(r)}
                                onClick={() => alternarRestriccion(i, r)}
                              >
                                {ETIQUETA_CORTA[r]}
                              </button>
                            ))}
                          </div>

                          {p.restricciones.includes('Alergia') && (
                            <input
                              className="campo__control persona__detalle"
                              type="text"
                              placeholder="¿A qué es alérgico/a? Ej.: maní, mariscos"
                              aria-label={`Alergia de ${tituloPersona(i)}`}
                              maxLength={100}
                              value={p.alergia}
                              onChange={(e) => cambiarPersona(i, { alergia: e.target.value })}
                            />
                          )}

                          {p.restricciones.includes('Otra') && (
                            <input
                              className="campo__control persona__detalle"
                              type="text"
                              placeholder="¿Cuál otra restricción?"
                              aria-label={`Otra restricción de ${tituloPersona(i)}`}
                              maxLength={100}
                              value={p.otra}
                              onChange={(e) => cambiarPersona(i, { otra: e.target.value })}
                            />
                          )}
                        </div>
                      )}
                    </fieldset>
                  ))}
                </>
              )}

              {/* Mensaje */}
              <div className="campo">
                <label className="campo__etiqueta" htmlFor="rsvp-mensaje">
                  Mensaje para Alba
                </label>
                <span className="campo__ayuda">Opcional</span>
                <textarea
                  id="rsvp-mensaje"
                  className="campo__control campo__textarea"
                  rows="4"
                  maxLength={500}
                  placeholder="Escribí unas palabras si querés"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>

              {error && (
                <p className="formulario__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="boton formulario__enviar" disabled={enviando}>
                {enviando ? 'Enviando…' : 'Enviar confirmación'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Confirmacion;