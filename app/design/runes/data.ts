/** What both rune routes pass the dashboard, read when the page is built. */
import { loadRuneReference, MODEL_DIR, runesWithModels } from "./load";

export function runePageData() {
  const reference = loadRuneReference();
  const modelUrls = Object.fromEntries(runesWithModels(reference).map((slug) => [slug, `/${MODEL_DIR}/${slug}.glb`]));
  return { reference, modelUrls };
}
