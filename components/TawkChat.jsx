"use client";

import Script from "next/script";

// Live chat widget (Tawk.to) — matches the real site's floating
// bottom-right support chat. Free tier, human-staffed.
export default function TawkChat() {
  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6a73937b76440d1d4752bce8/1jv9ng7jv';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
