export default function Loading({ text = "Loading..." }) {
  return (
    <div style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
      {text}
    </div>
  );
}
