import { useState } from 'react';
import Inicio from './components/Inicio.jsx';
import Camera from './components/Camera.jsx';
import Videos from './components/Videos.jsx';
import Trivia from './components/Trivia.jsx';
import Manual from './components/Manual.jsx';
import { IconHome, IconCamera, IconVideo, IconTarget, IconBook } from './components/Icons.jsx';

const TABS = [
  { id: 'inicio',  label: 'Inicio',    Icon: IconHome },
  { id: 'camera',  label: 'Cámara/QR', Icon: IconCamera },
  { id: 'videos',  label: 'Videos',    Icon: IconVideo },
  { id: 'trivia',  label: 'Trivia',    Icon: IconTarget },
  { id: 'manual',  label: 'Manual',    Icon: IconBook }
];

export default function App() {
  const [tab, setTab] = useState('inicio');
  return (
    <div className="app">
      <header className="header" role="banner">
        <h1>FIFA WORLD CUP 2026</h1>
        <p>USA · México · Canadá  ·  16 jun – 19 jul 2026</p>
      </header>

      <nav className="tabs" role="tablist" aria-label="Secciones">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            className={'tab ' + (tab === id ? 'active' : '')}
            onClick={() => setTab(id)}
          >
            <Icon /> {label}
          </button>
        ))}
      </nav>

      <main className="content" id={`panel-${tab}`} role="tabpanel">
        {tab === 'inicio'  && <Inicio onGo={setTab} />}
        {tab === 'camera'  && <Camera />}
        {tab === 'videos'  && <Videos />}
        {tab === 'trivia'  && <Trivia />}
        {tab === 'manual'  && <Manual />}
      </main>
    </div>
  );
}