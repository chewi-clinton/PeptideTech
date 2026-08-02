// Static decorative QR-style module grid (not a scannable code — this is a
// "representative example" trust card, not a real per-order QR) used to
// replace a plain blank square with something that actually reads as a QR
// code visually, matching the live site's hero trust card.
const SIZE = 21;

// Deterministic pseudo-random module pattern with the three standard QR
// finder squares locked into the corners, generated once (not re-rolled per
// render) so the "code" stays visually stable.
function buildModules() {
  const modules = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  const finder = (r0, c0) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onRing = r === 0 || r === 6 || c === 0 || c === 6;
        const onCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        modules[r0 + r][c0 + c] = onRing || onCore;
      }
    }
  };
  finder(0, 0);
  finder(0, SIZE - 7);
  finder(SIZE - 7, 0);

  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed >>> 8) / 0x7fffff;
  };
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const inFinder =
        (r < 8 && c < 8) || (r < 8 && c > SIZE - 9) || (r > SIZE - 9 && c < 8);
      if (inFinder) continue;
      modules[r][c] = rand() > 0.58;
    }
  }
  return modules;
}

const MODULES = buildModules();

export default function QrCodePattern({ size = 48 }) {
  const cell = size / SIZE;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <rect width={size} height={size} fill="#fff" />
      {MODULES.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#0a1828"
            />
          ) : null
        )
      )}
    </svg>
  );
}
