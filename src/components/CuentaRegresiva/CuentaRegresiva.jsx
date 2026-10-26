import { useEffect, useState } from 'react';
import './CuentaRegresiva.css';
import useRevelar from '../../hooks/useRevelar';
import ramita from '../../assets/fondos/ramita-celeste.webp';

/* 5 de diciembre de 2026, 19 hs (hora de Argentina) */
const FECHA_EVENTO = new Date('2026-12-05T19:00:00-03:00').getTime();

function calcularTiempo() {
  const diferencia = FECHA_EVENTO - Date.now();
  if (diferencia <= 0) return null;

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

const dosDigitos = (n) => String(n).padStart(2, '0');

function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(calcularTiempo);
  const refContenido = useRevelar();

  useEffect(() => {
    const intervalo = setInterval(() => setTiempo(calcularTiempo()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const unidades = tiempo && [
    { valor: tiempo.dias, etiqueta: tiempo.dias === 1 ? 'Día' : 'Días' },
    { valor: dosDigitos(tiempo.horas), etiqueta: 'Horas' },
    { valor: dosDigitos(tiempo.minutos), etiqueta: 'Min' },
    { valor: dosDigitos(tiempo.segundos), etiqueta: 'Seg' },
  ];

  return (
    <section className="seccion cuenta" id="cuenta-regresiva">
      {/* Solo dos ramitas, en esquinas opuestas */}
      <img src={ramita} alt="" aria-hidden="true" className="cuenta__ramita cuenta__ramita--arriba" />
      <img src={ramita} alt="" aria-hidden="true" className="cuenta__ramita cuenta__ramita--abajo" />

      <div className="contenido revelar" ref={refContenido}>
                <h2 className="titulo-script cuenta__titulo">
          {tiempo ? 'Cuenta regresiva' : '¡Llegó el gran día!'}
        </h2>

        <div className="divisor-plata" />

        {tiempo && (
          <>
            <div className="cuenta__reloj" role="timer" aria-live="off">
              {unidades.map(({ valor, etiqueta }) => (
                <div className="cuenta__caja" key={etiqueta}>
                  <span className="cuenta__numero">{valor}</span>
                  <span className="cuenta__etiqueta">{etiqueta}</span>
                </div>
              ))}
            </div>

                       <p className="cuenta__texto">
             ¡ Falta muy poco para celebrar juntos este momento tan especial !
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default CuentaRegresiva;