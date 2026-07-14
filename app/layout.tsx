import type { Metadata } from "next";
import { Assistant, Secular_One } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutOverlay } from "@/components/checkout/CheckoutOverlay";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
});

const secularOne = Secular_One({
  subsets: ["hebrew", "latin"],
  variable: "--font-secular-one",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    locale: siteMetadata.locale,
    type: "website",
    images: [{ url: siteMetadata.ogImage, width: 1024, height: 585 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${assistant.variable} ${secularOne.variable} font-sans antialiased`}
      >
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <CheckoutOverlay />
            <ToastContainer />
            <WhatsAppBubble />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
