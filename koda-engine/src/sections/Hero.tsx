import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import KodaEngineModel from "./KodaEngineModel";

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
            <Canvas
              camera={{ position: [3.4, 1.4, 4.6], fov: 32 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={["#F5F1E8"]} />
              <fog attach="fog" args={["#F5F1E8", 10, 18]} />
              <ambientLight intensity={0.45} />
              <directionalLight
                position={[5, 6, 3]}
                intensity={1.15}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight
                position={[-4, 3, -2]}
                intensity={0.4}
                color="#FFD9A6"
              />
              <Suspense fallback={null}>
                <Environment preset="apartment" />
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

            {/* Hint label */}
            <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey/80">
              ◇ Click + drag to rotate
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
