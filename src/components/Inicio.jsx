import { useState } from 'react';
import { IconCamera, IconTarget, IconVideo, IconTrophy } from './Icons.jsx';

const GROUPS = [
  { id: 'A', teams: ['🇲🇽 México', '🇿🇦 Sudáfrica', '🇰🇷 Corea del Sur', '🇨🇿 Czechia'] },
  { id: 'B', teams: ['🇨🇦 Canadá', '🇧🇦 Bosnia-Herz.', '🇶🇦 Qatar', '🇨🇭 Suiza'] },
  { id: 'C', teams: ['🇧🇷 Brasil', '🇲🇦 Marruecos', '🇭🇹 Haití', '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia'] },
  { id: 'D', teams: ['🇺🇸 USA', '🇵🇾 Paraguay', '🇦🇺 Australia', '🇹🇷 Türkiye'] },
  { id: 'E', teams: ['🇩🇪 Alemania', '🇨🇼 Curaçao', '🇨🇮 Costa de Marfil', '🇪🇨 Ecuador'] },
  { id: 'F', teams: ['🇳🇱 Países Bajos', '🇯🇵 Japón', '🇸🇪 Suecia', '🇹🇳 Túnez'] },
  { id: 'G', teams: ['🇧🇪 Bélgica', '🇪🇬 Egipto', '🇮🇷 Irán', '🇳🇿 Nueva Zelanda'] },
  { id: 'H', teams: ['🇪🇸 España', '🇨🇻 Cabo Verde', '🇸🇦 Arabia Saudita', '🇺🇾 Uruguay'] },
  { id: 'I', teams: ['🇫🇷 Francia', '🇸🇳 Senegal', '🇮🇶 Irak', '🇳🇴 Noruega'] },
  { id: 'J', teams: ['🇦🇷 Argentina', '🇩🇿 Argelia', '🇦🇹 Austria', '🇯🇴 Jordania'] },
  { id: 'K', teams: ['🇵🇹 Portugal', '🇨🇩 Congo DR', '🇺🇿 Uzbekistán', '🇨🇴 Colombia'] },
  { id: 'L', teams: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', '🇭🇷 Croacia', '🇬🇭 Ghana', '🇵🇦 Panamá'] },
];

const SCHEDULE = [
  { fase: 'Fase de Grupos', fechas: '11 Jun – 27 Jun', nota: '' },
  { fase: 'Ronda de 32', fechas: '28 Jun – 3 Jul', nota: '' },
  { fase: 'Ronda de 16', fechas: '4 Jul – 7 Jul', nota: '' },
  { fase: 'Cuartos de Final', fechas: '9 Jul – 11 Jul', nota: '' },
  { fase: 'Semifinales', fechas: '14 Jul – 15 Jul', nota: 'Dallas y Atlanta' },
  { fase: 'Tercer Lugar', fechas: '18 Jul', nota: 'Miami' },
  { fase: '🏆 Final', fechas: '19 Jul', nota: 'MetLife Stadium, Nueva York/NJ' },
];

const MATCHES_MEX = [
  { rival: 'vs 🇿🇦 Sudáfrica', fecha: '11 Jun', sede: 'Estadio Azteca, CDMX' },
  { rival: 'vs 🇰🇷 Corea del Sur', fecha: '15 Jun', sede: 'Estadio Akron, Guadalajara' },
  { rival: 'vs 🇨🇿 Czechia', fecha: '19 Jun', sede: 'Estadio BBVA, Monterrey' },
];

export default function Inicio({ onGo }) {
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <>
      <section className="card" aria-label="Bienvenida">
        <h2>
          <IconTrophy width={26} height={26} style={{ verticalAlign: '-4px', marginRight: 8, color: 'var(--cta-700)' }} />
          Bienvenido al Mundial 2026
        </h2>
        <p>
          La Copa del Mundo más grande de la historia: <strong>48 selecciones</strong>, <strong>104 partidos</strong> y <strong>3 países anfitriones</strong>.
          Del <strong>11 de junio</strong> al <strong>19 de julio de 2026</strong>.
        </p>
        <div className="row">
          <button className="btn cta" onClick={() => onGo('camera')}>
            <IconCamera /> Escanear AR
          </button>
          <button className="btn secondary" onClick={() => onGo('trivia')}>
            <IconTarget /> Jugar trivia
          </button>
          <button className="btn secondary" onClick={() => onGo('videos')}>
            <IconVideo /> Ver videos
          </button>
        </div>
      </section>

      {/* Datos clave */}
      <section className="card" aria-label="Datos clave">
        <h2>Datos clave</h2>
        <div className="grid">
          <div className="stat"><div className="num">48</div><div className="lbl">Selecciones</div></div>
          <div className="stat"><div className="num">104</div><div className="lbl">Partidos</div></div>
          <div className="stat"><div className="num">16</div><div className="lbl">Sedes</div></div>
          <div className="stat"><div className="num">3</div><div className="lbl">Países anfitriones</div></div>
          <div className="stat"><div className="num">12</div><div className="lbl">Grupos</div></div>
          <div className="stat"><div className="num">39</div><div className="lbl">Días de torneo</div></div>
        </div>
      </section>

      {/* México en el Mundial */}
      <section className="card" aria-label="México">
        <h2>🇲🇽 México en el Mundial</h2>
        <p className="muted" style={{ marginBottom: 12 }}>Grupo A — Partidos de fase de grupos</p>
        {MATCHES_MEX.map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < MATCHES_MEX.length - 1 ? '1px solid var(--line-2)' : 'none'
          }}>
            <div>
              <div style={{ fontWeight: 600 }}>{m.rival}</div>
              <div className="muted" style={{ fontSize: '.85rem' }}>{m.sede}</div>
            </div>
            <div style={{
              background: 'var(--cta-700)', color: '#fff',
              borderRadius: 8, padding: '4px 10px', fontSize: '.85rem', fontWeight: 600
            }}>
              {m.fecha}
            </div>
          </div>
        ))}
      </section>

      {/* Calendario del torneo */}
      <section className="card" aria-label="Calendario">
        <h2>📅 Calendario del torneo</h2>
        {SCHEDULE.map((s, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < SCHEDULE.length - 1 ? '1px solid var(--line-2)' : 'none'
          }}>
            <div>
              <div style={{ fontWeight: s.fase.includes('Final') ? 700 : 500 }}>{s.fase}</div>
              {s.nota && <div className="muted" style={{ fontSize: '.85rem' }}>{s.nota}</div>}
            </div>
            <div style={{
              background: s.fase.includes('Final') ? 'var(--cta-700)' : 'var(--line-2)',
              color: s.fase.includes('Final') ? '#fff' : 'var(--ink)',
              borderRadius: 8, padding: '4px 10px', fontSize: '.85rem', fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              {s.fechas}
            </div>
          </div>
        ))}
      </section>

      {/* Grupos */}
      <section className="card" aria-label="Grupos">
        <h2>⚽ Los 12 Grupos</h2>
        <p className="muted" style={{ marginBottom: 12 }}>Toca un grupo para ver sus equipos</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {GROUPS.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(activeGroup === g.id ? null : g.id)}
              className={'btn ' + (activeGroup === g.id ? 'cta' : 'secondary')}
              style={{ padding: '8px 16px', fontWeight: 700 }}
            >
              Grupo {g.id}
            </button>
          ))}
        </div>
        {activeGroup && (
          <div style={{
            background: 'var(--line-1)', borderRadius: 10, padding: 16,
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: '1rem' }}>
              Grupo {activeGroup}
            </div>
            {GROUPS.find(g => g.id === activeGroup)?.teams.map((t, i) => (
              <div key={i} style={{
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid var(--line-2)' : 'none',
                fontSize: '.95rem'
              }}>
                {t}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sedes */}
      <section className="card" aria-label="Sedes">
        <h2>🏟️ Sedes</h2>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: 'var(--cta-700)' }}>🇲🇽 México (3):</span>
          <span className="muted"> Ciudad de México · Guadalajara · Monterrey</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: 'var(--cta-700)' }}>🇨🇦 Canadá (2):</span>
          <span className="muted"> Toronto · Vancouver</span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: 'var(--cta-700)' }}>🇺🇸 USA (11):</span>
          <span className="muted"> Atlanta · Boston · Dallas · Houston · Kansas City · Los Angeles · Miami · Nueva York/NJ · Filadelfia · San Francisco · Seattle</span>
        </div>
      </section>
    </>
  );
}