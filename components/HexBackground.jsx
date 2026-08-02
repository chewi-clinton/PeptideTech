export default function HexBackground({ opacity = 0.06 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", color: "var(--ink)", opacity }}>
      <svg fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="lab-hex" width="56" height="64" patternUnits="userSpaceOnUse">
            <path d="M28 2 L52 16 L52 44 L28 58 L4 44 L4 16 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lab-hex)" />
      </svg>
    </div>
  );
}
