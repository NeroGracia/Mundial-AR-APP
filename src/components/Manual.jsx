export default function Manual() {
  return (
    <>
      <div className="card">
        <h2>📖 Manual de Usuario</h2>
        <p className="muted">Versión 1.0 · FIFA World Cup 2026 AR App</p>
        <p>Aplicación web interactiva del <strong>Mundial 2026</strong> con Realidad Aumentada. Compatible con Android, iOS y escritorio mediante diseño responsive.</p>
      </div>

      <div className="card">
        <h2>1. Requisitos</h2>
        <ul>
          <li>Navegador moderno: <strong>Safari</strong> (iOS) o <strong>Chrome</strong> (Android) — recomendados para AR.</li>
          <li>Conexión a internet activa.</li>
          <li>Permisos de cámara concedidos al sitio (<strong>HTTPS obligatorio</strong> para AR).</li>
          <li>Dispositivo móvil con cámara trasera para mejor experiencia AR.</li>
        </ul>
      </div>

      <div className="card">
        <h2>2. Navegación</h2>
        <p>La barra superior contiene 5 pestañas:</p>
        <ul>
          <li><strong>🏆 Inicio:</strong> datos del torneo, grupos, calendario y partidos de México.</li>
          <li><strong>📷 Cámara / QR:</strong> escaneo de códigos QR y acceso a la experiencia AR.</li>
          <li><strong>🎬 Videos:</strong> reproduce cualquier video de YouTube con filtros especiales.</li>
          <li><strong>🎯 Trivia:</strong> 15 preguntas sobre Mundiales pasados y el 2026.</li>
          <li><strong>📖 Manual:</strong> esta sección.</li>
        </ul>
      </div>

      <div className="card">
        <h2>3. Realidad Aumentada (AR)</h2>
        <p style={{ marginBottom: 8 }}>La función principal de la app. Apunta la cámara a los logos de las selecciones o imágenes del Mundial para ver modelos 3D.</p>
        <ol>
          <li>Ir a la pestaña <strong>Cámara / QR</strong>.</li>
          <li>Presionar el botón <strong>🏟️ Ver AR en póster</strong>.</li>
          <li>Presionar <strong>🏟️ Iniciar AR</strong> en la pantalla que aparece.</li>
          <li>Aceptar los permisos de cámara cuando el navegador los solicite.</li>
          <li>Apuntar la cámara a uno de los <strong>12 targets</strong> disponibles.</li>
          <li>El modelo 3D aparecerá automáticamente sobre la imagen detectada.</li>
        </ol>
      </div>

      <div className="card">
        <h2>4. Targets disponibles en AR</h2>
        <p className="muted" style={{ marginBottom: 8 }}>12 imágenes reconocibles, cada una con su modelo 3D:</p>
        <ul>
          <li>🇲🇽 Logo Selección Mexicana → Jugador de México</li>
          <li>🏟️ Logo FIFA World Cup 2026 → Estadio</li>
          <li>🏆 Logo sede Nueva York/NJ → Trofeo FIFA</li>
          <li>🇦🇺 Logo Australia → Jugador de Australia</li>
          <li>🇧🇷 Logo Brasil → Jugador de Brasil</li>
          <li>🇨🇦 Logo Canadá → Jugador de Canadá</li>
          <li>🇫🇷 Logo Francia → Jugador de Francia</li>
          <li>🇯🇵 Logo Japón → Jugador de Japón</li>
          <li>🇿🇦 Logo Sudáfrica → Jugador de Sudáfrica</li>
          <li>🇰🇷 Logo Corea del Sur → Jugador de Corea del Sur</li>
          <li>🇪🇸 Logo España → Jugador de España</li>
          <li>🇺🇸 Logo USA → Jugador de USA</li>
        </ul>
      </div>

      <div className="card">
        <h2>5. Controles del AR</h2>
        <p>Al detectar un target aparecen dos botones en la parte inferior:</p>
        <ul>
          <li><strong>▶ Animar:</strong> carga y reproduce la animación del modelo 3D. Puede tardar unos segundos. Presiona <strong>⏹ Parar</strong> para detenerla y volver al modelo estático.</li>
          <li><strong>🔄 Girar:</strong> activa la rotación automática del modelo para apreciarlo desde todos los ángulos. Presiona <strong>⏹ Parar giro</strong> para detenerla.</li>
          <li><strong>✕ Cerrar:</strong> cierra la pantalla de AR y regresa a la app.</li>
        </ul>
      </div>

      <div className="card">
        <h2>6. Escaneo QR</h2>
        <ol>
          <li>Ir a la pestaña <strong>Cámara / QR</strong>.</li>
          <li>Presionar <em>Activar cámara</em> y aceptar permisos.</li>
          <li>Apuntar al código QR — el reconocimiento es automático.</li>
          <li>El resultado aparece abajo; si es un enlace, aparece el botón <em>Abrir enlace</em>.</li>
          <li>Usar <em>Cambiar cámara</em> para alternar entre cámara frontal y trasera.</li>
          <li>Presionar <em>Detener</em> al terminar para liberar la cámara.</li>
        </ol>
      </div>

      <div className="card">
        <h2>7. Videos con filtros</h2>
        <ol>
          <li>Ir a la pestaña <strong>Videos</strong>.</li>
          <li>Pegar una URL de YouTube en el campo de texto.</li>
          <li>Presionar <strong>▶ Reproducir</strong> o tecla Enter.</li>
          <li>El video se reproduce en la app con los filtros disponibles:</li>
        </ol>
        <ul style={{ marginTop: 8 }}>
          <li><strong>🎬 Normal:</strong> sin filtro.</li>
          <li><strong>👾 Pixel Art:</strong> cuadrícula pixelada animada.</li>
          <li><strong>⚡ Glitch:</strong> barras de color distorsionadas animadas.</li>
          <li><strong>🌟 Neón:</strong> bordes de luz pulsante.</li>
          <li><strong>🏆 Mundial:</strong> brillo dorado FIFA pulsante.</li>
          <li><strong>📺 Retro TV:</strong> líneas de escaneo de televisión antigua animadas.</li>
          <li><strong>🏟️ Estadio:</strong> luz cálida de estadio nocturno.</li>
          <li><strong>⚫ Clásico:</strong> blanco y negro cinematográfico con vignette.</li>
        </ul>
        <p className="muted" style={{ marginTop: 8 }}>Nota: algunos videos de YouTube restringen su reproducción en apps externas. En ese caso usa el botón <em>Abrir en YouTube</em>.</p>
      </div>

      <div className="card">
        <h2>8. Trivia</h2>
        <ol>
          <li>Ir a la pestaña <strong>Trivia</strong>.</li>
          <li>Leer la pregunta y seleccionar una de las 4 opciones.</li>
          <li>La respuesta correcta se marca en <strong style={{ color: '#15803d' }}>verde ✅</strong> y la incorrecta en <strong style={{ color: '#b91c1c' }}>rojo ❌</strong>.</li>
          <li>Debajo aparece una explicación de la respuesta correcta.</li>
          <li>Presionar <em>Siguiente →</em> para avanzar a la siguiente pregunta.</li>
          <li>Al terminar las 15 preguntas se muestra el puntaje final con porcentaje.</li>
          <li>Presionar <em>🔄 Jugar de nuevo</em> para reiniciar.</li>
        </ol>
      </div>

      <div className="card">
        <h2>9. Instalación como app (PWA)</h2>
        <p>La app puede instalarse en tu teléfono para usarla sin navegador:</p>
        <ul>
          <li><strong>iOS (Safari):</strong> toca el botón compartir → <em>Agregar a pantalla de inicio</em>.</li>
          <li><strong>Android (Chrome):</strong> toca los 3 puntos → <em>Añadir a pantalla de inicio</em>.</li>
        </ul>
        <p className="muted" style={{ marginTop: 8 }}>Una vez instalada aparece como app nativa en tu pantalla de inicio.</p>
      </div>

      <div className="card">
        <h2>10. Solución de problemas</h2>
        <ul>
          <li><strong>AR no funciona:</strong> asegúrate de estar en HTTPS. En Safari iOS ve a Ajustes → Safari → Cámara → Permitir.</li>
          <li><strong>AR tarda en cargar:</strong> con 12 targets el archivo es pesado, espera hasta 60 segundos en la primera carga.</li>
          <li><strong>Modelo no aparece:</strong> acerca más la imagen al centro de la cámara con buena iluminación.</li>
          <li><strong>Animación tarda:</strong> los modelos animados pesan ~40 MB, espera unos segundos después de presionar ▶ Animar.</li>
          <li><strong>Cámara no abre:</strong> revisar permisos del sitio en ajustes del navegador.</li>
          <li><strong>Video no carga:</strong> YouTube restringe algunos videos en embed. Usa <em>Abrir en YouTube</em>.</li>
        </ul>
      </div>

      <div className="card">
        <h2>11. Créditos y tecnologías</h2>
        <ul>
          <li><strong>AR:</strong> MindAR.js + Three.js</li>
          <li><strong>Modelos 3D:</strong> archivos GLB con animaciones Mixamo</li>
          <li><strong>Escaneo QR:</strong> @zxing/browser</li>
          <li><strong>Framework:</strong> React + Vite</li>
          <li><strong>Datos:</strong> FIFA, registros históricos públicos</li>
          <li><strong>Videos:</strong> YouTube embed API</li>
        </ul>
      </div>
    </>
  );
}