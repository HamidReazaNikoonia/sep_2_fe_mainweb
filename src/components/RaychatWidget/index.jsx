/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react-dom/no-dangerously-set-innerhtml */
// components/RaychatWidget.tsx
'use client';
import Script from 'next/script';

export function RaychatWidget() {
  return (
    <Script
      id="raychat-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.RAYCHAT_TOKEN = "YOUR_WIDGET_TOKEN";
          (function() {
            const d = document;
            const s = d.createElement("script");
            s.src = "https://widget-react.raychat.io/install/widget.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  );
}
