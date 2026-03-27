"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NetworkParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const connectionDistance = 1.5;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      for (let d = 0; d < 3; d++) {
        const idx = i * 3 + d;
        posAttr.array[idx] += velocities[idx];
        const limit = d === 2 ? 2 : 4;
        if (Math.abs(posAttr.array[idx]) > limit) {
          velocities[idx] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    // Build lines
    let lineIdx = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions[lineIdx++] = posAttr.array[i * 3];
          linePositions[lineIdx++] = posAttr.array[i * 3 + 1];
          linePositions[lineIdx++] = posAttr.array[i * 3 + 2];
          linePositions[lineIdx++] = posAttr.array[j * 3];
          linePositions[lineIdx++] = posAttr.array[j * 3 + 1];
          linePositions[lineIdx++] = posAttr.array[j * 3 + 2];
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3)
    );
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx / 3);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#06b6d4" size={0.04} transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
      </lineSegments>
    </>
  );
}

export default function ParticleField() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="absolute inset-0 opacity-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, powerPreference: isMobile ? "low-power" : "high-performance" }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        <NetworkParticles count={isMobile ? 30 : 60} />
      </Canvas>
    </div>
  );
}
