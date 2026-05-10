import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import KodaEngineModel from "./KodaEngineModel";
import ErrorBoundary from "../components/ErrorBoundary";

function AutoSpin({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return <group ref={ref}>{children}</group>;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-16 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 order-2 md:order-1"
        >
          <div className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-amber">●</span>
            <span>Prototype · No. 01 · MMXXVI</span>
          </div>
          <h1 className="display-xl text-[64px] md:text-[112px]">
            KODA<span className="text-brass align-middle mx-2">·</span>
            <span className="text-brass-deep">01</span>
          </h1>
          <p className="display-md text-[22px] md:text-[26px] text-warmgrey mt-6 max-w-md italic">
            A bespoke desk object that runs your AI.
          </p>
          <div className="rule my-8 max-w-sm" />
          <p className="body-lg max-w-md">
            Walnut, brass, smoked glass. A salvaged movement behind the pane;
            a modern brain hidden beneath. Reachable from your pocket,
            running quietly through the night.
          </p>
          <div className="mt-10 flex items-center gap-6 text-[12px] font-mono tracking-eyebrow uppercase">
            <a
              href="#anatomy"
              className="px-5 py-3 border border-obsidian text-obsidian hover:bg-obsidian hover:text-ivory transition-colors duration-500 ease-editorial"
            >
              Explore the Object →
            </a>
            <a href="#build" className="text-warmgrey hover:text-amber">
              View build ↓
            </a>
          </div>
        </motion.div>

        {/* 3D canvas column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="md:col-span-7 order-1 md:order-2 relative"
        >
          <div className="aspect-[5/4] md:aspect-[6/5] w-full relative">
            <ErrorBoundary fallback={<HeroFallback />}>
              <Canvas
                camera={{ position: [3.4, 1.4, 4.6], fov: 32 }}
                dpr={[1, 1.6]}
                gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
              >
                <color attach="background" args={["#F5F1E8"]} />
                <fog attach="fog" args={["#F5F1E8", 10, 18]} />
                <ambientLight intensity={0.7} />
                <hemisphereLight
                  args={["#FFD9A6", "#3A2412", 0.45]}
                />
                <directionalLight
                  position={[5, 6, 3]}
                  intensity={1.25}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <directionalLight
                  position={[-4, 3, -2]}
                  intensity={0.55}
                  color="#FFD9A6"
                />
                <directionalLight
                  position={[0, 2, -5]}
                  intensity={0.25}
                  color="#B89968"
                />
                <Suspense fallback={null}>
                  <AutoSpin>
                    <KodaEngineModel />
                  </AutoSpin>
                  <ContactShadows
                    position={[0, -1.05, 0]}
                    opacity={0.45}
                    scale={9}
                    blur={2.4}
                    far={3}
                    color="#1C1C1C"
                  />
                </Suspense>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 3.2}
                  maxPolarAngle={Math.PI / 1.9}
                  dampingFactor={0.08}
                  rotateSpeed={0.6}
                />
              </Canvas>
            </ErrorBoundary>

            {/* Hint label */}
            <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey/80">
              ◇ Drag to rotate
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #5C3A21 0%, #3A2412 60%, #1C1410 100%)",
      }}
    >
      <div className="relative w-[78%] aspect-[5/2] border border-brass/40">
        <div
          className="absolute left-2 right-2 top-1 h-2"
          style={{
            background:
              "repeating-linear-gradient(45deg, #B89968 0 6px, #3A2412 6px 12px)",
            opacity: 0.7,
          }}
        />
        <div
          className="absolute inset-3 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,20,18,0.92), rgba(22,20,18,0.82))",
            border: "1px solid rgba(184,153,104,0.3)",
          }}
        >
          <span
            className="font-mono text-amber text-sm tracking-eyebrow"
            style={{
              textShadow:
                "0 0 8px rgba(232,163,61,0.7), 0 0 18px rgba(232,163,61,0.3)",
            }}
          >
            KODA · 01
          </span>
        </div>
      </div>
    </div>
  );
}
