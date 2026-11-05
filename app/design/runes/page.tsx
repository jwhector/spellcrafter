import type { Metadata } from "next";
import { runePageData } from "./data";
import { RuneDashboard } from "./RuneDashboard";

export const metadata: Metadata = { title: "Runes · The Hollow design" };

// The hotbar with no rune chosen yet. /design/runes/<rune> opens with one chosen.
export default function RunesPage() {
  const { reference, modelUrls } = runePageData();
  return <RuneDashboard reference={reference} modelUrls={modelUrls} />;
}
