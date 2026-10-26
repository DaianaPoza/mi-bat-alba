import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Carpeta donde se publica la tarjeta: invitationnweb.com/mi-bat-alba/
  base: '/mi-bat-alba/',
});