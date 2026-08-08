import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TopBanner from "@/components/TopBanner";
import CartDrawer from "@/components/CartDrawer";
import TawkChat from "@/components/TawkChat";
import MobileTabBar from "@/components/MobileTabBar";

export default function SiteLayout({ children }) {
  return (
    <>
      <TopBanner />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
      <TawkChat />
      <MobileTabBar />
    </>
  );
}
