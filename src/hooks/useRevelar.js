import { useEffect, useRef } from 'react';

/* Agrega la clase "visible" cuando el elemento entra en pantalla.
   Se usa junto con la clase .revelar de index.css */
export default function useRevelar() {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          elemento.classList.add('visible');
          observador.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return ref;
}