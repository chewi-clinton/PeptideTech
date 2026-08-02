// Icon paths copied verbatim from peptidetech.is's own inline SVGs (not
// approximated) so the rebuild uses the exact same iconography.

function Svg({ children, size = 20, viewBox = "0 0 24 24", ...props }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

const stroke = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconLock = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </g>
  </Svg>
);

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const IconAccount = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </g>
  </Svg>
);

export const IconCart = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M3 3h2l.6 3M7 13h11l2-8H5.6" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
      <path d="M7 13 5.6 6" />
    </g>
  </Svg>
);

export const IconMenu = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </g>
  </Svg>
);

export const IconChevronDown = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="m6 9 6 6 6-6" />
    </g>
  </Svg>
);

export const IconArrowRight = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      fill="currentColor"
    />
  </Svg>
);

export const IconChevronRight = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 012 10V3a1 1 0 011-1h7a1 1 0 01.707.293l7 7zM5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
      fill="currentColor"
    />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      fill="currentColor"
    />
  </Svg>
);

export const IconPlus = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      fill="currentColor"
    />
  </Svg>
);

export const IconShield = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5l-6.6 3.3a1 1 0 00-.6.9V9.1c0 4.6 3.1 8.4 7.2 9.4 4.1-1 7.2-4.8 7.2-9.4V5.7a1 1 0 00-.6-.9L10 1.5zM5.4 5.9L10 3.6l4.6 2.3V9.1c0 3.7-2.4 6.7-5.6 7.5l-1.2-.3-.6-.1-.8-.3C8.2 15.4 5.4 12.5 5.4 9.1V5.9z"
      fill="currentColor"
    />
  </Svg>
);

export const IconClock = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z" />
    </g>
  </Svg>
);

export const IconLightning = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </g>
  </Svg>
);

export const IconGlobe = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z" />
    </g>
  </Svg>
);

export const IconTag = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 012 10V3a1 1 0 011-1h7a1 1 0 01.707.293l7 7zM5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
      fill="currentColor"
    />
  </Svg>
);

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
  </Svg>
);

export const IconHeadphones = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <rect x="2.5" y="12" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="12" width="4" height="6" rx="1.5" />
      <path d="M20 18v1a3 3 0 0 1-3 3h-3" />
    </g>
  </Svg>
);

export const IconFlag = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M4 22V3" />
      <path d="M4 4h13l-2 4 2 4H4" />
    </g>
  </Svg>
);

export const IconGrid = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </g>
  </Svg>
);

export const IconFlask = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M9 2v6L4.5 16A2 2 0 0 0 6.3 19h11.4a2 2 0 0 0 1.8-3L15 8V2" />
      <path d="M7.5 2h9" />
      <path d="M7 14h10" />
    </g>
  </Svg>
);

export const IconMedal = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path
      d="M12 6.5v5M10.5 8h2a1.2 1.2 0 0 1 0 2.4h-1a1.2 1.2 0 0 0 0 2.4h2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M8 14.5 6.5 22 12 19l5.5 3L16 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const IconIdentity = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm7.586 6.707a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0L6.293 12.83a1 1 0 111.414-1.414L9.5 13.207l2.086-2.5z"
      fill="currentColor"
    />
  </Svg>
);

export const IconPurity = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 3.5A1.5 1.5 0 017 2h2.5v2.5h2.1l1.9 3.2A5 5 0 0115 17H3a1 1 0 110-2h.5v-3a3 3 0 012-2.8V3.5zm2.5 6.5h3l-1-1.7V7H7v3z"
      fill="currentColor"
    />
  </Svg>
);

export const IconNetContent = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M9 3h6M10 3v5l-4.5 9A2 2 0 0 0 7.3 20h9.4a2 2 0 0 0 1.8-3L14 8V3" />
      <path d="M7 14h10" />
    </g>
  </Svg>
);

export const IconConformity = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v3l-4 2 4 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3l4-2-4-2V5zm14 0H4v2.2l4 2L4 11.2V13h12v-1.8l-4-2 4-2V5z"
      fill="currentColor"
    />
  </Svg>
);

export const IconEndotoxin = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </g>
  </Svg>
);

export const IconStar = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path d="M10 1l2.39 4.84L17.6 6.8l-3.8 3.7.9 5.2L10 13.3l-4.7 2.4.9-5.2-3.8-3.7 5.21-1.96z" fill="currentColor" />
  </Svg>
);

export const IconCube = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </g>
  </Svg>
);

export const IconGift = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M4 13h16M12 9v11" />
      <path d="M12 9S10.5 4 8 4a2.2 2.2 0 0 0 0 5zM12 9s1.5-5 4-5a2.2 2.2 0 0 1 0 5z" />
    </g>
  </Svg>
);

export const IconCart2 = IconCart;

export const IconMail = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  </Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </g>
  </Svg>
);

export const IconX = (p) => (
  <Svg {...p} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </Svg>
);

export const IconClockSimple = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 8.586V5z"
      fill="currentColor"
    />
  </Svg>
);

export const IconFileText = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </g>
  </Svg>
);

export const IconSearchLarge = (p) => (
  <Svg viewBox="0 0 20 20" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      fill="currentColor"
    />
  </Svg>
);

export const IconFilter = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </g>
  </Svg>
);

export const IconWarningTriangle = (p) => (
  <Svg {...p}>
    <g fill="none" {...stroke}>
      <path d="M12 3 2 21h20L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
    </g>
  </Svg>
);

export const IconTikTok = (p) => (
  <Svg {...p} fill="currentColor">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.95a2.6 2.6 0 0 1-2.6 2.6 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 2.6-2.6c.27 0 .53.04.78.12V9.2a5.86 5.86 0 0 0-.78-.05A5.79 5.79 0 0 0 3.15 15a5.79 5.79 0 0 0 5.79 5.79 5.79 5.79 0 0 0 5.79-5.79V9.01a7.5 7.5 0 0 0 4.38 1.4V7.21a4.28 4.28 0 0 1-2.5-1.39z" />
  </Svg>
);
