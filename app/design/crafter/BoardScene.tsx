"use client";

/**
 * The effect output preview: a 7x7 hex board where the sigil lands. It lights
 * the hexes the spell touches, marks its destinations, and shows what the
 * center leaves: ground, a gate, summons, shields, a tether, or a change to
 * the whole battlefield. A sketch for reading a sigil, not the battle rules.
 */
import { PerspectiveCamera } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { lookFor } from "../runes/look";
import { allHexes, type BoardPlan, type Hex, key, position } from "./board";
import type { OutputKind } from "./sigil";

const TILE = "#3a332b";
const HEX_RADIUS = 0.94;

function at(h: Hex, y = 0): [number, number, number] {
  const [x, z] = position(h);
  return [x, y, z];
}

function Tile({ hex, color, glow, height }: { hex: Hex; color: string; glow: number; height: number }) {
  return (
    <mesh position={at(hex, height / 2)}>
      <cylinderGeometry args={[HEX_RADIUS, HEX_RADIUS, height, 6, 1, false, Math.PI / 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow} roughness={0.9} />
    </mesh>
  );
}

function Pawn({ hex, color }: { hex: Hex; color: string }) {
  return (
    <group position={at(hex, 0.25)}>
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.28, 0.5, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Link({ from, to, color, y = 0.6 }: { from: Hex; to: Hex; color: string; y?: number }) {
  const { mid, length, quaternion } = useMemo(() => {
    const a = new THREE.Vector3(...at(from, y));
    const b = new THREE.Vector3(...at(to, y));
    const dir = b.clone().sub(a);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return { mid: a.add(b).multiplyScalar(0.5), length: dir.length(), quaternion: q };
  }, [from, to, y]);
  return (
    <mesh position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.05, 0.05, length, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  );
}

export function BoardScene({
  plan,
  kind,
  centerSlug,
  hasCenter,
}: {
  plan: BoardPlan;
  kind: OutputKind;
  centerSlug: string | null;
  hasCenter: boolean;
}) {
  const color = centerSlug ? lookFor(centerSlug).color : "#8a7a60";
  const touched = new Set(plan.touched.map(key));
  const path = new Set(plan.path.map(key));
  const ground = kind === "on ground";
  const global = kind === "global";
  const shielded = kind === "on a shield" || (kind === "on a unit" && centerSlug === "protect");
  // A shield goes on each unit the spell touches, or on its destination when it touches none.
  const shieldedUnits = [...plan.units, plan.caster].filter((h) => touched.has(key(h)));
  const shieldHexes = !shielded ? [] : shieldedUnits.length ? shieldedUnits : plan.destinations.slice(0, 1);
  const summonHexes = kind === "on a summon" ? plan.touched : [];
  const gate = kind === "through a gate";

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 14, 11]} fov={40} onUpdate={(c) => c.lookAt(0, 0, 0.9)} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 10, 6]} intensity={2} />
      {allHexes().map((h) => {
        const k = key(h);
        const hit = hasCenter && (touched.has(k) || global);
        const onPath = hasCenter && path.has(k);
        const height = hit && ground ? 0.42 : 0.25;
        const tint = hit ? color : onPath ? "#6b6150" : TILE;
        const glow = hit ? (global ? 0.25 : ground ? 0.35 : 0.6) : onPath ? 0.15 : 0;
        return <Tile key={k} hex={h} color={tint} glow={glow} height={height} />;
      })}
      <Pawn hex={plan.caster} color="#7f95b8" />
      {plan.units
        .filter((u) => key(u) !== key(plan.caster))
        .map((u) => (
          <Pawn key={key(u)} hex={u} color="#b05a4f" />
        ))}
      {hasCenter && !global
        ? plan.destinations.map((d) => (
            <mesh key={`dest-${key(d)}`} position={at(d, 0.3)} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.6, 0.05, 8, 32]} />
              <meshStandardMaterial color="#f0e2b8" emissive="#f0e2b8" emissiveIntensity={1.5} toneMapped={false} />
            </mesh>
          ))
        : null}
      {hasCenter
        ? plan.links.map(([a, b]) => (
            <Link key={`${key(a)}-${key(b)}`} from={a} to={b} color={gate ? lookFor("portal").color : color} />
          ))
        : null}
      {hasCenter && gate
        ? [plan.links[0]?.[0], plan.links[0]?.[1]]
            .filter((h): h is Hex => Boolean(h))
            .map((h, i) => (
              <mesh key={i === 0 ? "gate-entrance" : "gate-exit"} position={at(h, 0.95)}>
                <torusGeometry args={[0.6, 0.09, 10, 40]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} toneMapped={false} />
              </mesh>
            ))
        : null}
      {hasCenter
        ? summonHexes.map((h) => (
            <mesh key={`summon-${key(h)}`} position={at(h, 0.75)}>
              <cylinderGeometry args={[0.32, 0.4, 0.95, 6]} />
              <meshStandardMaterial color="#8e877c" emissive={color} emissiveIntensity={0.25} />
            </mesh>
          ))
        : null}
      {hasCenter
        ? shieldHexes.map((h) => (
            <mesh key={`shield-${key(h)}`} position={at(h, 0.25)}>
              <sphereGeometry args={[0.75, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.35} />
            </mesh>
          ))
        : null}
      {hasCenter && kind === "on a spell"
        ? plan.destinations.map((d) => (
            <mesh key={`spell-${key(d)}`} position={at(d, 1.6)} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.45, 0.06, 8, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </mesh>
          ))
        : null}
    </>
  );
}
