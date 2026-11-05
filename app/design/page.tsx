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
        <li>System B crafter: not built yet. It follows the engine port.</li>
      </ul>
    </main>
  );
}
