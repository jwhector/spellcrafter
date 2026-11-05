import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The Hollow design" };

// The design dashboard's home: one entry per page, built or planned.
export default function DesignHome() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>The Hollow design</h1>
      <ul>
        <li>
          <Link href="/design/runes">Runes</Link>: every rune in 3D, with its major output and its minor rune effect in
          each major output type.
        </li>
        <li>
          <Link href="/design/crafter">System B crafter</Link>: build a sigil from 3D runes and inscriptions and see
          what it makes. A design mock read from the docs, not the engine.
        </li>
      </ul>
    </main>
  );
}
