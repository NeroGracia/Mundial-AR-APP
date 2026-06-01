import { useState } from 'react';

const QUESTIONS = [
  {
    q: '¿Cuántas selecciones participan en el Mundial 2026?',
    opts: ['32', '40', '48', '64'],
    a: 2,
    exp: 'El Mundial 2026 es el primero con 48 selecciones, expandido desde las 32 del formato anterior.'
  },
  {
    q: '¿Qué tres países son sede del Mundial 2026?',
    opts: ['USA · México · Brasil', 'México · USA · Argentina', 'USA · México · Canadá', 'Canadá · USA · Colombia'],
    a: 2,
    exp: 'Es la primera Copa del Mundo organizada por tres países: USA, México y Canadá.'
  },
  {
    q: '¿En qué estadio se jugará la Final del Mundial 2026?',
    opts: ['Estadio Azteca', 'SoFi Stadium', 'AT&T Stadium', 'MetLife Stadium'],
    a: 3,
    exp: 'La Final se jugará el 19 de julio en el MetLife Stadium en Nueva York/Nueva Jersey.'
  },
  {
    q: '¿Qué selección ganó el Mundial 2022 en Qatar?',
    opts: ['Francia', 'Brasil', 'Argentina', 'Alemania'],
    a: 2,
    exp: 'Argentina venció a Francia en la final por penales (4-2) tras empatar 3-3.'
  },
  {
    q: '¿Quién es el máximo goleador histórico de Mundiales?',
    opts: ['Pelé', 'Miroslav Klose', 'Ronaldo Nazário', 'Gerd Müller'],
    a: 1,
    exp: 'Miroslav Klose (Alemania) tiene 16 goles en Mundiales, el récord histórico.'
  },
  {
    q: '¿Qué país tiene más títulos mundiales?',
    opts: ['Alemania', 'Italia', 'Argentina', 'Brasil'],
    a: 3,
    exp: 'Brasil lidera con 5 títulos: 1958, 1962, 1970, 1994 y 2002.'
  },
  {
    q: '¿Cuántos partidos tendrá el Mundial 2026?',
    opts: ['64', '80', '96', '104'],
    a: 3,
    exp: 'Con 48 equipos y 12 grupos, el torneo tendrá 104 partidos en total.'
  },
  {
    q: '¿Cuál es la mascota de México para el Mundial 2026?',
    opts: ['Maple', 'Clutch', 'Zayu', 'Pique'],
    a: 2,
    exp: 'Zayu es un jaguar, la mascota oficial de México. Maple representa a Canadá y Clutch a USA.'
  },
  {
    q: '¿En qué estadio se inaugura el Mundial 2026?',
    opts: ['MetLife Stadium', 'Estadio Azteca', 'BMO Field', 'SoFi Stadium'],
    a: 1,
    exp: 'México vs Sudáfrica abre el torneo el 11 de junio en el Estadio Azteca, Ciudad de México.'
  },
  {
    q: '¿En qué grupo está México en el Mundial 2026?',
    opts: ['Grupo C', 'Grupo D', 'Grupo A', 'Grupo B'],
    a: 2,
    exp: 'México está en el Grupo A junto a Sudáfrica, Corea del Sur y Czechia.'
  },
  {
    q: '¿Qué país ganó el primer Mundial de fútbol en 1930?',
    opts: ['Brasil', 'Argentina', 'Uruguay', 'Italia'],
    a: 2,
    exp: 'Uruguay ganó el primer Mundial en 1930, jugado en su propio país. Venció a Argentina 4-2 en la final.'
  },
  {
    q: '¿Cuántos goles marcó Mbappé en el Mundial 2022?',
    opts: ['6', '7', '8', '5'],
    a: 2,
    exp: 'Kylian Mbappé fue el máximo goleador de Qatar 2022 con 8 goles, incluyendo un hat-trick en la final.'
  },
  {
    q: '¿Qué edición del Mundial es la de 2026?',
    opts: ['22ª', '23ª', '24ª', '21ª'],
    a: 1,
    exp: 'El Mundial 2026 es la 23ª edición de la Copa del Mundo FIFA.'
  },
  {
    q: '¿En qué año se celebró el primer Mundial en México?',
    opts: ['1966', '1970', '1974', '1978'],
    a: 1,
    exp: 'México fue sede en 1970. Brasil ganó el torneo con Pelé, Jairzinho y Tostão.'
  },
  {
    q: '¿Cuántos días dura el torneo del Mundial 2026?',
    opts: ['32', '35', '39', '42'],
    a: 2,
    exp: 'El Mundial 2026 dura 39 días, del 11 de junio al 19 de julio de 2026.'
  },
];

