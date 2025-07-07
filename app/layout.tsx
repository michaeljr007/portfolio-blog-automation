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
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="155996"
          async
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
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
