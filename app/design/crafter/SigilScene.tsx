"use client";

/**
 * The sigil in 3D: a stone tablet with the major rune in the center, the
 * minor runes in sockets around it, and the inscriptions glowing on its
 * outer band. Drawn inside a drei View with an orthographic camera, so the
 * page can lay clickable buttons exactly over each socket (SIGIL_SPAN).
 */
import { OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { RuneLights, RuneStone } from "../runes/RuneStone";
import { type Inscription, inscription } from "./inscriptions";
import { type Sigil, sealedSlots, sectionOf } from "./sigil";

/** The width of world space the sigil view shows, in units. */
export const SIGIL_SPAN = 7.4;
export const RING_RADIUS = 2.2;
const BAND_RADIUS = 3.05;
const MINOR_SCALE = 0.4;
const CENTER_SCALE = 0.82;

export const GROUP_COLORS: Record<Inscription["group"], string> = {
  shape: "#e0b25c",
  where: "#7fc4e8",
  who: "#9fd08c",
  when: "#c9a0e8",
  move: "#e8956f",
  tether: "#d0d0d0",
  trigger: "#e86f8f",
};

/** Where ring position `slot` sits: clockwise from the top. */
export function slotPosition(slot: number, size: number, radius = RING_RADIUS): [number, number] {
  const a = Math.PI / 2 - (slot * Math.PI * 2) / size;
  return [radius * Math.cos(a), radius * Math.sin(a)];
}

/** Keeps the orthographic camera framing SIGIL_SPAN units across the view, whatever its size in pixels. */
function FitCamera() {
  const camera = useRef<THREE.OrthographicCamera>(null);
  const size = useThree((s) => s.size);
  useFrame(() => {
    const c = camera.current;
    if (!c || !size.width) return;
    const zoom = size.width / SIGIL_SPAN;
    if (c.zoom !== zoom) {
      c.zoom = zoom;
      c.updateProjectionMatrix();
    }
  });
  return <OrthographicCamera ref={camera} makeDefault position={[0, 0, 10]} near={0.1} far={50} />;
}

function Socket({
  x,
  y,
  radius,
  color,
  intensity,
}: {
  x: number;
  y: number;
  radius: number;
  color: string;
  intensity: number;
}) {
  return (
    <mesh position={[x, y, 0.16]}>
      <torusGeometry args={[radius, 0.035, 8, 48]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />
    </mesh>
  );
}

function SealedSocket({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <mesh position={[x, y, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.04, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} toneMapped={false} />
    </mesh>
  );
}

/** The inscriptions as arcs on the outer band, one arc per inscription. */
function InscriptionBand({ ids }: { ids: string[] }) {
  const arcs = useMemo(() => {
    const items = ids.map((id) => inscription(id));
    const total = Math.max(items.length, 1);
    const span = Math.min((Math.PI * 2) / total - 0.08, 0.9);
    return items.map((ins, i) => ({
      ins,
      start: Math.PI / 2 + 0.04 + (i * Math.PI * 2) / total,
      span,
      key: `${ins.id}-${i}`,
    }));
  }, [ids]);
  return (
    <group position={[0, 0, 0.16]}>
      {arcs.map((a) => (
        <mesh key={a.key} rotation={[0, 0, a.start]}>
          <torusGeometry args={[BAND_RADIUS, 0.06, 8, 48, a.span]} />
          <meshStandardMaterial
            color={GROUP_COLORS[a.ins.group]}
            emissive={GROUP_COLORS[a.ins.group]}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Thin radial lines between the ring's sections, one section per destination. */
function SectionDividers({ sigil }: { sigil: Sigil }) {
  const cuts: number[] = [];
  for (let slot = 0; slot < sigil.size; slot++) {
    const prev = (slot - 1 + sigil.size) % sigil.size;
    if (sectionOf(sigil, slot) !== sectionOf(sigil, prev)) cuts.push(slot);
  }
  return (
    <group position={[0, 0, 0.16]}>
      {cuts.map((slot) => {
        const a = Math.PI / 2 - ((slot - 0.5) * Math.PI * 2) / sigil.size;
        return (
          <mesh key={slot} position={[1.85 * Math.cos(a), 1.85 * Math.sin(a), 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.9, 0.04, 0.02]} />
            <meshStandardMaterial color="#e0b25c" emissive="#e0b25c" emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

export function SigilScene({
  sigil,
  selected,
  modelUrls,
  reducedMotion,
}: {
  sigil: Sigil;
  selected: "center" | number | null;
  modelUrls: Record<string, string>;
  reducedMotion: boolean;
}) {
  const sealed = sealedSlots(sigil);
  const sealedColor = sigil.inscriptions[0] ? GROUP_COLORS[inscription(sigil.inscriptions[0]).group] : "#e0b25c";
  return (
    <>
      <FitCamera />
      <RuneLights />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.35, 3.4, 0.3, 96]} />
        <meshStandardMaterial color="#2b2621" roughness={0.95} />
      </mesh>
      <Socket x={0} y={0} radius={1.02} color="#c9a45c" intensity={selected === "center" ? 2.2 : 0.35} />
      <Socket x={0} y={0} radius={BAND_RADIUS - 0.18} color="#5a4f40" intensity={0.15} />
      <InscriptionBand ids={[...sigil.inscriptions, ...Object.values(sigil.minor).flat()]} />
      <SectionDividers sigil={sigil} />
      {sigil.center ? (
        <group scale={CENTER_SCALE} position={[0, 0, 0.4]}>
          <RuneStone
            key={sigil.center}
            slug={sigil.center}
            modelUrl={modelUrls[sigil.center] ?? null}
            motion={{ idleTurn: true, summonOnMount: true, reducedMotion }}
          />
        </group>
      ) : null}
      {sigil.ring.map((slug, slot) => {
        const [x, y] = slotPosition(slot, sigil.size);
        const isSelected = selected === slot;
        if (slug) {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: ring positions are the identity here.
            <group key={`${slot}-${slug}`}>
              <Socket x={x} y={y} radius={0.46} color="#c9a45c" intensity={isSelected ? 2.2 : 0.3} />
              <group scale={MINOR_SCALE} position={[x, y, 0.35]}>
                <RuneStone
                  slug={slug}
                  modelUrl={modelUrls[slug] ?? null}
                  motion={{ idleTurn: isSelected, summonOnMount: true, reducedMotion }}
                />
              </group>
            </group>
          );
        }
        return !sealed.has(slot) ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: ring positions are the identity here.
          <Socket key={slot} x={x} y={y} radius={0.46} color="#8a7a60" intensity={isSelected ? 2.2 : 0.25} />
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: ring positions are the identity here.
          <SealedSocket key={slot} x={x} y={y} color={sealedColor} />
        );
      })}
    </>
  );
}
