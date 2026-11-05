/**
 * The coded rune stone: geometry for the stone and its symbol, and the rule
 * that fits a model file into the same space. No React here, so it can be
 * tested on its own.
 *
 * The stone is about 2 units across, centred on the origin, with its symbol
 * face toward +z (toward the camera). A model file is scaled and moved to
 * fill that same space, so either kind sits in the hotbar and on the stage
 * the same way.
 */
import * as THREE from "three";
import type { Stroke } from "./look";

/** The stone's width, which a model file is scaled to match. */
export const STONE_WIDTH = 2;
/** Half the stone's thickness: where its flat face sits. */
export const FACE_Z = 0.27;
/** How far the symbol reaches from the centre, as a share of the stone's radius. */
const SYMBOL_SCALE = 0.55;
const STROKE_RADIUS = 0.045;

/** A small, repeatable bump field, so each rune's stone is worn a little differently. */
function wear(seed: number, x: number, y: number, z: number): number {
  return (
    0.012 *
    (Math.sin(3.1 * x + seed) +
      Math.sin(2.7 * y + 1.3 * seed) +
      Math.sin(3.7 * z + 2.1 * seed) +
      Math.sin(7.3 * (x + y) + seed))
  );
}

/** A flattened, rounded pebble with two flat faces and a soft rim. */
export function stoneGeometry(seed: number): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(STONE_WIDTH / 2, 72, 48);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const k = 1 + wear(seed, x, y, z);
    // tanh flattens the front and back into faces at about ±FACE_Z, with a rounded rim between.
    const flat = Math.sign(z) * FACE_Z * Math.tanh((Math.abs(z) * 0.55 * 1.5) / FACE_Z);
    pos.setXYZ(i, x * k, y * 0.94 * k, flat * (1 + wear(seed + 5, x, y, z) * 0.4));
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** One capsule per stroke segment, laid on the face. Round ends make the joints. */
export function symbolSegments(
  strokes: readonly Stroke[],
): { position: THREE.Vector3; angle: number; length: number }[] {
  const r = (STONE_WIDTH / 2) * SYMBOL_SCALE;
  const out: { position: THREE.Vector3; angle: number; length: number }[] = [];
  for (const stroke of strokes) {
    for (let i = 1; i < stroke.length; i++) {
      const a = stroke[i - 1];
      const b = stroke[i];
      if (!a || !b) continue;
      const dx = (b[0] - a[0]) * r;
      const dy = (b[1] - a[1]) * r;
      out.push({
        position: new THREE.Vector3(((a[0] + b[0]) / 2) * r, ((a[1] + b[1]) / 2) * r, FACE_Z),
        angle: Math.atan2(dy, dx) - Math.PI / 2,
        length: Math.hypot(dx, dy),
      });
    }
  }
  return out;
}

export const STROKE_GEOMETRY_RADIUS = STROKE_RADIUS;

/**
 * How to scale and move a model so it is STONE_WIDTH across its widest side
 * and centred on the origin. Takes the model's bounding box.
 */
export function fitToStone(box: { min: THREE.Vector3Like; max: THREE.Vector3Like }): {
  scale: number;
  offset: [number, number, number];
} {
  const size = Math.max(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
  if (!(size > 0)) return { scale: 1, offset: [0, 0, 0] };
  const scale = STONE_WIDTH / size;
  return {
    scale,
    offset: [
      (-(box.min.x + box.max.x) / 2) * scale,
      (-(box.min.y + box.max.y) / 2) * scale,
      (-(box.min.z + box.max.z) / 2) * scale,
    ],
  };
}

/** A stable number per rune, so its stone's wear never changes between visits. */
export function seedOf(slug: string): number {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 1000;
  return h / 100;
}
