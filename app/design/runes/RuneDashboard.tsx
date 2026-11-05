"use client";

/**
 * The rune overview page: a hotbar of small 3D runes, a stage where the chosen
 * rune appears large, and the panel with what the rune reference doc says
 * about it.
 *
 * All the 3D draws on one canvas fixed over the page. Each hotbar slot and the
 * stage is a drei View: a div whose place on screen the canvas draws into.
 * Browsers allow only about 16 live WebGL canvases, so one canvas per slot
 * would fail.
 *
 * The summon: clicking a slot moves the stage's div to the slot's place and
 * size, then lets it slide back to the stage with a CSS transition. The View
 * follows its div every frame, so the rune flies from the hotbar and grows on
 * the way, then spins and its symbol flares as it lands.
 */
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { type CSSProperties, type PointerEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DesignNav } from "../DesignNav";
import { RUNE_LOOKS } from "./look";
import { pairs } from "./pairs";
import { RunePanel, TablePanel } from "./RunePanel";
import { CameraForRune, RuneLights, RuneStone } from "./RuneStone";
import type { RuneReference } from "./reference";
import styles from "./runes.module.css";

const BASE = "/design/runes";
const FLIGHT_MS = 650;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function RuneDashboard({
  reference,
  modelUrls,
}: {
  reference: RuneReference;
  modelUrls: Record<string, string>;
}) {
  const pathname = usePathname();
  const selectedSlug = pathname.startsWith(`${BASE}/`) ? pathname.slice(BASE.length + 1) : null;
  const selected = reference.runes.find((r) => r.slug === selectedSlug) ?? null;

  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [view, setView] = useState<string>("rune");
  const [summons, setSummons] = useState(0);

  const slotEls = useRef(new Map<string, HTMLElement>());
  const pod = useRef<HTMLDivElement>(null);
  const flightFrom = useRef<DOMRect | null>(null);
  const drag = useRef({ yaw: 0, pitch: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const groups = useMemo(() => pairs(reference), [reference]);
  const tables = [reference.center, ...reference.minorEffects];
  const shownTable = tables.find((t) => t.id === view);

  function pick(slug: string) {
    setView("rune");
    if (slug === selected?.slug) {
      setSummons((n) => n + 1);
      return;
    }
    flightFrom.current = slotEls.current.get(slug)?.getBoundingClientRect() ?? null;
    drag.current = { yaw: 0, pitch: 0 };
    window.history.pushState(null, "", `${BASE}/${slug}`);
  }

  // Each time the selected rune changes, play the summon: fly from where it was picked, then spin and flare.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the summon replays only when the rune changes.
  useLayoutEffect(() => {
    if (!selected) return;
    setSummons((n) => n + 1);
    const el = pod.current;
    const from = flightFrom.current;
    flightFrom.current = null;
    if (!el || !from || reducedMotion) return;
    const to = el.getBoundingClientRect();
    if (to.width === 0) return;
    el.style.transition = "none";
    el.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`;
    void el.offsetWidth; // apply the start position before the transition begins
    el.style.transition = `transform ${FLIGHT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
    el.style.transform = "";
  }, [selected?.slug]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const from = dragging.current;
    if (!from) return;
    drag.current.yaw += (e.clientX - from.x) * 0.012;
    drag.current.pitch = Math.max(-1, Math.min(1, drag.current.pitch + (e.clientY - from.y) * 0.012));
    dragging.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp() {
    dragging.current = null;
  }

  return (
    <div className={styles.page}>
      <DesignNav current="runes" />
      <nav className={styles.hotbar} aria-label="Runes">
        {groups.map((group) => (
          <div key={group.map((r) => r.slug).join("-")} className={styles.pair}>
            {group.map((rune) => (
              <a
                key={rune.slug}
                href={`${BASE}/${rune.slug}`}
                ref={(el) => {
                  if (el) slotEls.current.set(rune.slug, el);
                  else slotEls.current.delete(rune.slug);
                }}
                className={`${styles.slot} ${rune.slug === selected?.slug ? styles.slotActive : ""}`}
                aria-current={rune.slug === selected?.slug ? "page" : undefined}
                style={{ "--glow": RUNE_LOOKS[rune.slug]?.color ?? "#b8b0a2" } as CSSProperties}
                onClick={(e) => {
                  e.preventDefault();
                  pick(rune.slug);
                }}
                onPointerEnter={() => setHovered(rune.slug)}
                onPointerLeave={() => setHovered((h) => (h === rune.slug ? null : h))}
              >
                <View className={styles.slotView}>
                  <CameraForRune />
                  <RuneLights />
                  <RuneStone
                    slug={rune.slug}
                    modelUrl={modelUrls[rune.slug] ?? null}
                    motion={{ idleTurn: hovered === rune.slug, reducedMotion }}
                  />
                </View>
                <span className={styles.slotName}>{rune.name}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
      <p className={styles.placeholderNote}>
        The symbols and colours are placeholders, not decided. The text comes from docs/design/rune-reference.md.
      </p>

      <div className={styles.main}>
        <div className={styles.stage}>
          {selected ? (
            <div
              ref={pod}
              key={reducedMotion ? selected.slug : "pod"}
              className={styles.pod}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              title="Drag to turn the rune"
            >
              <View className={styles.podView}>
                <CameraForRune />
                <RuneLights />
                <RuneStone
                  key={selected.slug}
                  slug={selected.slug}
                  modelUrl={modelUrls[selected.slug] ?? null}
                  motion={{ idleTurn: true, summonKey: summons, drag, reducedMotion }}
                />
              </View>
            </div>
          ) : (
            <p className={styles.empty}>Choose a rune from the bar above.</p>
          )}
        </div>

        <aside className={styles.panel}>
          <div className={styles.tabs} role="tablist" aria-label="What the panel shows">
            <button
              type="button"
              role="tab"
              aria-selected={view === "rune"}
              className={view === "rune" ? styles.tabActive : styles.tab}
              onClick={() => setView("rune")}
            >
              This rune
            </button>
            <label className={styles.tableTab}>
              <span>Every rune in</span>
              <select
                value={shownTable ? shownTable.id : ""}
                onChange={(e) => setView(e.target.value || "rune")}
                aria-label="Show one table for every rune"
              >
                <option value="">choose a table</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {shownTable ? (
            <TablePanel reference={reference} table={shownTable} onPick={pick} />
          ) : selected ? (
            <RunePanel reference={reference} rune={selected} onPick={pick} />
          ) : (
            <p className={styles.muted}>
              Each rune shows its major output and its minor rune effect in every major output type, with the status the
              design docs give each one.
            </p>
          )}
        </aside>
      </div>

      <Canvas style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }} dpr={[1, 2]}>
        <View.Port />
      </Canvas>
    </div>
  );
}
