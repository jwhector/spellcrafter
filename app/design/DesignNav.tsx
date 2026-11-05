import Link from "next/link";
import styles from "./design.module.css";

/** The design dashboard's page links, shown at the top of each page. */
export function DesignNav({ current }: { current: "runes" | "crafter" }) {
  return (
    <nav className={styles.nav} aria-label="Design dashboard">
      <Link href="/design">The Hollow design</Link>
      <span aria-hidden="true">·</span>
      <Link href="/design/runes" aria-current={current === "runes" ? "page" : undefined}>
        Runes
      </Link>
      <span aria-hidden="true">·</span>
      <Link href="/design/crafter" aria-current={current === "crafter" ? "page" : undefined}>
        System B crafter
      </Link>
    </nav>
  );
}
