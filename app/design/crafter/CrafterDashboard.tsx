"use client";

/**
 * The System B crafter page: click runes into a 3D sigil, move the minor runes
 * around the ring, add inscriptions, and read what the spell makes, with a hex
 * board preview of where it lands. Every control is a button; nothing drops
 * down (Jared, Nov 5).
 *
 * Like the rune page, all the 3D draws on one canvas with drei Views: one per
 * rune in the tray, one for the sigil and one for the board.
 */
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { DesignNav } from "../DesignNav";
import { RUNE_LOOKS } from "../runes/look";
import { pairs } from "../runes/pairs";
import { CameraForRune, RuneLights, RuneStone } from "../runes/RuneStone";
import type { RuneReference } from "../runes/reference";
import { BoardScene } from "./BoardScene";
import { planBoard } from "./board";
import styles from "./crafter.module.css";
import { GROUP_LABELS, INSCRIPTIONS, type InscriptionGroup, inscription } from "./inscriptions";
import { Readout } from "./Readout";
import { GROUP_COLORS, SIGIL_SPAN, SigilScene, slotPosition } from "./SigilScene";
import {
  blockedReason,
  emptySigil,
  freeSlots,
  MAX_SIZE,
  MIN_SIZE,
  minorBlockedReason,
  moveRune,
  nextSlot,
  placeRune,
  readSigil,
  removeOne,
  removeRune,
  resize,
  type Sigil,
  sealedSlots,
  swapWithCenter,
  toggleInscription,
  toggleMinor,
} from "./sigil";

type Slot = "center" | number;
const GROUPS: InscriptionGroup[] = ["shape", "where", "who", "when", "move", "tether", "trigger"];
const SIZES = Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => MIN_SIZE + i);

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const update = () => setReduced(q.matches);
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Percent offsets for a button laid over a point of the sigil view. */
function overlay(x: number, y: number, diameter: number): CSSProperties {
  const pct = (v: number) => `${(v / SIGIL_SPAN) * 100}%`;
  return {
    left: `calc(50% + ${pct(x - diameter / 2)})`,
    top: `calc(50% - ${pct(y + diameter / 2)})`,
    width: pct(diameter),
    height: pct(diameter),
  };
}

