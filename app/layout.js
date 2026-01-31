import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkySearch — Find Your Next Flight the best way",
  description: "Compare prices, track deals, and book flights across hundreds of airlines. The best way to find your next flight.",
  openGraph: {
    title: "SkySearch — Find Your Next Flight the best way",
    description: "Compare prices, track deals, and book flights across hundreds of airlines.",
    images: "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo1.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkySearch — Find Your Next Flight the best way",
    description: "Compare prices, track deals, and book flights across hundreds of airlines.",
    images: "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
