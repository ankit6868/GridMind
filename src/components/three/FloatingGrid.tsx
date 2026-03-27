"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveGrid() {
  const ref = useRef<THREE.Points>(null);
  const cols = 35;
  const rows = 35;
  const count = cols * rows;
  const spacing = 0.3;

  const basePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = (i * rows + j) * 3;
        pos[idx] = (i - cols / 2) * spacing;
        pos[idx + 1] = 0;
        pos[idx + 2] = (j - rows / 2) * spacing;
      }
    }
    return pos;
  }, []);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = (i * rows + j) * 3;
        const x = basePositions[idx];
        const z = basePositions[idx + 2];
        posAttr.array[idx + 1] =
          Math.sin(x * 1.5 + time * 0.8) * 0.15 +
          Math.cos(z * 1.5 + time * 0.6) * 0.15;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref} rotation={[-0.6, 0, 0]} position={[0, -1, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#06b6d4" size={0.025} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export default function FloatingGrid() {
  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <WaveGrid />
      </Canvas>
    </div>
  );
}
