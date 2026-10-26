import './DressCode.css';
import useRevelar from '../../hooks/useRevelar';
import ramo from '../../assets/fondos/ramo-celeste.webp';
import ramita from '../../assets/fondos/ramita-celeste.webp';

function DressCode() {
  const refContenido = useRevelar();

  return (
    <section className="seccion dress" id="dress-code">
      <img src={ramo} alt="" aria-hidden="true" className="dress__ramo" />
      <img src={ramita} alt="" aria-hidden="true" className="dress__ramita" />

      <div className="contenido revelar" ref={refContenido}>
                {/* Vestido y camisa con corbata */}
        <svg className="dress__icono" viewBox="0 0 48 24" aria-hidden="true">
          <path d="M7.2 2.5 8 7.2c-1.4.9-1.4 2.4-.5 3.3L3.5 20.6Q10 22.8 16.5 20.6L12.5 10.5c.9-.9.9-2.4-.5-3.3l.8-4.7" />
          <path d="M7.5 10.5q2.5.9 5 0" />
          <path d="M8 7.2q2 1.1 4 0" />
          <path d="M32 4.5 27.5 7l-1.8 4.3 3.3 1.3V21h14V12.6l3.3-1.3L44.5 7 40 4.5" />
          <path d="M32 4.5 36 9l4-4.5" />
          <path d="M36 9l-1.2 1.6 1.2 7.4 1.2-7.4z" />
        </svg>

        <h2 className="titulo-script">Dress code</h2>

        <div className="divisor-plata" />

        <p className="dress__estilo">Elegante sport</p>

        <p className="dress__nota">
          Con cariño, te pedimos evitar el <span>azul</span>
         
        </p>
      </div>
    </section>
  );
}

export default DressCode;