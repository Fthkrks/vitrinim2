import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { TwicInstall } from "@twicpics/components/react";
import { APP_DATA } from "../lib/constant";
import "@twicpics/components/style.css";
import Provider from "./Provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: APP_DATA.name,
  description: APP_DATA.description,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: APP_DATA.keywords,
  metadataBase: new URL("https://vitrinim.co"), // Temel URL'yi buraya ekleyin
  openGraph: {
    type: "website",
    url: APP_DATA.website,
    title: APP_DATA.name,
    description: APP_DATA.description,
    images: [
      {
        url: "/vitrinim3.png",
        width: 800,
        height: 600,
        alt: APP_DATA.name,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="tr">
        <body className={inter.className}>
          <div data-theme="dark" className=" h-screen">
            <TwicInstall
              // domain is mandatory
              domain="https://vitrinim.twic.pics"
            />
            <Provider>{children}</Provider>
            <Analytics/>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
