import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const TARGETS = [
  { name: "🇲🇽 México",        static: "/models/MEXICO_static.glb",      animated: "/models-animated/MEXICO.glb",      texture: null },
  { name: "🏟️ Estadio NY",     static: "/models/low_poly_stadium.glb",   animated: null,                               texture: null },
  { name: "🏆 Trofeo FIFA",     static: "/models/world_cup_trophy.glb",   animated: null,                               texture: null },
  { name: "🇦🇺 Australia",     static: "/models/AUSTRALIA_static.glb",   animated: "/models-animated/AUSTRALIA.glb",   texture: "/textures/AUSTRALIA.png" },
  { name: "🇧🇷 Brasil",        static: "/models/BRAZIL_static.glb",      animated: "/models-animated/BRAZIL.glb",      texture: "/textures/brazil.png" },
  { name: "🇨🇦 Canadá",        static: "/models/CANADA_static.glb",      animated: "/models-animated/CANADA.glb",      texture: "/textures/CANADA.png" },
  { name: "🇫🇷 Francia",       static: "/models/FRANCE_static.glb",      animated: "/models-animated/FRANCE.glb",      texture: "/textures/france.png" },
  { name: "🇯🇵 Japón",         static: "/models/JAPON_static.glb",       animated: "/models-animated/JAPON.glb",       texture: "/textures/japon.png" },
  { name: "🇿🇦 Sudáfrica",     static: "/models/SOUTHAFRICA_static.glb", animated: "/models-animated/SOUTHAFRICA.glb", texture: "/textures/SOUTHAFRICA.png" },
  { name: "🇰🇷 Corea del Sur", static: "/models/SOUTHKOREA_static.glb",  animated: "/models-animated/SOUTHKOREA.glb",  texture: "/textures/SOUTHKOREA.png" },
  { name: "🇪🇸 España",        static: "/models/SPAIN_static.glb",       animated: "/models-animated/SPAIN.glb",       texture: "/textures/SPAIN.png" },
  { name: "🇺🇸 USA",           static: "/models/USA_static.glb",         animated: "/models-animated/USA.glb",         texture: "/textures/USA.png" },
];

