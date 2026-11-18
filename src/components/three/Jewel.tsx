"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";
import type { Theme } from "@/components/providers/ThemeProvider";

/* -------------------------------------------------------------------------- */
/*  PALETTE                                                                    */
/* -------------------------------------------------------------------------- */
/** Mirrors the CSS tokens so the scene reads as part of the same design system. */
const PALETTE = {
  dark: {
    gem: "#6E1F2A",
    edge: "#C9A961",
    ring: "#C9A961",
    mote: "#C9A961",
    key: "#FFF1DC",
    ambient: 0.4,
    keyIntensity: 2.2,
    rimIntensity: 3.4,
    edgeOpacity: 0.95,
    ringOpacity: 0.5,
    moteOpacity: 0.7,
    gemRoughness: 0.14,
    gemMetalness: 0.3,
  },
  light: {
    gem: "#5A1922",
    edge: "#9A7B3A",
    ring: "#9A7B3A",
    mote: "#9A7B3A",
    key: "#FFFFFF",
    ambient: 1.05,
    keyIntensity: 1.5,
    rimIntensity: 1.6,
    edgeOpacity: 0.8,
    ringOpacity: 0.4,
    moteOpacity: 0.35,
    gemRoughness: 0.2,
    gemMetalness: 0.22,
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  GILT MOTES                                                                 */
/* -------------------------------------------------------------------------- */
/** Slow-drifting dust caught in the light. Deterministic — no SSR mismatch. */
function Motes({ color, opacity, still }: { color: string; opacity: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const COUNT = 140;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // Golden-angle spiral on a sphere shell — even coverage, no clumping,
      // and no Math.random() so server and client agree.
      const t = i / COUNT;
      const angle = i * 2.399963;
      const y = 1 - t * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const shell = 2.4 + ((i * 37) % 11) * 0.16;
      arr[i * 3] = Math.cos(angle) * r * shell;
      arr[i * 3 + 1] = y * shell * 0.75;
      arr[i * 3 + 2] = Math.sin(angle) * r * shell;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (still || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.035;
    ref.current.position.y = Math.sin(t * 0.25) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  ORBIT RING                                                                 */
/* -------------------------------------------------------------------------- */
/** A tilted gold band circling the stone, like a setting caught mid-turn. */
function OrbitRing({
  color,
  opacity,
  still,
  radius,
  tilt,
  speed,
}: {
  color: string;
  opacity: number;
  still: boolean;
  radius: number;
  tilt: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (still || !ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.006, 8, 180]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  THE STONE                                                                  */
/* -------------------------------------------------------------------------- */
function Stone({ theme, still }: { theme: Theme; still: boolean }) {
  const c = PALETTE[theme];
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Mouse parallax — a slow lean toward the cursor, never a snap.
    if (!still) {
      const targetX = pointer.y * 0.22;
      const targetY = pointer.x * 0.35;
      group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2);
      group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2);
    }

    if (still) return;
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.16;
      inner.current.rotation.x = Math.sin(t * 0.2) * 0.14;
    }
    if (halo.current) {
      halo.current.rotation.y = -t * 0.09;
      halo.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={still ? 0 : 1.1}
        rotationIntensity={still ? 0 : 0.18}
        floatIntensity={still ? 0 : 0.7}
        floatingRange={[-0.12, 0.12]}
      >
        {/* The cut stone: flat-shaded so every facet catches the light. */}
        <mesh ref={inner} castShadow>
          <icosahedronGeometry args={[1.32, 0]} />
          <meshPhysicalMaterial
            color={c.gem}
            flatShading
            metalness={c.gemMetalness}
            roughness={c.gemRoughness}
            clearcoat={1}
            clearcoatRoughness={0.06}
            reflectivity={0.6}
            sheen={0.4}
            sheenColor={c.edge}
          />
          <Edges threshold={12} color={c.edge} />
        </mesh>

        {/* A faint outer facet cage — depth without adding visual weight. */}
        <mesh ref={halo}>
          <icosahedronGeometry args={[1.92, 0]} />
          <meshBasicMaterial
            color={c.edge}
            wireframe
            transparent
            opacity={theme === "dark" ? 0.09 : 0.14}
          />
        </mesh>
      </Float>

      <OrbitRing
        color={c.ring}
        opacity={c.ringOpacity}
        still={still}
        radius={2.35}
        tilt={[Math.PI / 2.6, 0.2, 0]}
        speed={0.12}
      />
      <OrbitRing
        color={c.ring}
        opacity={c.ringOpacity * 0.55}
        still={still}
        radius={2.75}
        tilt={[Math.PI / 1.9, -0.35, 0.4]}
        speed={-0.08}
      />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  SCENE                                                                      */
/* -------------------------------------------------------------------------- */
export function Jewel({ theme, still }: { theme: Theme; still: boolean }) {
  const c = PALETTE[theme];

  return (
    <>
      <ambientLight intensity={c.ambient} color={c.key} />
      {/* Key — warm, high and to the left, like a window. */}
      <directionalLight position={[-4, 5, 4]} intensity={c.keyIntensity} color={c.key} />
      {/* Gold rim from behind, which is what sells the "precious object" read. */}
      <pointLight position={[3.5, -1.5, -4]} intensity={c.rimIntensity} color={c.edge} distance={16} />
      {/* Cool fill so the shadow side never goes muddy. */}
      <pointLight position={[4, 2, 3]} intensity={c.keyIntensity * 0.45} color="#FFFFFF" distance={18} />

      <Stone theme={theme} still={still} />
      <Motes color={c.mote} opacity={c.moteOpacity} still={still} />
    </>
  );
}
