"use client";

/**
 * The information beside the stage: everything the rune reference doc says
 * about one rune, or one major output type for every rune. Words follow the
 * glossary in docs/design/system-b.md.
 */
import {
  cellStatus,
  mainColumn,
  mentions,
  type Rune,
  type RuneReference,
  type RuneTable,
  type Status,
} from "./reference";
import styles from "./runes.module.css";
import { Text } from "./Text";

export function Badge({ status, title }: { status: Status; title?: string }) {
  return (
    <span className={`${styles.badge} ${styles[`status${status}`]}`} title={title}>
      {status}
    </span>
  );
}

type Pick = (slug: string) => void;

function RuneLink({ name, reference, onPick }: { name: string; reference: RuneReference; onPick: Pick }) {
  const rune = reference.runes.find((r) => r.name === name);
  if (!rune) return <Text>{name}</Text>;
  return (
    <a
      href={`/design/runes/${rune.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onPick(rune.slug);
      }}
    >
      {rune.name}
    </a>
  );
}

function TableSection({ table, rune }: { table: RuneTable; rune: Rune }) {
  const row = table.rows[rune.slug];
  const main = mainColumn(table);
  const notes = table.notes.filter((n) => mentions(n, rune));
  return (
    <section className={styles.card}>
      <header className={styles.cardHead}>
        <h4>{table.title}</h4>
        <Badge status={row ? cellStatus(table, row[main] ?? "") : table.status} title={table.statusNote} />
      </header>
      {row ? (
        <>
          <p className={styles.effect}>
            <Text>{row[main] || "Nothing written yet."}</Text>
          </p>
          {table.columns
            .filter((c) => c !== main && row[c])
            .map((c) => (
              <p key={c} className={styles.label}>
                {c}: <Text>{row[c] ?? ""}</Text>
              </p>
            ))}
        </>
      ) : (
        <p className={styles.muted}>This table has no row for {rune.name} yet.</p>
      )}
      {notes.map((n) => (
        <p key={n} className={styles.note}>
          <Text>{n}</Text>
        </p>
      ))}
      <p className={styles.source}>{table.statusNote}</p>
    </section>
  );
}

export function RunePanel({ reference, rune, onPick }: { reference: RuneReference; rune: Rune; onPick: Pick }) {
  const { center } = reference;
  const row = center.rows[rune.slug] ?? {};
  const centerNotes = center.notes.filter((n) => mentions(n, rune) || !reference.runes.some((r) => mentions(n, r)));
  const open = reference.openItems.filter((item) => mentions(item, rune));
  return (
    <div className={styles.panelBody}>
      <h2 className={styles.runeName}>{rune.name}</h2>
      {rune.nameNote ? <p className={styles.muted}>{rune.nameNote}</p> : null}

      <section className={styles.card}>
        <header className={styles.cardHead}>
          <h3>Major output</h3>
          <Badge status={center.status} title={center.statusNote} />
        </header>
        <dl className={styles.facts}>
          {center.columns.map((c) => {
            const value = row[c] ?? "";
            return (
              <div key={c} className={styles.fact}>
                <dt>{c}</dt>
                <dd>
                  {c === "Opposite" ? (
                    <RuneLink name={value} reference={reference} onPick={onPick} />
                  ) : (
                    <Text>{value || "Not set"}</Text>
                  )}
                  {/^Open\b/.test(value) ? <Badge status="Open" /> : null}
                </dd>
              </div>
            );
          })}
        </dl>
        {centerNotes.map((n) => (
          <p key={n} className={styles.note}>
            <Text>{n}</Text>
          </p>
        ))}
        <p className={styles.source}>{center.statusNote}</p>
      </section>

      <h3 className={styles.groupHead}>Minor rune effect in each major output type</h3>
      <p className={styles.muted}>
        What {rune.name} does as a minor rune in the ring, for each kind of thing the center makes.
      </p>
      {reference.minorEffects.map((t) => (
        <TableSection key={t.id} table={t} rune={rune} />
      ))}

      {open.length ? (
        <>
          <h3 className={styles.groupHead}>Open questions</h3>
          <ul className={styles.openList}>
            {open.map((item) => (
              <li key={item}>
                <Text>{item}</Text>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

/** One table for every rune: how the ring review reads the doc. */
export function TablePanel({ reference, table, onPick }: { reference: RuneReference; table: RuneTable; onPick: Pick }) {
  const isCenter = table === reference.center;
  const columns = isCenter
    ? table.columns
    : [mainColumn(table), ...table.columns.filter((c) => c !== mainColumn(table))];
  return (
    <div className={styles.panelBody}>
      <header className={styles.cardHead}>
        <h2 className={styles.runeName}>{table.title}</h2>
        <Badge status={table.status} title={table.statusNote} />
      </header>
      <p className={styles.source}>{table.statusNote}</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rune</th>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reference.runes.map((rune) => {
              const row = table.rows[rune.slug];
              if (!row) return null;
              return (
                <tr key={rune.slug}>
                  <th scope="row">
                    <RuneLink name={rune.name} reference={reference} onPick={onPick} />
                  </th>
                  {columns.map((c) => (
                    <td key={c}>
                      <Text>{row[c] ?? ""}</Text>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.notes.map((n) => (
        <p key={n} className={styles.note}>
          <Text>{n}</Text>
        </p>
      ))}
    </div>
  );
}
