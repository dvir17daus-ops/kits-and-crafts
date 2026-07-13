import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutOverlay } from "@/components/checkout/CheckoutOverlay";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  openGraph: {
    locale: siteMetadata.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} font-sans antialiased`}>
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <CheckoutOverlay />
            <ToastContainer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
