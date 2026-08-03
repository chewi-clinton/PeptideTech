import { CartProvider } from "@/context/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TopBanner from "@/components/TopBanner";
import CartDrawer from "@/components/CartDrawer";

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <TopBanner />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </CartProvider>
  );
}
