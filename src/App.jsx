
import Hero from './components/Hero/Hero';
import CuentaRegresiva from './components/CuentaRegresiva/CuentaRegresiva';
import Ubicacion from './components/Ubicacion/Ubicacion';
import DressCode from './components/DressCode/DressCode';
import Album from './components/Album/Album';



function App() {
  return (
    <main>
      <Hero />
      <CuentaRegresiva />
      <Ubicacion />
      <DressCode />
      <Album />
      {/* Próximas secciones: CuentaRegresiva, Fiesta, DressCode, Album, Confirmacion */}
    </main>
  );
}

export default App;