import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drifting Bottles",
  description: "A Next.js 14 Drifting Bottles Application",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}
