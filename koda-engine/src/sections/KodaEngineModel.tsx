import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural KODA · 01 — assembled from primitives.
 * Proportions: 30cm × 12cm × 10cm  →  3.0 × 1.2 × 1.0 world units.
 */
export default function KodaEngineModel() {
  const W = 3.0;
  const H = 1.2;
  const D = 1.0;
  const walnut = "#5C3A21";
  const walnutDark = "#3A2412";
  const brass = "#B89968";
  const brassBright = "#D4B585";

  return (
    <group position={[0, -0.05, 0]}>
      {/* Main walnut body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial
          color={walnut}
          roughness={0.55}
          metalness={0.08}
        />
      </mesh>

      {/* Top panel — slightly inset darker walnut */}
      <mesh position={[0, H / 2 + 0.001, 0]} receiveShadow>
        <boxGeometry args={[W - 0.04, 0.02, D - 0.04]} />
        <meshStandardMaterial
          color={walnutDark}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>

      {/* Hausa diamond brass strip along top front edge */}
      <HausaStrip width={W - 0.1} position={[0, H / 2 + 0.014, D / 2 - 0.02]} />

      {/* Smoked-glass front face — inset slightly */}
      <SmokedGlass width={W - 0.18} height={H - 0.22} z={D / 2 + 0.001} />

      {/* Visible "logic board" behind the smoked glass */}
      <LogicBoard width={W - 0.3} height={H - 0.34} z={D / 2 - 0.12} />

      {/* Amber LEDs (point lights) inside */}
      <pointLight
        position={[-W * 0.25, 0, D / 2 - 0.2]}
        intensity={0.7}
        distance={2}
        color="#E8A33D"
      />
      <pointLight
        position={[W * 0.2, 0.1, D / 2 - 0.2]}
        intensity={0.45}
        distance={1.6}
        color="#E8A33D"
      />

      {/* Brass rotary encoder — lower-left of front */}
      <BrassEncoder position={[-W * 0.36, -H * 0.28, D / 2 + 0.04]} />

      {/* OLED — lower-right of front */}
      <OLED position={[W * 0.32, -H * 0.28, D / 2 + 0.011]} />

      {/* Four polished brass corner brackets */}
      {([
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
      ] as const).map(([sx, sy], i) => (
        <CornerBracket
          key={i}
          position={[(W / 2) * sx, (H / 2) * sy, D / 2 + 0.001]}
          flipX={sx < 0}
          flipY={sy < 0}
        />
      ))}

      {/* Engraved nameplate on the back (just visible when rotated) */}
      <mesh position={[0, -H * 0.28, -D / 2 - 0.001]}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshStandardMaterial
          color={brassBright}
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* Subtle base plinth shadow catcher */}
      <mesh
        position={[0, -H / 2 - 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[W + 0.4, D + 0.4]} />
        <meshStandardMaterial color="#E8E0CE" roughness={1} />
      </mesh>

      {/* Decorative brass label - left side, vertical */}
      <mesh position={[-W / 2 - 0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshStandardMaterial
          color={brass}
          roughness={0.45}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function HausaStrip({
  width,
  position,
}: {
  width: number;
  position: [number, number, number];
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 32;
    const g = c.getContext("2d")!;
    g.fillStyle = "#B89968";
    g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = "#3A2412";
    const d = 24;
    for (let x = 0; x < c.width + d; x += d) {
      g.beginPath();
      g.moveTo(x, c.height / 2 - d / 2);
      g.lineTo(x + d / 2, c.height / 2);
      g.lineTo(x, c.height / 2 + d / 2);
      g.lineTo(x - d / 2, c.height / 2);
      g.closePath();
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = 1;
    return t;
  }, []);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, 0.08]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.75}
      />
    </mesh>
  );
}

function SmokedGlass({
  width,
  height,
  z,
}: {
  width: number;
  height: number;
  z: number;
}) {
  return (
    <mesh position={[0, 0.04, z]}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color="#161412"
        transmission={0.55}
        thickness={0.4}
        roughness={0.18}
        ior={1.45}
        attenuationColor="#3A2412"
        attenuationDistance={0.6}
        transparent
        opacity={0.85}
        metalness={0}
      />
    </mesh>
  );
}

function LogicBoard({
  width,
  height,
  z,
}: {
  width: number;
  height: number;
  z: number;
}) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const g = c.getContext("2d")!;
    // dark green PCB
    g.fillStyle = "#0F1A12";
    g.fillRect(0, 0, c.width, c.height);
    // copper traces
    g.strokeStyle = "#8B7548";
    g.lineWidth = 1.4;
    for (let i = 0; i < 80; i++) {
      g.beginPath();
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      g.moveTo(x, y);
      let cx = x;
      let cy = y;
      for (let j = 0; j < 4; j++) {
        cx += (Math.random() - 0.5) * 220;
        cy += (Math.random() - 0.5) * 90;
        g.lineTo(cx, cy);
      }
      g.stroke();
    }
    // chips
    for (let i = 0; i < 14; i++) {
      const w = 40 + Math.random() * 90;
      const h = 30 + Math.random() * 60;
      const x = Math.random() * (c.width - w);
      const y = Math.random() * (c.height - h);
      g.fillStyle = "#1C1C1C";
      g.fillRect(x, y, w, h);
      g.strokeStyle = "#8B7548";
      g.strokeRect(x + 1, y + 1, w - 2, h - 2);
    }
    // capacitors / heatsink hint (copper rectangle)
    g.fillStyle = "#A86E3C";
    g.fillRect(c.width * 0.55, c.height * 0.25, 220, 180);
    g.fillStyle = "#7A4F2A";
    for (let i = 0; i < 30; i++) {
      g.fillRect(c.width * 0.55 + i * 7, c.height * 0.25, 3, 180);
    }
    // amber LED dots
    g.fillStyle = "#E8A33D";
    for (let i = 0; i < 6; i++) {
      g.beginPath();
      g.arc(80 + i * 60, c.height - 60, 4, 0, Math.PI * 2);
      g.fill();
    }
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <mesh position={[0, 0.04, z]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={tex}
        emissive="#5C3A21"
        emissiveIntensity={0.05}
        roughness={0.75}
      />
    </mesh>
  );
}

function BrassEncoder({
  position,
}: {
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* base bezel */}
      <mesh position={[0, 0, -0.005]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 48]} />
        <meshStandardMaterial color="#3A2412" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* knurled brass dial */}
      <mesh ref={ref}>
        <cylinderGeometry args={[0.105, 0.115, 0.05, 64, 1, false]} />
        <meshStandardMaterial
          color="#D4B585"
          roughness={0.28}
          metalness={0.9}
        />
      </mesh>
      {/* dial face indicator */}
      <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.085, 32]} />
        <meshStandardMaterial color="#8B7548" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

function OLED({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.46, 0.16, 0.02]} />
        <meshStandardMaterial color="#0A0806" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[0.42, 0.12]} />
        <meshStandardMaterial
          color="#0A0806"
          emissive="#E8A33D"
          emissiveIntensity={0.55}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

function CornerBracket({
  position,
  flipX,
  flipY,
}: {
  position: [number, number, number];
  flipX: boolean;
  flipY: boolean;
}) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <group position={position}>
      <mesh position={[-0.07 * sx, 0, 0]}>
        <boxGeometry args={[0.16, 0.05, 0.02]} />
        <meshStandardMaterial
          color="#D4B585"
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>
      <mesh position={[0, -0.07 * sy, 0]}>
        <boxGeometry args={[0.05, 0.16, 0.02]} />
        <meshStandardMaterial
          color="#D4B585"
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}