export function CrafterDashboard({
  reference,
  modelUrls,
  grounds,
}: {
  reference: RuneReference;
  modelUrls: Record<string, string>;
  /** The ground each major rune makes, from system-b.md. */
  grounds: Record<string, string>;
}) {
  const [sigil, setSigil] = useState<Sigil>(() => emptySigil());
  const [selected, setSelected] = useState<Slot | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const groups = useMemo(() => pairs(reference), [reference]);
  const names = useMemo(() => new Map(reference.runes.map((r) => [r.slug, r.name])), [reference]);
  const readout = useMemo(() => readSigil(reference, sigil, grounds), [reference, sigil, grounds]);
  const plan = useMemo(() => planBoard(sigil), [sigil]);
  const kind = readout.makes.kind;
  const free = freeSlots(sigil);

  function update(next: Sigil, failure: string) {
    if (next === sigil) setMessage(failure);
    else {
      setMessage(null);
      setSigil(next);
    }
  }

  function addRune(slug: string) {
    const target = selected ?? nextSlot(sigil);
    if (target === null) {
      setMessage("The sigil is full. Remove a rune or an inscription, or make the sigil bigger.");
      return;
    }
    update(
      placeRune(sigil, slug, target),
      "No free slot there. Remove a rune or an inscription, or make the sigil bigger.",
    );
    setSelected(null);
  }

  function clickSlot(slot: Slot) {
    setMessage(null);
    setSelected((s) => (s === slot ? null : slot));
  }

  const sealed = sealedSlots(sigil);
  const selectedRune = selected === null ? null : selected === "center" ? sigil.center : (sigil.ring[selected] ?? null);
  const targetLabel = (() => {
    const t = selected ?? nextSlot(sigil);
    if (t === null) return "The sigil is full";
    if (t === "center")
      return selected === "center" && sigil.center ? "Replacing the major rune" : "Adding to the center";
    return sigil.ring[t] ? `Replacing the minor rune at position ${t + 1}` : `Adding to ring position ${t + 1}`;
  })();

  return (
    <div className={styles.page}>
      <DesignNav current="crafter" />
      <header className={styles.header}>
        <h1>System B crafter</h1>
        <p className={styles.muted}>
          A design mock of the forge. It reads the rune tables and the System B rules from the docs, so it changes when
          they do. Symbols and colours are placeholders.
        </p>
      </header>

      <section className={styles.tray} aria-label="Runes">
        <p className={styles.trayHint}>
          {targetLabel}. Click a rune{selected === null ? ", or choose a slot on the sigil first" : ""}.
        </p>
        <div className={styles.trayRunes}>
          {groups.map((group) => (
            <div key={group.map((r) => r.slug).join("-")} className={styles.pair}>
              {group.map((rune) => (
                <button
                  key={rune.slug}
                  type="button"
                  className={styles.trayRune}
                  style={{ "--glow": RUNE_LOOKS[rune.slug]?.color ?? "#b8b0a2" } as CSSProperties}
                  onClick={() => addRune(rune.slug)}
                >
                  <View className={styles.trayView}>
                    <CameraForRune />
                    <RuneLights />
                    <RuneStone
                      slug={rune.slug}
                      modelUrl={modelUrls[rune.slug] ?? null}
                      motion={{ idleTurn: false, reducedMotion }}
                    />
                  </View>
                  <span>{rune.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {message ? (
        <p className={styles.message} role="status">
          {message}
        </p>
      ) : null}

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.sigil}>
            <View className={styles.fill}>
              <SigilScene sigil={sigil} selected={selected} modelUrls={modelUrls} reducedMotion={reducedMotion} />
            </View>
            <button
              type="button"
              className={`${styles.socket} ${selected === "center" ? styles.socketOn : ""}`}
              style={overlay(0, 0, 2.1)}
              onClick={() => clickSlot("center")}
              aria-label={sigil.center ? `Major rune: ${names.get(sigil.center)}` : "Empty center"}
            />
            {sigil.ring.map((slug, slot) => {
              const [x, y] = slotPosition(slot, sigil.size);
              return (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: ring positions are the identity here.
                  key={slot}
                  type="button"
                  className={`${styles.socket} ${selected === slot ? styles.socketOn : ""}`}
                  style={overlay(x, y, 1.0)}
                  onClick={() => clickSlot(slot)}
                  aria-label={
                    slug
                      ? `Ring position ${slot + 1}: ${names.get(slug)}`
                      : sealed.has(slot)
                        ? `Ring position ${slot + 1}, taken by an inscription`
                        : `Ring position ${slot + 1}, empty`
                  }
                />
              );
            })}
          </div>

          <div className={styles.controls}>
            <div className={styles.row}>
              <span className={styles.label}>Sigil size</span>
              {SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n === sigil.size ? styles.chipOn : styles.chip}
                  onClick={() => {
                    update(resize(sigil, n), `The runes and inscriptions take more than ${n} slots.`);
                    setSelected(null);
                  }}
                >
                  {n}
                </button>
              ))}
              <span className={styles.label}>
                {free} of {sigil.size} slots free
              </span>
            </div>

            {selected !== null && selectedRune ? (
              <div className={styles.row}>
                <span className={styles.label}>{names.get(selectedRune)}</span>
                {selected !== "center" ? (
                  <>
                    <button type="button" className={styles.chip} onClick={() => setSelected(moveAndSelect(-1))}>
                      ◀ Anticlockwise
                    </button>
                    <button type="button" className={styles.chip} onClick={() => setSelected(moveAndSelect(1))}>
                      Clockwise ▶
                    </button>
                    <button
                      type="button"
                      className={styles.chip}
                      onClick={() => {
                        update(swapWithCenter(sigil, selected), "");
                        setSelected("center");
                      }}
                    >
                      Swap with the center
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() => {
                    update(removeRune(sigil, selected), "");
                    setSelected(null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : null}

            {typeof selected === "number" && selectedRune ? (
              <div className={styles.row}>
                <span className={styles.label}>Attach to this minor rune</span>
                {INSCRIPTIONS.filter((i) => i.minor).map((ins) => {
                  const on = (sigil.minor[selected] ?? []).includes(ins.id);
                  const reason = on ? null : minorBlockedReason(sigil, selected, ins.id);
                  return (
                    <button
                      key={ins.id}
                      type="button"
                      className={on ? styles.chipOn : reason ? styles.chipOff : styles.chip}
                      title={reason ?? ins.note}
                      onClick={() =>
                        update(toggleMinor(sigil, selected, ins.id), `Can't attach ${ins.label}: ${reason}`)
                      }
                    >
                      {ins.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className={styles.row}>
              <button
                type="button"
                className={styles.chip}
                onClick={() => {
                  setSigil(emptySigil(sigil.size));
                  setSelected(null);
                  setMessage(null);
                }}
              >
                Clear the sigil
              </button>
            </div>
          </div>

          <div className={styles.board}>
            <View className={styles.fill}>
              <BoardScene plan={plan} kind={kind} centerSlug={sigil.center} hasCenter={Boolean(sigil.center)} />
            </View>
          </div>
          <p className={styles.boardNote}>
            Where it lands: you at the bottom, targets ahead. A sketch of the shape, not the battle rules.
          </p>
        </div>

        <div className={styles.right}>
          <section className={styles.inscriptions} aria-label="Inscriptions">
            <h2>Inscriptions</h2>
            {GROUPS.map((group) => (
              <div key={group} className={styles.group}>
                <span className={styles.groupName} style={{ color: GROUP_COLORS[group] }}>
                  {GROUP_LABELS[group]}
                </span>
                <div className={styles.chips}>
                  {INSCRIPTIONS.filter((i) => i.group === group).map((ins) => {
                    const count = sigil.inscriptions.filter((i) => i === ins.id).length;
                    const on =
                      count > 0 ||
                      (ins.id === "single" && !sigil.inscriptions.some((i) => inscription(i).group === "shape"));
                    const reason = count > 0 && !(ins.max && ins.max > 1) ? null : blockedReason(sigil, ins.id);
                    return (
                      <span key={ins.id} className={styles.chipWrap}>
                        <button
                          type="button"
                          className={on ? styles.chipOn : reason ? styles.chipOff : styles.chip}
                          title={reason ?? ins.note}
                          onClick={() => {
                            if (ins.id === "single") {
                              const shape = sigil.inscriptions.find((i) => inscription(i).group === "shape");
                              update(
                                shape ? toggleInscription(sigil, shape) : sigil,
                                "Single target is already the shape.",
                              );
                              return;
                            }
                            update(toggleInscription(sigil, ins.id), `Can't add ${ins.label}: ${reason}`);
                          }}
                        >
                          {ins.label}
                          {count > 1 ? ` ×${count}` : ""}
                          <span className={styles.cost}>{ins.slots}</span>
                        </button>
                        {ins.max && ins.max > 1 && count > 0 ? (
                          <button
                            type="button"
                            className={styles.chip}
                            aria-label={`Remove one ${ins.label}`}
                            onClick={() => update(removeOne(sigil, ins.id), "")}
                          >
                            −
                          </button>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className={styles.source}>
              The small number is the slots it takes. The docs give the cost of single target (0), large area (2), whole
              battlefield (3) and extra destination (1); every other cost is counted as 1 until the docs say.
            </p>
          </section>

          <Readout data={readout} />
        </div>
      </div>

      <Canvas style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }} dpr={[1, 2]}>
        <View.Port />
      </Canvas>
    </div>
  );

  function moveAndSelect(step: 1 | -1): Slot | null {
    if (typeof selected !== "number") return selected;
    const { sigil: next, to } = moveRune(sigil, selected, step);
    setSigil(next);
    return to;
  }
}
