import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { RUNE_LOOKS } from "./look";
import { FACE_Z, fitToStone, STONE_WIDTH, seedOf, stoneGeometry, symbolSegments } from "./stone";

describe("fitToStone", () => {
  it("scales a model's widest side to the stone's width and centres it", () => {
    // A Blender export in metres: 0.5 wide, 0.4 tall, 0.1 deep, resting off-centre.
    const { scale, offset } = fitToStone({ min: new THREE.Vector3(1, 2, 0), max: new THREE.Vector3(1.5, 2.4, 0.1) });
    expect(scale).toBeCloseTo(STONE_WIDTH / 0.5);
    expect(offset[0]).toBeCloseTo(-1.25 * scale);
    expect(offset[1]).toBeCloseTo(-2.2 * scale);
    expect(offset[2]).toBeCloseTo(-0.05 * scale);
  });

  it("leaves an empty model alone", () => {
    expect(fitToStone({ min: new THREE.Vector3(), max: new THREE.Vector3() })).toEqual({ scale: 1, offset: [0, 0, 0] });
  });
});

describe("the coded stone", () => {
  it("is about the stone's width, with flat faces near ±FACE_Z", () => {
    const g = stoneGeometry(seedOf("fire"));
    g.computeBoundingBox();
    const box = g.boundingBox as THREE.Box3;
    expect(box.max.x - box.min.x).toBeGreaterThan(STONE_WIDTH * 0.9);
    expect(box.max.x - box.min.x).toBeLessThan(STONE_WIDTH * 1.1);
    expect(box.max.z).toBeLessThan(FACE_Z * 1.1);
    expect(box.max.z).toBeGreaterThan(FACE_Z * 0.85);
  });

  it("lays every symbol inside the face", () => {
    for (const [slug, look] of Object.entries(RUNE_LOOKS)) {
      for (const s of symbolSegments(look.strokes)) {
        expect(Math.hypot(s.position.x, s.position.y), slug).toBeLessThan(STONE_WIDTH / 2);
        expect(s.length, slug).toBeGreaterThan(0);
      }
    }
  });

  it("gives each rune a stable seed", () => {
    expect(seedOf("fire")).toBe(seedOf("fire"));
    expect(seedOf("fire")).not.toBe(seedOf("frost"));
  });
});
