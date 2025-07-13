import Script from "next/script";
import "../styles/globals.css";

export const metadata = {
  title: "Michael Isih | Expert Web Developer for Businesses & Startups",
  description:
    "Grow your business with stunning, responsive websites. Michael Isih specializes in building fast, user-friendly React & Next.js applications tailored to your brand. Let's elevate your online presence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
        ></script>
        <script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/ded2uopl7/image/upload/v1751852355/michaelLogo_s5lfc6.jpg"
        />
        <meta property="og:url" content="https://yourdomain.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ded2uopl7/image/upload/v1751852355/michaelLogo_s5lfc6.jpg"
        />

        <link
          rel="icon"
          href="https://res.cloudinary.com/ded2uopl7/image/upload/v1751852355/michaelLogo_s5lfc6.jpg"
        />
        <script async src="//www.ezojs.com/ezoic/sa.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8289355156432466"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
