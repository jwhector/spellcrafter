import { inline } from "./reference";

/** Doc text with its inline Markdown: links shown as their text, bold and code kept. */
export function Text({ children }: { children: string }) {
  return (
    <>
      {inline(children).map((seg, i) => {
        const key = `${i}:${seg.text}`;
        if (seg.bold) return <strong key={key}>{seg.text}</strong>;
        if (seg.code) return <code key={key}>{seg.text}</code>;
        return <span key={key}>{seg.text}</span>;
      })}
    </>
  );
}