export default function ARViewer({ onClose }) {
  const containerRef = useRef(null);
  const mindARRef = useRef(null);
  const anchorGroupsRef = useRef([]);
  const currentModelsRef = useRef([]);
  const mixersRef = useRef([]);
  const animActionsRef = useRef([]);
  const loaderRef = useRef(new GLTFLoader());
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const clockRef = useRef(new THREE.Clock());
  const rotatingRef = useRef({});
  const [log, setLog] = useState("Presiona Iniciar AR");
  const [started, setStarted] = useState(false);
  const [activeTarget, setActiveTarget] = useState(null);
  const [rotating, setRotating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loadingAnim, setLoadingAnim] = useState(false);

  function applyTexture(model, index) {
    if (TARGETS[index].texture) {
      const texture = textureLoaderRef.current.load(TARGETS[index].texture);
      texture.flipY = false;
      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ map: texture });
          child.material.needsUpdate = true;
        }
      });
    }
  }

  function loadStaticModel(index) {
    const group = anchorGroupsRef.current[index];
    if (!group) return;

    while (group.children.length) group.remove(group.children[0]);
    if (mixersRef.current[index]) mixersRef.current[index] = null;
    animActionsRef.current[index] = null;

    loaderRef.current.load(TARGETS[index].static, (gltf) => {
      const model = gltf.scene;
      applyTexture(model, index);

      // Normalizar tamaño real del modelo
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 0.5;
      const normalizedScale = targetSize / maxDim;

      model.scale.set(normalizedScale, normalizedScale, normalizedScale);

      // Recentrar después de escalar
      const newBox = new THREE.Box3().setFromObject(model);
      const newCenter = newBox.getCenter(new THREE.Vector3());
      model.position.set(-newCenter.x, -newCenter.y, -newCenter.z);

      group.add(model);
      currentModelsRef.current[index] = model;
      setLog(`✅ ${TARGETS[index].name}`);
    }, undefined, (err) => {
      setLog(`❌ Error: ${err?.message || 'no se pudo cargar'}`);
    });
  }

  function loadAnimatedModel(index) {
    if (!TARGETS[index].animated) return;
    const group = anchorGroupsRef.current[index];
    if (!group) return;

    setLoadingAnim(true);
    setLog(`⏳ Cargando animación...`);

    loaderRef.current.load(TARGETS[index].animated, (gltf) => {
      while (group.children.length) group.remove(group.children[0]);
      if (mixersRef.current[index]) mixersRef.current[index] = null;

      const model = gltf.scene;
      applyTexture(model, index);

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const normalizedScale = 0.5 / maxDim;

      model.scale.set(normalizedScale, normalizedScale, normalizedScale);

      const newBox = new THREE.Box3().setFromObject(model);
      const newCenter = newBox.getCenter(new THREE.Vector3());
      model.position.set(-newCenter.x, -newCenter.y, -newCenter.z);

      group.add(model);
      currentModelsRef.current[index] = model;

      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        mixersRef.current[index] = mixer;
        const action = mixer.clipAction(gltf.animations[0]);
        action.timeScale = 1;
        animActionsRef.current[index] = action;
        action.play();
        setPlaying(true);
      }
      setLog(`${TARGETS[index].name}`);
      setLoadingAnim(false);
    }, undefined, () => {
      setLog(`Error cargando animación`);
      setLoadingAnim(false);
    });
  }

  function toggleAnim() {
    if (activeTarget === null || loadingAnim) return;
    const index = activeTarget;

    if (playing) {
      const action = animActionsRef.current[index];
      if (action) action.stop();
      setPlaying(false);
      loadStaticModel(index);
      setLog(`${TARGETS[index].name}`);
    } else {
      if (TARGETS[index].animated) {
        loadAnimatedModel(index);
      }
    }
  }

  function toggleRotate() {
    if (activeTarget === null) return;
    const newVal = !rotatingRef.current[activeTarget];
    rotatingRef.current[activeTarget] = newVal;
    setRotating(newVal);
  }

  function startAR() {
    const el = containerRef.current;
    setLog("Cargando...");
    setStarted(true);

    const mindarThree = new MindARThree({
      container: el,
      imageTargetSrc: "/targets/targets.mind",
      uiLoading: "no",
      uiScanning: "no",
    });
    mindARRef.current = mindarThree;

    const { renderer, scene, camera } = mindarThree;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
    scene.add(new THREE.DirectionalLight(0xffffff, 1));

    TARGETS.forEach((target, index) => {
      const anchor = mindarThree.addAnchor(index);
      anchorGroupsRef.current[index] = anchor.group;

      anchor.onTargetFound = () => {
        setActiveTarget(index);
        setRotating(rotatingRef.current[index] || false);
        setPlaying(false);
        setLog(`${target.name}`);
        loadStaticModel(index);
      };

      anchor.onTargetLost = () => {
        setActiveTarget(null);
        setLog("Apunta a una imagen...");
        setRotating(false);
        setPlaying(false);
        rotatingRef.current[index] = false;
      };
    });

    mindarThree.start().then(() => {
      setLog("Apunta a una imagen...");
      renderer.setAnimationLoop(() => {
        const delta = clockRef.current.getDelta();
        mixersRef.current.forEach((mixer) => {
          if (mixer) mixer.update(delta);
        });
        Object.entries(rotatingRef.current).forEach(([idx, isRotating]) => {
          if (isRotating && currentModelsRef.current[idx]) {
            currentModelsRef.current[idx].rotation.y += 0.02;
          }
        });
        renderer.render(scene, camera);
      });
    }).catch((err) => setLog("ERROR: " + err.message));

    setTimeout(() => {
      setLog((prev) => prev === "Cargando..." ? "ERROR: Tardó demasiado. Recarga la página." : prev);
    }, 60000);
  }

  useEffect(() => {
    return () => {
      mindARRef.current?.stop();
    };
  }, []);

  const btn = (onClick, label, active = false, color = "#ffd700", disabled = false) => (
    <button onClick={onClick} disabled={disabled} style={{
      background: active ? `${color}33` : "rgba(0,0,0,0.75)",
      color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
      border: `1.5px solid ${disabled ? "rgba(255,255,255,0.2)" : color}`,
      borderRadius: 10, padding: "10px 16px",
      fontSize: 14, fontWeight: "bold",
      cursor: disabled ? "default" : "pointer",
      backdropFilter: "blur(4px)", flex: 1,
    }}>
      {label}
    </button>
  );

  const hasAnim = activeTarget !== null && TARGETS[activeTarget]?.animated !== null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 999 }}>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />

      {started && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1000, pointerEvents: "none",
          border: "3px solid rgba(255,215,0,0.4)",
          boxShadow: "inset 0 0 40px rgba(255,215,0,0.1)"
        }}>
          {[
            { top: 12, left: 12, borderTop: "3px solid #ffd700", borderLeft: "3px solid #ffd700" },
            { top: 12, right: 12, borderTop: "3px solid #ffd700", borderRight: "3px solid #ffd700" },
            { bottom: 12, left: 12, borderBottom: "3px solid #ffd700", borderLeft: "3px solid #ffd700" },
            { bottom: 12, right: 12, borderBottom: "3px solid #ffd700", borderRight: "3px solid #ffd700" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 28, height: 28, ...s }} />
          ))}
        </div>
      )}

      {started && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 1002,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          padding: "12px 16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: 13 }}>
            ⚽ FIFA WORLD CUP 2026 — AR
          </div>
          <button onClick={onClose} style={{
            background: "rgba(0,0,0,0.6)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20,
            padding: "6px 14px", fontSize: 13, cursor: "pointer"
          }}>
            ✕ Cerrar
          </button>
        </div>
      )}

      {started && (
        <div style={{
          position: "absolute", top: 60, left: 16, right: 16, zIndex: 1002,
          background: "rgba(0,0,0,0.65)", color: "#fff",
          padding: "8px 14px", borderRadius: 20,
          fontSize: 13, textAlign: "center",
          border: "1px solid rgba(255,215,0,0.3)",
          backdropFilter: "blur(4px)"
        }}>
          {log}
        </div>
      )}

      {activeTarget !== null && (
        <div style={{
          position: "absolute", bottom: 120, left: 16, right: 16,
          zIndex: 1002, display: "flex", gap: 10
        }}>
          <button
            onClick={hasAnim ? toggleAnim : undefined}
            disabled={loadingAnim}
            style={{
              background: playing ? "rgba(255,107,53,0.3)" : "rgba(0,0,0,0.75)",
              color: (!hasAnim || loadingAnim) ? "rgba(255,255,255,0.3)" : "#fff",
              border: `1.5px solid ${hasAnim && !loadingAnim ? "#ff6b35" : "rgba(255,255,255,0.2)"}`,
              borderRadius: 10, padding: "10px 16px",
              fontSize: 14, fontWeight: "bold",
              cursor: hasAnim && !loadingAnim ? "pointer" : "default",
              backdropFilter: "blur(4px)", flex: 1,
            }}
          >
            {loadingAnim ? "⏳ Cargando..." : playing ? "⏹ Parar" : "▶ Animar"}
          </button>
          {btn(toggleRotate, rotating ? "⏹ Parar giro" : "🔄 Girar", rotating)}
        </div>
      )}

      {!started && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1002, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.6)"
        }}>
          <div style={{ color: "#ffd700", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            ⚽ AR Mundial 2026
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 32, textAlign: "center", padding: "0 40px" }}>
            Apunta tu cámara a los logos de las selecciones, al logo FIFA o al póster de la sede
          </div>
          <button onClick={startAR} style={{
            background: "#ffd700", color: "#000",
            border: "none", borderRadius: 30,
            padding: "16px 48px", fontSize: 18,
            fontWeight: "bold", cursor: "pointer"
          }}>
            🏟️ Iniciar AR
          </button>
        </div>
      )}
    </div>
  );
}