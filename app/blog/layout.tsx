// /app/blog/layout.tsx
import React from "react";

export const metadata = {
  title: "Blog | Michael's Portfolio",
  description: "Read articles on web development, AI, sports and more.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-surface transition-colors duration-300">
      {/* You can add a header or sidebar here if you want */}
      {children}
    </main>
  );
}
