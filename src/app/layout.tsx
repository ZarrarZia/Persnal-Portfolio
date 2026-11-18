import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider, themeScript } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// The house display face. Light weights only — this serif is never bold.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AI Developer & Agentic AI Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "AI Developer",
    "Agentic AI Engineer",
    "Muhammad Zarrar Zia",
    "OpenAI",
    "Claude",
    "Gemini",
    "LLM Integration",
    "RAG",
    "Multi-Agent Systems",
    "PHP Laravel",
    "Node.js",
    "Python",
    "FastAPI",
    "AI Automation",
    "Karachi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | AI Developer & Agentic AI Engineer`,
    description: siteConfig.description,
    siteName: `${siteConfig.name} — The AI Architect`,
    // OG image is supplied automatically by src/app/opengraph-image.tsx
    // (Next wires it with the correct absolute URL).
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | AI Developer`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F1E7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0A09" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Pinned to the last meaningful content update (not build time) so the
// signal is stable across redeploys.
const LAST_UPDATED = "2026-06-10";

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      jobTitle: siteConfig.role,
      description: siteConfig.bio,
      image: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      worksFor: {
        "@type": "Organization",
        name: "Digital Graphiks",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Indus University",
        url: "https://indus.edu.pk",
      },
      knowsAbout: [
        "Agentic AI",
        "Large Language Models",
        "OpenAI",
        "Anthropic Claude",
        "Google Gemini",
        "Retrieval-Augmented Generation",
        "Multi-Agent Systems",
        "Backend Engineering",
        "AI Automation",
        "Node.js",
        "Python",
        "PHP Laravel",
      ],
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.instagram,
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: `${siteConfig.name} — Portfolio`,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: `${siteConfig.name} | AI Developer & Agentic AI Engineer`,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
      dateModified: LAST_UPDATED,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resolves day/night before first paint — no flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* suppressHydrationWarning covers only the element it sits on, so <body>
          needs its own. Browser extensions (password managers, grammar tools,
          ad blockers) routinely stamp attributes like `__processed_<uuid>__`
          onto <body> before React hydrates, which React would otherwise report
          as a mismatch. This suppresses the attribute diff on this one element
          — real mismatches inside the tree are still reported. */}
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {/* No-JS / crawler fallback: real content even when the animated app
            (and its intro overlay) can't run. Hidden whenever JS is available. */}
        <noscript>
          <style>{`.loader-overlay{display:none!important}`}</style>
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px", color: "#4A433A", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
            <h2 style={{ color: "#1A1714", fontSize: "1.7rem", marginBottom: "12px" }}>
              {siteConfig.name} — {siteConfig.role}
            </h2>
            <p>{siteConfig.bio}</p>
            <p style={{ marginTop: "16px" }}>
              Contact: <a style={{ color: "#9A7B3A" }} href={siteConfig.social.email}>{siteConfig.email}</a>
              {" · "}
              <a style={{ color: "#9A7B3A" }} href={siteConfig.social.linkedin}>LinkedIn</a>
            </p>
          </div>
        </noscript>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
