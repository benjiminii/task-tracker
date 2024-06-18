import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Benji's Task Tracker",
  description: "Benji's Stablelab assignment website",
};
const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({
  src: [
    {
      path: "../public/nekst-font/nekst-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/nekst-font/nekst-black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased text-white")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
