import type { Metadata } from "next";
import { runePageData } from "../runes/data";
import { CrafterDashboard } from "./CrafterDashboard";

export const metadata: Metadata = { title: "System B crafter · The Hollow design" };

// The System B crafter: a design mock that reads the rune reference doc when the page is built.
export default function CrafterPage() {
  const { reference, modelUrls } = runePageData();
  return <CrafterDashboard reference={reference} modelUrls={modelUrls} />;
}
