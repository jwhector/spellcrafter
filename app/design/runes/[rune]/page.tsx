import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { runePageData } from "../data";
import { loadRuneReference } from "../load";
import { RuneDashboard } from "../RuneDashboard";

// One page per rune in the rune reference doc, built ahead; any other name is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return loadRuneReference().runes.map((r) => ({ rune: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ rune: string }> }): Promise<Metadata> {
  const { rune } = await params;
  const name = loadRuneReference().runes.find((r) => r.slug === rune)?.name ?? "Rune";
  return { title: `${name} · The Hollow design` };
}

export default async function RunePage({ params }: { params: Promise<{ rune: string }> }) {
  const { rune } = await params;
  const { reference, modelUrls } = runePageData();
  if (!reference.runes.some((r) => r.slug === rune)) notFound();
  // The dashboard reads the chosen rune from the address, so moving between runes needs no page load.
  return <RuneDashboard reference={reference} modelUrls={modelUrls} />;
}
