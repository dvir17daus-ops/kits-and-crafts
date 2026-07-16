import localFont from "next/font/local";
import { Assistant, Fredoka, Varela_Round } from "next/font/google";

export const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
});

export const varelaRound = Varela_Round({
  subsets: ["hebrew", "latin"],
  variable: "--font-varela",
  weight: "400",
});

/** Thick rounded Hebrew — used for brand + headings */
export const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

/** Makabi YG — alternate rounded Hebrew display (GPL) */
export const makabiyg = localFont({
  src: [
    {
      path: "../app/fonts/makabiyg/makabiyg-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/makabiyg/makabiyg-webfont.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-makabiyg",
  display: "swap",
});
