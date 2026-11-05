"use client";

/**
 * One rune in 3D: the coded stone with its symbol, or the rune's model file
 * when it has one. Rendered inside a drei View (see RuneDashboard).
 */
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { lookFor } from "./look";
import { fitToStone, STROKE_GEOMETRY_RADIUS, seedOf, stoneGeometry, symbolSegments } from "./stone";

const STONE_COLOR = "#8e877c";
/** How long the summon spin and glow pulse last, in seconds. */
const SUMMON_SECONDS = 0.9;

export interface Motion {
  /** Sways slowly from side to side on its own, keeping its symbol in view. */
  idleTurn: boolean;
  /** Changes when the rune is summoned, which plays the spin and the glow pulse. */
  summonKey?: number;
  /** Extra rotation from dragging, in radians. */
  drag?: { current: { yaw: number; pitch: number } };
  reducedMotion?: boolean;
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;

function CodedStone({ slug, glow }: { slug: string; glow: { current: number } }) {
  const look = lookFor(slug);
  const stone = useMemo(() => stoneGeometry(seedOf(slug)), [slug]);
  const segments = useMemo(() => symbolSegments(look.strokes), [look]);
  const symbol = useMemo(
    () => new THREE.MeshStandardMaterial({ color: look.color, emissive: look.color, toneMapped: false }),
    [look],
  );
  // React-three-fiber does not dispose geometry and materials passed in as props; free them here.
  useEffect(() => () => stone.dispose(), [stone]);
  useEffect(() => () => symbol.dispose(), [symbol]);
  useFrame(() => {
    symbol.emissiveIntensity = glow.current;
  });
  return (
    <group>
      <mesh geometry={stone}>
        <meshStandardMaterial color={STONE_COLOR} roughness={0.88} metalness={0.02} />
      </mesh>
      {segments.map((s) => (
        <mesh
          key={`${s.position.x.toFixed(3)},${s.position.y.toFixed(3)},${s.angle.toFixed(3)}`}
          position={s.position}
          rotation={[0, 0, s.angle]}
          material={symbol}
        >
          <capsuleGeometry args={[STROKE_GEOMETRY_RADIUS, s.length, 4, 8]} />
        </mesh>
      ))}
    </group>
  );
}

function ModelStone({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { model, scale, offset } = useMemo(() => {
    const model = scene.clone(true);
    const fit = fitToStone(new THREE.Box3().setFromObject(model));
    return { model, ...fit };
  }, [scene]);
  return (
    <group scale={scale} position={offset}>
      <primitive object={model} />
    </group>
  );
}

export function RuneStone({ slug, modelUrl, motion }: { slug: string; modelUrl: string | null; motion: Motion }) {
  const group = useRef<THREE.Group>(null);
  const glow = useRef(1.4);
  const clock = useRef({ turn: 0, summonedAt: Number.NEGATIVE_INFINITY, lastKey: motion.summonKey });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const c = clock.current;
    const now = state.clock.elapsedTime;
    if (motion.summonKey !== c.lastKey) {
      c.lastKey = motion.summonKey;
      c.summonedAt = now;
    }
    if (motion.idleTurn && !motion.reducedMotion) c.turn += delta;
    const t = Math.min(1, (now - c.summonedAt) / SUMMON_SECONDS);
    const spin = motion.reducedMotion || t >= 1 ? 0 : Math.PI * 2 * (easeOut(t) - 1);
    const drag = motion.drag?.current ?? { yaw: 0, pitch: 0 };
    g.rotation.set(0.12 + drag.pitch, 0.6 * Math.sin(c.turn * 0.7) + spin + drag.yaw, 0);
    glow.current = 1.4 + (t < 1 && !motion.reducedMotion ? 3 * (1 - easeOut(t)) : 0);
  });

  return (
    <group ref={group}>
      {modelUrl ? (
        <Suspense fallback={<CodedStone slug={slug} glow={glow} />}>
          <ModelStone url={modelUrl} />
        </Suspense>
      ) : (
        <CodedStone slug={slug} glow={glow} />
      )}
    </group>
  );
}

/** The lights and camera every rune view uses, so the hotbar and the stage match. */
export function RuneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3, 4]} intensity={2.4} />
      <directionalLight position={[-3, -1, -2]} intensity={0.8} color="#9fb3ff" />
    </>
  );
}
