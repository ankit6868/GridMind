"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function OrbitingParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 1.2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      col[i * 3] = 0.02 + t * 0.3;
      col[i * 3 + 1] = 0.5 + t * 0.4;
      col[i * 3 + 2] = 0.8 + t * 0.2;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.z = t * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.2}>
      {/* Main distorted sphere */}
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#0e7490"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          distort={0.3}
          speed={1.8}
          transparent
          opacity={0.18}
        />
      </Sphere>
      {/* Outer wireframe */}
      <Sphere ref={wireRef} args={[1.7, 40, 40]}>
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.06} />
      </Sphere>
      {/* Second wireframe layer */}
      <Sphere args={[2.0, 24, 24]}>
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.04} />
      </Sphere>
      {/* Inner glow core - brighter */}
      <Sphere args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </Sphere>
      {/* Inner bright core */}
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </Sphere>
    </Float>
  );
}

function RingOrbit({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.01, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} onPointerMove={onPointerMove as never}>
      {children}
    </group>
  );
}

export default function EnergyOrb() {
  const isMobile = useIsMobile();
  // On mobile, push camera far back and scale down so entire orb + all rings fit fully inside the viewport
  const cameraZ = isMobile ? 14 : 8;
  const fov = isMobile ? 35 : 50;
  const scale = isMobile ? 0.55 : 1;

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]" onPointerMove={() => {}}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: isMobile ? "low-power" : "high-performance" }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#8b5cf6" />
        {!isMobile && <pointLight position={[0, 5, -3]} intensity={0.3} color="#3b82f6" />}

        <group scale={scale}>
          <MouseTracker>
            <GlowingSphere />
            <OrbitingParticles count={isMobile ? 100 : 300} />
            <RingOrbit radius={2.3} speed={0.25} color="#06b6d4" tilt={Math.PI / 2} />
            <RingOrbit radius={2.8} speed={-0.18} color="#8b5cf6" tilt={Math.PI / 2.5} />
            <RingOrbit radius={3.2} speed={0.12} color="#3b82f6" tilt={Math.PI / 3} />
          </MouseTracker>
        </group>
      </Canvas>
    </div>
  );
}
