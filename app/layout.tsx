import type { Metadata } from "next";
import { Assistant, Varela_Round } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { FlyToCartProvider } from "@/context/FlyToCartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutOverlay } from "@/components/checkout/CheckoutOverlay";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RefreshToHome } from "@/components/ui/RefreshToHome";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
});

const varelaRound = Varela_Round({
  subsets: ["hebrew", "latin"],
  variable: "--font-varela",
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
        className={`${assistant.variable} ${varelaRound.variable} font-sans antialiased`}
      >
        <CartProvider>
          <ToastProvider>
            <FlyToCartProvider>
              <RefreshToHome />
              <ScrollProgress />
              <a
                href="#main-content"
                className="sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate focus:shadow-lg focus:outline-none"
              >
                דלג לתוכן הראשי
              </a>
              <Header />
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <CheckoutOverlay />
              <ToastContainer />
              <WhatsAppBubble />
            </FlyToCartProvider>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
