import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IconPlay, IconStop, IconRefresh, IconLink } from './Icons.jsx';
import ARViewer from './ARViewer.jsx';

export default function Camera() {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const controlsRef = useRef(null);
  const [arMode, setArMode] = useState(false);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [facing, setFacing] = useState('environment');

  useEffect(() => () => stop(), []);


  async function start() {
    setError(null); setResult(null);
    try {
      readerRef.current = new BrowserMultiFormatReader();
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      const dev = devices.find(d => /back|rear|environment/i.test(d.label)) || devices[devices.length - 1];
      const constraints = {
        video: dev ? { deviceId: dev.deviceId } : { facingMode: facing },
        audio: false
      };
      controlsRef.current = await readerRef.current.decodeFromConstraints(
        constraints, videoRef.current, (res, err) => {
          if (res) {
            setResult({ text: res.getText(), format: res.getBarcodeFormat() });
          }
        }
      );
      setActive(true);
    } catch (e) {
      setError(e.message || 'No se pudo acceder a la cámara');
    }
  }

  function stop() {
    try { controlsRef.current?.stop(); } catch { }
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }

  function toggleFacing() {
    setFacing(f => f === 'environment' ? 'user' : 'environment');
    if (active) { stop(); setTimeout(start, 200); }
  }


  function interpret(txt) {
    const t = txt.toLowerCase();
    if (t.includes('mundial') || t.includes('fifa') || t.includes('2026'))
      return 'Contenido oficial Mundial 2026 detectado.';
    if (t.startsWith('http')) return 'Enlace detectado: ábrelo si confías en la fuente.';
    return 'Código leído correctamente.';
  }

  if (arMode) {
    return <ARViewer onClose={() => setArMode(false)} />;
  }

  return (
    <>
      <div className="card">
        <h2>Cámara y escaneo QR / pósters</h2>
        <p className="muted">Apunta a un póster, objeto o código QR del Mundial 2026. Requiere permisos del navegador (HTTPS o localhost).</p>
        <div className="row">
          {!active
            ? <button className="btn cta" onClick={start}><IconPlay /> Activar cámara</button>
            : <button className="btn danger" onClick={stop}><IconStop /> Detener</button>}
          <button className="btn secondary" onClick={toggleFacing}>
            <IconRefresh /> Cambiar ({facing === 'environment' ? 'trasera' : 'frontal'})
          </button>
          <button className="btn cta" onClick={() => setArMode(true)}>
            🏟️ Ver AR en póster
          </button>
        </div>
        {error && <div className="alert err" role="alert">{error}</div>}
      </div>

      <div className="card scan-frame" style={{ textAlign: 'center' }}>
        <video ref={videoRef} playsInline muted autoPlay />
      </div>

      {result && (
        <div className="card">
          <h2>Resultado</h2>
          <div className="alert ok">{interpret(result.text)}</div>
          <p><strong>Formato:</strong> {result.format}</p>
          <p style={{ wordBreak: 'break-all' }}><strong>Contenido:</strong> {result.text}</p>
          {result.text.startsWith('http') && (
            <a className="btn cta" href={result.text} target="_blank" rel="noreferrer noopener">
              <IconLink /> Abrir enlace
            </a>
          )}
        </div>
      )}
    </>
  );
}
