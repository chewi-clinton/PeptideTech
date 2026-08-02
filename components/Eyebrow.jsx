export default function Eyebrow({ children, color = "var(--brand-2)" }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono-stack)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </span>
  );
}
