import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Marcellus, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vijay & Rashmika Wedding Invitation | Kalyana Mandapam",
  description:
    "You are cordially invited to the wedding celebration of Vijay and Rashmika on Monday, October 26, 2026 at ITC Mementos, Udaipur, Rajasthan.",
  openGraph: {
    title: "Vijay & Rashmika Wedding Invitation",
    description:
      "Join us for the wedding celebration of Vijay and Rashmika — October 26, 2026 at ITC Mementos, Udaipur.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${marcellus.variable} ${greatVibes.variable} ${cinzel.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
