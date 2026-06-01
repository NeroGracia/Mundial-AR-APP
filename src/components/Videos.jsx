import { useState, useEffect } from 'react';
import { IconPlay, IconClose, IconLink } from './Icons.jsx';

function parseYouTubeId(input) {
  if (!input) return null;
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split(/[?&]/)[0] || null;
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      if (u.pathname.startsWith('/embed/'))  return u.pathname.split('/')[2] || null;
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] || null;
    }
  } catch {}
  return null;
}

function searchUrl(q) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

// Overlay animado para cada filtro
function FilterOverlay({ filter }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (filter === 'none') return;
    const interval = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(interval);
  }, [filter]);

  if (filter === 'none') return null;

  if (filter === 'pixel') {
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '8px 8px',
        imageRendering: 'pixelated',
      }} />
    );
  }

  if (filter === 'glitch') {
    const bars = Array.from({ length: 6 }, (_, i) => ({
      top: `${(tick * 7 + i * 17) % 100}%`,
      height: `${2 + (i % 3)}px`,
      color: ['#ff0080', '#00ffff', '#ffff00', '#ff4400', '#00ff88', '#8800ff'][i],
      left: `${(tick * 3 + i * 23) % 30}%`,
      width: `${20 + (i * 11 + tick) % 60}%`,
      opacity: 0.6 + (i % 3) * 0.1,
    }));

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
        {bars.map((bar, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: bar.top,
            left: bar.left,
            width: bar.width,
            height: bar.height,
            background: bar.color,
            opacity: bar.opacity,
            mixBlendMode: 'screen',
          }} />
        ))}
        {/* Borde glitch */}
        <div style={{
          position: 'absolute', inset: 0,
          border: `2px solid #00ffff`,
          opacity: tick % 3 === 0 ? 0.8 : 0.2,
          mixBlendMode: 'screen',
        }} />
      </div>
    );
  }

  if (filter === 'neon') {
    const pulse = 0.4 + Math.abs(Math.sin(tick * 0.3)) * 0.6;
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {/* Bordes neón */}
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: `inset 0 0 30px rgba(255,0,200,${pulse}), inset 0 0 60px rgba(0,200,255,${pulse * 0.5})`,
          border: `2px solid rgba(255,0,200,${pulse})`,
        }} />
        {/* Esquinas */}
        {[
          { top: 0, left: 0, borderTop: '3px solid #ff00cc', borderLeft: '3px solid #ff00cc' },
          { top: 0, right: 0, borderTop: '3px solid #00ccff', borderRight: '3px solid #00ccff' },
          { bottom: 0, left: 0, borderBottom: '3px solid #00ccff', borderLeft: '3px solid #00ccff' },
          { bottom: 0, right: 0, borderBottom: '3px solid #ff00cc', borderRight: '3px solid #ff00cc' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
        ))}
      </div>
    );
  }

  if (filter === 'mundial') {
    const pulse = 0.3 + Math.abs(Math.sin(tick * 0.2)) * 0.4;
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: `inset 0 0 40px rgba(255,215,0,${pulse}), inset 0 0 80px rgba(200,150,0,${pulse * 0.4})`,
          border: `2px solid rgba(255,215,0,${pulse * 0.8})`,
        }} />
        {/* Trofeo watermark */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          fontSize: 28, opacity: 0.3 + pulse * 0.3,
          filter: 'drop-shadow(0 0 8px gold)',
        }}>🏆</div>
      </div>
    );
  }

  if (filter === 'retro') {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {/* Líneas de escaneo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          )`,
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }} />
        {/* Línea de escaneo animada */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: `${(tick * 2) % 100}%`,
          height: '3px',
          background: 'rgba(255,255,255,0.08)',
        }} />
      </div>
    );
  }

  if (filter === 'stadium') {
    const pulse = 0.2 + Math.abs(Math.sin(tick * 0.15)) * 0.3;
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, rgba(255,240,150,${pulse}) 0%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: `inset 0 0 60px rgba(0,50,150,0.3)`,
        }} />
      </div>
    );
  }

  if (filter === 'bw') {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
      {/* Overlay gris para simular B&N */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(128,128,128,0.5)',
        mixBlendMode: 'saturation',
      }} />
      {/* Vignette cinematográfico */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />
      {/* Grain efecto película */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />
    </div>
  );
}

  return null;
}

const FILTERS = [
  { id: 'none',    label: '🎬 Normal',    desc: 'Sin filtro' },
  { id: 'pixel',   label: '👾 Pixel Art', desc: 'Cuadrícula pixelada' },
  { id: 'glitch',  label: '⚡ Glitch',    desc: 'Barras de color animadas' },
  { id: 'neon',    label: '🌟 Neón',      desc: 'Bordes de luz pulsante' },
  { id: 'mundial', label: '🏆 Mundial',   desc: 'Brillo dorado FIFA' },
  { id: 'retro',   label: '📺 Retro TV',  desc: 'Líneas de escaneo animadas' },
  { id: 'stadium', label: '🏟️ Estadio',  desc: 'Luz de estadio nocturno' },
  { id: 'bw',      label: '⚫ Clásico',   desc: 'Blanco y negro' },
];

export default function Videos() {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState('');
  const [err, setErr] = useState(null);
  const [filter, setFilter] = useState('none');

  function loadInput() {
    const id = parseYouTubeId(input);
    if (!id) { setErr('URL o ID de YouTube no válido'); return; }
    setErr(null);
    setActive({ id, title: 'Tu video', q: id });
    setFilter('none');
  }

  const currentFilter = FILTERS.find(f => f.id === filter);

  return (
    <>
      <section className="card">
        <h2>Pega un video aquí</h2>
        <p className="muted">Pega una URL o ID de YouTube (ej. <code>youtu.be/XXXX</code>, <code>youtube.com/watch?v=XXXX</code>).</p>
        <div className="row">
          <input
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setErr(null); }}
            placeholder="https://www.youtube.com/watch?v=..."
            aria-label="URL o ID de YouTube"
            onKeyDown={e => e.key === 'Enter' && loadInput()}
            style={{
              flex: '1 1 260px', minWidth: 0,
              padding: '12px 14px', borderRadius: 10,
              border: '2px solid var(--line-2)', fontSize: '1rem',
              fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)'
            }}
          />
          <button className="btn cta" onClick={loadInput}>
            <IconPlay /> Reproducir
          </button>
        </div>
        {err && <div className="alert err" role="alert">{err}</div>}
      </section>

      {active && (
        <section className="card" aria-live="polite">
          <h2>{active.title}</h2>

          <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
              <iframe
                key={active.id}
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
              <FilterOverlay filter={filter} />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <p className="muted" style={{ marginBottom: 8, fontSize: '.85rem' }}>
              🎨 Filtros — {currentFilter?.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={'btn ' + (filter === f.id ? 'cta' : 'secondary')}
                  style={{ padding: '8px 14px', minHeight: 38, fontSize: '.85rem' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn secondary" href={`https://www.youtube.com/watch?v=${active.id}`} target="_blank" rel="noreferrer noopener">
              <IconLink /> Abrir en YouTube
            </a>
            <a className="btn secondary" href={searchUrl(active.q)} target="_blank" rel="noreferrer noopener">
              <IconLink /> Buscar similares
            </a>
            <button className="btn danger" onClick={() => setActive(null)}>
              <IconClose /> Cerrar
            </button>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            ¿No carga? Algunos videos restringen embed. Usa "Abrir en YouTube".
          </p>
        </section>
      )}
    </>
  );
}