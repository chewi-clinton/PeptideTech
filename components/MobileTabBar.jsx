"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import { IconAtom, IconShopBag, IconVerifyGrid, IconCart, IconAccount } from "@/components/icons";

// Matches the live site's fixed bottom tab bar exactly (icons, labels,
// order, and the display:none -> flex swap at 879px) — verified via
// Chrome DevTools against peptidetech.is/p/<any product>.
const TABS = [
  { label: "Home", href: "/", Icon: IconAtom },
  { label: "Shop", href: "/shop", Icon: IconShopBag },
  { label: "Verify", href: "/coa", Icon: IconVerifyGrid },
  { label: "Cart", href: "/cart", Icon: IconCart, showCount: true },
  { label: "Account", href: "/account/affiliate", Icon: IconAccount },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav
      className="pep-tabbar"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        background: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid var(--line)",
        display: "none",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map(({ label, href, Icon, showCount }) => {
        const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            style={{
              flex: 1,
              minHeight: 58,
              background: "none",
              border: 0,
              cursor: "pointer",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              color: active ? "var(--brand-2)" : "var(--ink-3)",
              fontFamily: "var(--font-sans-stack)",
              fontSize: 10.5,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex" }}>
              <Icon size={21} />
              {showCount && count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -8,
                    background: "var(--brand)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 9,
                    fontWeight: 700,
                    lineHeight: 1,
                    padding: "2px 4px",
                  }}
                >
                  {count}
                </span>
              )}
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
