import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asking Card",
  description: "Create and share cards with real-time updates",
  keywords: ["cards", "real-time", "collaboration", "sharing"],
  authors: [{ name: "Asking Card Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <div className="content-wrap">{children}</div>
          <footer className="footer">
            <div className="container">
              <p className="footer-text">
                Real-time collaboration • Built with Next.js
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
