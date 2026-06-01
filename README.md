# Mundial 2026 · App Interactiva (React + Vite)

App web responsive (Android/iOS/escritorio) con:
- 📷 Cámara + escaneo QR/códigos (`@zxing/browser`)
- 🎬 Videos (YouTube embed)
- 📊 Estadísticas históricas
- ⚽ Tarjetas de jugadores con animaciones
- 🎯 Trivia interactiva
- 📖 Manual de usuario integrado

## Instalar y correr

```bash
cd Mundial2026App
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto http://localhost:5173).

> La cámara solo funciona en **HTTPS** o **localhost**. En el móvil usa la URL `--host` (LAN) servida por Vite + un certificado, o despliega a Vercel/Netlify.

## Build producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  App.jsx
  main.jsx
  styles.css
  components/
    Inicio.jsx
    Camera.jsx
    Videos.jsx
    Stats.jsx
    Players.jsx
    Trivia.jsx
    Manual.jsx
```
