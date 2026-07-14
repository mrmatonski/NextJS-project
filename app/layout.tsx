import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-dashboard.vercel.app"),
  title: "Atelier — Creative Studio Command Center",
  description: "A refined project management dashboard for modern creative studios.",
  openGraph: {
    title: "Atelier — Creative Studio Command Center",
    description: "A refined project management dashboard for modern creative studios.",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "Atelier creative studio command center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier — Creative Studio Command Center",
    description: "A refined project management dashboard for modern creative studios.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${instrument.variable}`}>{children}</body></html>;
}
