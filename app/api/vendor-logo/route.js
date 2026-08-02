// The scraped price-match / verified-peptides pages reference
// `/api/vendor-logo?domain=<vendor-domain>` for third-party vendor logos —
// an endpoint the original site served from its own backend, which we don't
// have and can't fabricate real competitor artwork for. Rather than leave a
// broken-image icon, return a neutral monogram badge so the layout renders
// as intended without claiming to be an actual vendor's logo.
const COLORS = ["#0d9488", "#0a2540", "#7f1d1d", "#92400e", "#3730a3", "#166534", "#9d174d"];

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain") || "vendor";
  const label = domain.replace(/^www\./, "").split(".")[0];
  const initial = (label[0] || "?").toUpperCase();
  const color = COLORS[hashCode(label) % COLORS.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="${color}" />
    <text x="32" y="42" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="26" font-weight="700" fill="#fff">${initial}</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
