import type { Metadata } from "next";
import { CrafterDashboard } from "./CrafterDashboard";
import { crafterPageData } from "./data";

export const metadata: Metadata = { title: "System B crafter · The Hollow design" };

// The System B crafter: a design mock that reads the rune reference and System B docs when the page is built.
export default function CrafterPage() {
  const { reference, modelUrls, grounds } = crafterPageData();
  return <CrafterDashboard reference={reference} modelUrls={modelUrls} grounds={grounds} />;
}
