import type { Metadata, Viewport } from "next";
import { Caveat, Space_Grotesk } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Phanuwit Kittirong",
    "Senior Front-End Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
    "Bangkok",
    "Thailand",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#191917" },
  ],
};

/**
 * Runs before first paint: resolves the theme (saved choice → OS
 * preference) and stamps it on <html> so there is no flash of the
 * wrong theme on a static page.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Senior Front-End Developer",
  url: SITE_URL,
  email: "mailto:big.phanuwit@gmail.com",
  telephone: "+66-84-268-3954",
  sameAs: ["https://linkedin.com/in/phanuwit13"],
  worksFor: { "@type": "Organization", name: "7solutions Company Limited" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Rajamangala University of Technology Isan",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Front-End Architecture",
    "Node.js",
    "Go",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${caveat.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
