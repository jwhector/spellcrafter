"use client";

/** The plain-text readout of what a sigil makes, with each line's status from the docs. */
import { Badge } from "../runes/RunePanel";
import { Text } from "../runes/Text";
import styles from "./crafter.module.css";
import type { OutputKind, Readout as ReadoutData } from "./sigil";

function madeThing(kind: OutputKind): string {
  switch (kind) {
    case "at a destination":
      return "an effect on an area";
    case "on a unit":
      return "an effect on one unit";
    case "on a shield":
      return "a shield";
    case "on ground":
      return "ground";
    case "through a gate":
      return "a gate";
    case "on a summon":
      return "a summon";
    case "on a spell":
      return "an altered spell";
    case "global":
      return "a global modification";
  }
}

export function Readout({ data }: { data: ReadoutData }) {
  const { center, makes, majorOutput, shape, destinations, sections, orderFree, inscriptions, notes } = data;
  const placed = sections.some((s) => s.lines.length > 0);
  return (
    <section className={styles.readout} aria-live="polite">
      <h2>What it makes</h2>
      {center ? (
        <>
          <p className={styles.makesLine}>
            A <strong>{center.name}</strong> center, {shape.label}
            {destinations > 1 ? `, ${destinations} destinations` : ""}, makes <strong>{madeThing(makes.kind)}</strong>.{" "}
            <Badge status={makes.status} />
          </p>
          <p className={styles.muted}>
            {makes.why} {makes.table ? <>Its minor runes read the &ldquo;{makes.table.title}&rdquo; table.</> : null}
          </p>

          <h3>Major output</h3>
          {majorOutput ? (
            <p>
              <Text>{majorOutput.text || "Not written yet."}</Text> <Badge status={majorOutput.status} />
              <span className={styles.label}> ({majorOutput.column.toLowerCase()})</span>
            </p>
          ) : null}
        </>
      ) : null}

      {placed ? (
        <>
          <h3>Minor runes {orderFree ? "(aspects: their order doesn't matter)" : "(clockwise, from the top)"}</h3>
          {sections.map((sec) =>
            sec.lines.length ? (
              <div key={sec.destination}>
                {sections.length > 1 ? <h4>At destination {sec.destination}</h4> : null}
                <ol className={styles.lines}>
                  {sec.lines.map((line) => (
                    <li key={line.slot}>
                      <strong>{line.rune.name}</strong>: <Text>{line.text}</Text> <Badge status={line.status} />
                      {line.extra.map((e) => (
                        <span key={e.label} className={styles.label}>
                          {" "}
                          {e.label}: <Text>{e.text}</Text>.
                        </span>
                      ))}
                      {line.minorInscriptions.map((mi) => (
                        <div key={mi.label} className={styles.minorLine}>
                          With {mi.label}: {mi.text} <Badge status={mi.status} />
                        </div>
                      ))}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null,
          )}
        </>
      ) : null}

      {inscriptions.length ? (
        <>
          <h3>Inscriptions</h3>
          <ul className={styles.lines}>
            {inscriptions.map(({ ins, count }) => (
              <li key={ins.id}>
                <strong>
                  {ins.label}
                  {count > 1 ? ` ×${count}` : ""}
                </strong>
                : {ins.note} <Badge status={ins.status} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {notes.length ? (
        <>
          <h3>Rules that apply</h3>
          <ul className={styles.lines}>
            {notes.map((n) => (
              <li key={n.text} className={n.warn ? styles.warn : undefined}>
                {n.text} <Badge status={n.status} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <p className={styles.source}>
        Read from docs/design/rune-reference.md and docs/design/system-b.md. No numbers yet: strength, budget and
        cooldown come with the engine.
      </p>
    </section>
  );
}