export default function Trivia() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[i];
  const isCorrect = picked === q.a;
  const isWrong = picked !== null && picked !== q.a;

  function pick(idx) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.a) setScore(s => s + 1);
  }

  function next() {
    if (i + 1 >= QUESTIONS.length) { setDone(true); return; }
    setI(i + 1);
    setPicked(null);
  }

  function reset() { setI(0); setPicked(null); setScore(0); setDone(false); }

  const progress = ((i + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="card">
        <h2>🎉 Resultado final</h2>

        {/* Barra de resultado */}
        <div style={{ margin: '16px 0' }}>
          <div style={{
            height: 12, background: 'var(--line-2)', borderRadius: 99, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', borderRadius: 99, transition: 'width 1s ease',
              width: `${pct}%`,
              background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'
            }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontWeight: 700, fontSize: '1.2rem' }}>
            {score} / {QUESTIONS.length} correctas ({pct}%)
          </div>
        </div>

        <div style={{
          textAlign: 'center', fontSize: '2rem', margin: '12px 0'
        }}>
          {pct === 100 ? '🏆' : pct >= 80 ? '⭐' : pct >= 50 ? '⚽' : '📚'}
        </div>

        <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: 16 }}>
          {pct === 100 ? '¡Perfecto! Eres un crack mundialista 🏆' :
           pct >= 80 ? '¡Excelente nivel mundialista! ⭐' :
           pct >= 50 ? '¡Buen nivel! Sigue practicando ⚽' :
           'Aún hay mucho por aprender 📚'}
        </p>

        <button className="btn cta" onClick={reset} style={{ width: '100%' }}>
          🔄 Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>⚽ Trivia Mundial</h2>
        <span style={{
          background: 'var(--cta-700)', color: '#fff',
          borderRadius: 20, padding: '4px 12px', fontSize: '.85rem', fontWeight: 700
        }}>
          {i + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div style={{
        height: 6, background: 'var(--line-2)', borderRadius: 99,
        overflow: 'hidden', marginBottom: 16
      }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${progress}%`,
          background: 'var(--cta-700)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Puntaje */}
      <div style={{ marginBottom: 16, fontSize: '.9rem', color: 'var(--ink-2)' }}>
        ✅ Puntaje actual: <strong>{score}</strong>
      </div>

      {/* Pregunta */}
      <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 16 }}>{q.q}</p>

      {/* Opciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.opts.map((o, idx) => {
          let bg = 'var(--paper)';
          let border = '2px solid var(--line-2)';
          let color = 'var(--ink)';
          let icon = '';

          if (picked !== null) {
            if (idx === q.a) {
              bg = '#dcfce7';
              border = '2px solid #22c55e';
              color = '#15803d';
              icon = ' ✅';
            } else if (idx === picked) {
              bg = '#fee2e2';
              border = '2px solid #ef4444';
              color = '#b91c1c';
              icon = ' ❌';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={picked !== null}
              style={{
                background: bg,
                border,
                color,
                borderRadius: 10,
                padding: '12px 16px',
                fontSize: '.95rem',
                fontWeight: picked !== null && idx === q.a ? 700 : 500,
                cursor: picked !== null ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              {o}{icon}
            </button>
          );
        })}
      </div>

      {/* Explicación */}
      {picked !== null && (
        <div style={{
          marginTop: 14,
          padding: 14,
          borderRadius: 10,
          background: isCorrect ? '#dcfce7' : '#fee2e2',
          border: `1.5px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
        }}>
          <div style={{
            fontWeight: 700, marginBottom: 4,
            color: isCorrect ? '#15803d' : '#b91c1c'
          }}>
            {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
          </div>
          <div style={{ fontSize: '.9rem', color: 'var(--ink)' }}>
            {q.exp}
          </div>
        </div>
      )}

      {/* Botón siguiente */}
      {picked !== null && (
        <button
          className="btn cta"
          style={{ marginTop: 14, width: '100%' }}
          onClick={next}
        >
          {i + 1 >= QUESTIONS.length ? '🎉 Ver resultado' : 'Siguiente →'}
        </button>
      )}
    </div>
  );
}