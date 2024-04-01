import "./globals.css";
import { Josefin_Sans } from "@next/font/google";

export const metadata = {
  title: "Weather app",
  description: "Made by S-creations",
};

const josefin = Josefin_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={josefin.className} lang="sk">
      <body>{children}</body>
    </html>
  );
}
