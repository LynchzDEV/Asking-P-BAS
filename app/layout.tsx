import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Asking Card - Real-time Collaboration Platform",
    template: "%s | Asking Card"
  },
  description: "Create and share asking cards with real-time collaboration. Perfect for Q&A sessions, team discussions, and instant feedback collection. No signup required.",
  keywords: [
    "asking card",
    "real-time collaboration", 
    "question cards",
    "team communication",
    "instant feedback",
    "Q&A platform",
    "collaborative tools",
    "discussion cards",
    "online collaboration",
    "team productivity",
    "socket.io",
    "nextjs"
  ],
  authors: [{ name: "LynchzDEV", url: "https://asking.lynchz.dev" }],
  creator: "LynchzDEV",
  publisher: "asking.lynchz.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://asking.lynchz.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Asking Card - Real-time Collaboration Platform",
    description: "Create and share asking cards with real-time collaboration. Perfect for Q&A sessions, team discussions, and instant feedback collection.",
    url: "https://asking.lynchz.dev",
    siteName: "Asking Card",
    images: [
      {
        url: "/logo.svg",
        width: 128,
        height: 128,
        alt: "Asking Card Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asking Card - Real-time Collaboration Platform",
    description: "Create and share asking cards with real-time collaboration. Perfect for Q&A sessions and team discussions.",
    images: ["/logo.svg"],
    creator: "@LynchzDEV",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  category: "productivity",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F3F1" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Asking Card",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Collaboration Tools",
    "operatingSystem": "Web Browser",
    "description": "Real-time collaboration platform for creating and sharing asking cards. Perfect for Q&A sessions, team discussions, and instant feedback collection.",
    "url": "https://asking.lynchz.dev",
    "author": {
      "@type": "Person",
      "name": "LynchzDEV",
      "url": "https://asking.lynchz.dev"
    },
    "publisher": {
      "@type": "Organization",
      "name": "asking.lynchz.dev",
      "url": "https://asking.lynchz.dev"
    },
    "softwareVersion": "1.0.0",
    "datePublished": "2024",
    "featureList": [
      "Real-time collaboration",
      "Card creation and sharing",
      "File upload support",
      "Mobile-responsive design",
      "No registration required",
      "Discord integration",
      "Instant updates"
    ],
    "screenshot": "https://asking.lynchz.dev/logo.svg",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
