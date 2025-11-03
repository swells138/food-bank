import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlertBanner from "@/components/AlertBanner";
import { getItemsNeeded, getSiteContent } from "@/lib/content";

import site from "@/content/site.json";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: "https://www.nrcommcare.org/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
};

export default async function RootLayout({ children }) {
  const [siteContent, itemsNeeded] = await Promise.all([
    getSiteContent(),
    getItemsNeeded(),
  ]);

  const urgentItem = Object.values(itemsNeeded)
    .flat()
    .find((item) => item.urgent);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-muted text-ink`} suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header site={siteContent} />
        <AlertBanner urgentItem={urgentItem} />
        <main id="main" className="min-h-screen bg-surface text-ink">
          {children}
        </main>
        <Footer site={siteContent} />
        <div className="sticky-donate sm:hidden">
          <Link
            href="/donate"
            className="block rounded-full bg-primary px-6 py-3 text-center text-base font-semibold text-white shadow-lg shadow-primary/30"
          >
            Donate Now
          </Link>
        </div>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
        ) : null}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
