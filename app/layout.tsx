import "../styles/globals.css";

export const metadata = {
  title: "Michael Isih | Professional Web Development Services",
  description:
    "Professional website development services specializing in creating responsive, user-friendly, and visually appealing websites. Our expert developers use the latest technologies to build custom websites tailored to your business needs. Contact us for a free consultation and transform your online presence.",
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
        <meta
          name="keywords"
          content="web development, responsive websites, frontend, backend, react, nextjs, portfolio, michael isih"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/ded2uopl7/image/upload/v1751852355/michaelLogo_s5lfc6.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
